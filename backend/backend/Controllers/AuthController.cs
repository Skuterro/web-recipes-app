using backend.models;
using backend.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService authService;

        public AuthController(AuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register([FromForm] RegisterUserDto registerUserDto)
        {
            var result = await authService.Register(registerUserDto);

            if(result == "User registered successfully")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromForm] LoginUserDto loginUserDto)
        {
            var result = await authService.Login(loginUserDto);

            if(result == "User logged in")
            {
                return Ok(result);
            }

            return BadRequest(result);
        }
    }
}
