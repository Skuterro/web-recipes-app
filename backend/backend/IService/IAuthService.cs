using backend.models;

namespace backend.IService
{
    public interface IAuthService
    {
        Task<string> Register(RegisterUserDto registerUserDto);
        Task<string> Login(LoginUserDto loginUserDto);
    }
}
