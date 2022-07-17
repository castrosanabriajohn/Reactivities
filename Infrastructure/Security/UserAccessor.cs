using System.Security.Claims;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Security
{
  public class UserAccessor : IUserAccessor
  {
    // gives access to the http context which has access to user object for getting the token
    private readonly IHttpContextAccessor _httpContextAccesor;
    public UserAccessor(IHttpContextAccessor httpContextAccessor)
    {
      _httpContextAccesor = httpContextAccessor;
    }
    public string GetUserName() => _httpContextAccesor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
  }
}