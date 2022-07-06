using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<Activity>> { }
        public class Handler : IRequestHandler<Query, List<Activity>>
        {
            // Initialize field from parameter
            private readonly DataContext _context;

            // Get access to the data context
            public Handler(DataContext context)
            {
                _context = context;
            }

            // Async method that returns a list of activities with access to the query and cancellationToken
            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Activities.ToListAsync();
            }
        }
    }
}