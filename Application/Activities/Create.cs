using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
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
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // adds an object inside the context in memory , not in the database 
                _context.Activities.Add(request.Activity);

                var result = await _context.SaveChangesAsync() > 0; // If nothing is written to the database then false
                if (!result) return Result<Unit>.Failure("Error wile creating activity"); // 400 bad request
                return Result<Unit>.Success(Unit.Value); // returns nothing, notifies API controller it was successfull
            }
        }
    }
}