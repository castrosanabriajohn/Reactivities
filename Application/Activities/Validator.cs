using Domain;
using FluentValidation;

namespace Application.Activities
{
  public class Validator : AbstractValidator<Activity>
  {
    public Validator()
    {
      RuleFor(x => x.Title).NotEmpty();
      RuleFor(x => x.Description).NotEmpty();
      RuleFor(x => x.Date).NotEmpty();
      RuleFor(x => x.Category).NotEmpty();
      RuleFor(x => x.City).NotEmpty();
      RuleFor(x => x.Venue).NotEmpty();
    }
  }
}