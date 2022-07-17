using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Activities
{
  public class List
  {
    public class Query : IRequest<Result<List<ActivityDto>>> { }
    public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
    {
      private readonly DataContext _context;
      private readonly ILogger<List> _logger;
      private readonly IMapper _mapper;
      public Handler(DataContext context, ILogger<List> logger, IMapper mapper)
      {
        _logger = logger;
        _context = context;
        _mapper = mapper;
      }
      public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
      {
        try
        {
          for (var i = 0; i < 1; i++)
          {
            cancellationToken.ThrowIfCancellationRequested();
            await Task.Delay(1000, cancellationToken);
            _logger.LogInformation($"Task {i} completed successfully");
          }
        }
        catch (Exception ex) when (ex is TaskCanceledException)
        {
          _logger.LogInformation("Task was cancelled");
        }
        var activities = await _context.Activities
          .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
          .ToListAsync(cancellationToken);
        return Result<List<ActivityDto>>.Success(activities);
      }
    }
  }
}