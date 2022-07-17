using Application.Activities;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
  public static class ApplicationServiceExtensions
  {
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
      services.AddSwaggerGen(c => // service to add swagger
      {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
      });

      services.AddDbContext<DataContext>(opt =>
      {
        opt.UseSqlite(config.GetConnectionString("DefaultConnection")); // receives parameter connection string from configuration
      });
      // CORS needed when trying to access resources from a different domain than our API server
      services.AddCors(opt =>
      {
        opt.AddPolicy("CorsPolicy", policy =>
              {
                // Returns a header indicating it's allowed to use any method (get, post, put)
            policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                // Ensures that the origin of the request is always from our client application
          });
      });
      // Needs to know where the handlers are located and which assembly they're located in 
      // Application project is going to be compiled into a different assembly that API project
      services.AddMediatR(typeof(List.Handler).Assembly); // Tells mediatr where to find the handlers
                                                          // Add automapping as a service and specifying the assembly where mapping profiles are located
      services.AddAutoMapper(typeof(MappingProfiles).Assembly);
      return services;
    }
  }
}