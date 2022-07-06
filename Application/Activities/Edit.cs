using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Edit
    {
        public class Command : IRequest
        {
            // Object to be received from the client side
            public Activity Activity { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get the object from the database store it in memory 
                var activity = await _context.Activities.FindAsync(request.Activity.Id);
                // Insted of setting the properties manually like following: 
                /* activity.Title = request.Activity.Title ?? activity.Title; */
                _mapper.Map(request.Activity, activity);// Updates the properties inside the object
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}