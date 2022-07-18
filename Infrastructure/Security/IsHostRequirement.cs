using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
  public class IsHostRequirement : IAuthorizationRequirement
  {
  }
  public class IsHostRequirementHandler : AuthorizationHandler<IsHostRequirement>
  {
    private readonly DataContext _dbContext;
    // IHttpContextAccessor for getting the id of the activity that's being accessed to check the attendees and determine who's the host
    private readonly IHttpContextAccessor _httpContextAccessor;
    public IsHostRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
    {
      _dbContext = dbContext;
      _httpContextAccessor = httpContextAccessor;
    }
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
      // Get user id via the authorization handler context that gives access to the user object
      // Activity Attendee Table Primary Key is a combination of user and activity id, thus the query is more efficient finding by primary key
      var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
      if (userId == null) return Task.CompletedTask; // User isn't authorized
      // Attendee userId is a string but in the root object it's a Guid so it must be parsed
      var activityId = Guid.Parse(
        _httpContextAccessor
        .HttpContext?
        .Request
        .RouteValues
        .SingleOrDefault(
            (x) => x.Key == "id"
            )
            .Value?
            .ToString());
      var attendee = _dbContext
      .ActivityAttendees
      .AsNoTracking()
      .SingleOrDefaultAsync(
        (aa) => aa.AppUserId == userId && aa.ActivityId == activityId
        ).Result;
      if (attendee == null) return Task.CompletedTask;
      // Check if attendee is the host
      if (attendee.IsHost) context.Succeed(requirement);
      // If the succeed flag is set the user would be authorized to edit the activity
      return Task.CompletedTask;
    }
  }
}