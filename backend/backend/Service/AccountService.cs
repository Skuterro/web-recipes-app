using backend.Entities;
using backend.IService;
using backend.models;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace backend.Service
{/*
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        //dodaj acitionResult
        public async Task<ActionResult<string>> Register(RegisterUserDto registerUserDto)
        {


            return result;
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


    }*/
}
