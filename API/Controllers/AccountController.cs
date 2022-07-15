using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController] // add api controller attribute
    [Route("api/[controller]")] // add route specifying controller
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, TokenService tokenService) // injecting user and sign in manager
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
        }
        // Add the endpoint for login
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // get the user object from the database using the user manager 
            var user = await _userManager.FindByEmailAsync(loginDto.Email); // returns the task object containing the results of the operation if exists
            if (user == null) return Unauthorized(); // because this is an API controller we have access to the http responses
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false); // lock on failure disabled
            if (result.Succeeded)
            {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                    UserName = user.UserName,
                };
            }
            return Unauthorized();
        }
    }
}