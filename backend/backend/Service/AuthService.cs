using backend.IService;
using backend.models;
using Microsoft.AspNetCore.Identity;

namespace backend.Service
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<string> Register(RegisterUserDto registerUserDto)
        {
            var user = new User
            {
                UserName = registerUserDto.UserName,
                Email = registerUserDto.Email,
            };

            var result = await _userManager.
                CreateAsync(user, registerUserDto.Password);

            if (result.Succeeded)
            {
                return "User registered successfully";
            }

            return string.Join(", ", result.Errors);
        }

        public async Task<string> Login(LoginUserDto loginUserDto)
        {
            var result = await _signInManager.
                PasswordSignInAsync(loginUserDto.UserName, loginUserDto.Password, false, false);

            if (result.Succeeded)
            {
                return "User logged in";
            }

            return "Invalid login attempt";
        }


    }
}
