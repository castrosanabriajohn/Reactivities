using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous] // in order for users to login this must be set to accept anonymous requests
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
                return CreateUserObject(user);
            }
            return Unauthorized();
        }
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto) // returns an user object including the token, automatically logged in
        {
            if (await _userManager.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return BadRequest("Email is already registered");
            }
            if (await _userManager.Users.AnyAsync(u => u.UserName == registerDto.UserName))
            {
                return BadRequest("Username is already registered");
            }
            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName,
            };
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            if (result.Succeeded)
            {
                return CreateUserObject(user);
            }
            return BadRequest("Failed to register user");
        }
        [Authorize]// user info is taken from the token so it's required to be authenticated 
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email)); // User object is available as a claim principal
            return CreateUserObject(user);
        }
        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                UserName = user.UserName,
                Image = null,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}