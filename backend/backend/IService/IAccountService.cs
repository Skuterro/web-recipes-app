using backend.models;
using Microsoft.AspNetCore.Mvc;

namespace backend.IService
{
    public interface IAccountService
    {
        Task<ActionResult<string>> Register(RegisterUserDto registerUserDto);
        Task<string> Login(LoginUserDto loginUserDto);
    }
}
