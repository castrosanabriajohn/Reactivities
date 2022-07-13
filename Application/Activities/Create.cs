using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest
        {
            // Parameter to be received from API
            public Activity Activity { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command> // we specify what to validate against
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new Validator());
            }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // adds an object inside the context in memory , not in the database 
                _context.Activities.Add(request.Activity);

                await _context.SaveChangesAsync();

                return Unit.Value; // returns nothing
            }
        }
    }
}