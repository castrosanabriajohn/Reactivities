using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Activities;
using AutoMapper;
using Application.Core;
using API.Extensions;
using FluentValidation.AspNetCore;
using API.Middleware;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config) // constructor where configuration is passed
        {
            /* Configuration = configuration; */
            _config = config; // sets the readonly configuration property equal to config 
        }

        /* public IConfiguration Configuration { get; } */

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers(opt =>
            {
                var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();
                opt.Filters.Add(new AuthorizeFilter(policy)); // ensures every single endpoint in the API requires authentication
            })
            .AddFluentValidation(config =>
            {
                config.RegisterValidatorsFromAssemblyContaining<Create>();// Specifies the location of the assembly of validator  
            }
            );// services to add API controllers 
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment()) // check if environment is development
            {
                // Add exception middleware at the top 
                app.UseMiddleware<ExceptionMiddleware>(); // custom exception middleware
                /* app.UseDeveloperExceptionPage(); */ // request to use developer exception page
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
            }
            //app.UseHttpsRedirection(); -> for https
            app.UseRouting(); // middleware for routing  
            app.UseCors("CorsPolicy");
            app.UseAuthentication(); // authentication service must be before authorization 
            app.UseAuthorization();
            // This middleware is responsible for routing the endpoints inside the controller
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
