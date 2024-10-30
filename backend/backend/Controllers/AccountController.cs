using backend.Entities;
using backend.IService;
using backend.models;
using backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        //private readonly IAccountService authService;
        private readonly UserManager<User> _userManager;

        private readonly RoleManager<IdentityRole> _roleManager; 

        private readonly IConfiguration _configuration;

        public AccountController(
            UserManager<User> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration)
        {
            this._userManager = userManager;
            this._roleManager = roleManager;
            this._configuration = configuration;
        }

        [HttpPost("Register")]
        public async Task<ActionResult<string>> Register(RegisterUserDto registerUserDto)
        {
            if (!ModelState.IsValid) 
            {
                return BadRequest(ModelState);
            }

            var user = new User
            {
                UserName = registerUserDto.UserName,
                Email = registerUserDto.Email
            };

            var result = await _userManager.
                CreateAsync(user, registerUserDto.Password);

            if (!result.Succeeded)
            {
                return BadRequest(result.Errors);
            }

            if (registerUserDto.Roles is null)
            {
                await _userManager.AddToRoleAsync(user, "User");
            }
            else
            {
                foreach(var role in registerUserDto.Roles)
                {
                    await _userManager.AddToRoleAsync(user, role);
                }
            }

            return Ok(new AuthResponseDto
            {
                IsSuccess = true,
                Message = "Account created successfully!"
            });
        }

        [HttpPost("Login")]
        public async Task<ActionResult<AuthResponseDto>> Login(LoginUserDto loginUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await _userManager.FindByEmailAsync(loginUserDto.Email);

            if (user is null)
            {
                return Unauthorized(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "User with this email does not exist."
                });
            }

            var result = await _userManager.CheckPasswordAsync(user, loginUserDto.Password);

            if (!result)
            {
                return Unauthorized(new AuthResponseDto
                {
                    IsSuccess = false,
                    Message = "Invalid password."
                });
            }

            var token = GenerateToken(user);
            SetTokenInCookie(token);

            return Ok(new
            {
                UserId = user.Id,
                Email = user.Email,
                Name = user.UserName
            });

        }

        [HttpGet("Token")]
        public async Task<IActionResult> getUserByToken()
        {
            if (Request.Cookies.TryGetValue("jwt", out var token))
            {
                Console.WriteLine($"Token w ciasteczku: {token}");


            }

            var claimsPrincipal = ValidateToken(token);
            if (claimsPrincipal == null)
            {
                return Unauthorized("Token jest nieprawidłowy.");
            }

            var email = claimsPrincipal.FindFirst(ClaimTypes.Email);


            if (email == null)
            {
                Console.WriteLine("email nie ten teges");
                return NotFound("email nie ten teges");
            }

            var user = await _userManager.FindByEmailAsync(email.Value);

            if (user is null)
            {
                return NotFound("user not found");
            }

            return Ok(new
            {
                UserId = user.Id,
                Email = user.Email,
                Name = user.UserName
            });

        }

        private ClaimsPrincipal ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["JWTSetting:securityKey"]);

            try
            {
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero // Brak tolerancji czasu
                };

                return tokenHandler.ValidateToken(token, validationParameters, out var validatedToken);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd walidacji tokena: {ex.Message}");
                return null; // Token jest nieprawidłowy
            }
        }

        private string GenerateToken(User user)
        {
            var TokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII
                .GetBytes(_configuration.GetSection("JWTSetting").GetSection("securityKey").Value!);

            var roles = _userManager.GetRolesAsync(user).Result;

            List<Claim> claims = new List<Claim> {

                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new (JwtRegisteredClaimNames.Aud,
                _configuration.GetSection("JWTSetting").GetSection("validAudience").Value!),
                new (JwtRegisteredClaimNames.Iss,
                _configuration.GetSection("JWTSetting").GetSection("validIssuer").Value!)
            };
           
            /*
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }*/

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials
                (
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256
                )
            };

            var token = TokenHandler.CreateToken(tokenDescriptor);

            return TokenHandler.WriteToken(token);
        }

        private void SetTokenInCookie(string token)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = false,
                Expires = DateTimeOffset.UtcNow.AddHours(1),
                Secure = true,
                SameSite = SameSiteMode.None
            };

            Response.Cookies.Append("jwt", token, cookieOptions);
        }

    }
}
