using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
  public class Create
  {
    public class Command : IRequest<Result<Unit>>
    {
      public Activity Activity { get; set; }
    }
    public class CommandValidator : AbstractValidator<Command> // we specify what to validate against
    {
      public CommandValidator()
      {
        RuleFor(x => x.Activity).SetValidator(new Validator());
      }
    }
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
      private readonly DataContext _context;
      private readonly IUserAccessor _userAccessor;

      public Handler(DataContext context, IUserAccessor userAccessor)
      {
        _context = context;
        _userAccessor = userAccessor;
      }

      public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
      {
        // Even while using the context it's possible to fetch the users table without using the user manager
        var user = await _context.Users.FirstOrDefaultAsync((u) => u.UserName == _userAccessor.GetUserName()); // gives access to the user object
        // Create new attendee based on that information
        var attendee = new ActivityAttendee
        {
          AppUser = user,
          Activity = request.Activity,
          IsHost = true,
        };
        request.Activity.Attendees.Add(attendee);
        _context.Activities.Add(request.Activity);
        var result = await _context.SaveChangesAsync() > 0; // If nothing is written to the database then false
        if (!result) return Result<Unit>.Failure("Error wile creating activity"); // 400 bad request
        return Result<Unit>.Success(Unit.Value); // returns nothing, notifies API controller it was successfull
      }
    }
  }
}