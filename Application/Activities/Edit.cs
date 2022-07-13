using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            // Object to be received from the client side
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get the object from the database store it in memory 
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                // Insted of setting the properties manually like following: 
                /* activity.Title = request.Activity.Title ?? activity.Title; */
                if (activity == null) return null;
                _mapper.Map(request.Activity, activity);// Updates the properties inside the object
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed while updating activity properties");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}