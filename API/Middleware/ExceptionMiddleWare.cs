using System;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Application.Core;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        private readonly IHostEnvironment _env;
        public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            _next = next;
            _logger = logger;
            _env = env;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context); // when a correct request comes in, it passes straight through the exception handling middleware 
            }
            catch (Exception exception) // any exception thrown will be catched
            {
                _logger.LogError(exception, exception.Message);
                context.Response.ContentType = "application/json"; // set the content type to what it should return
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError; // set the http response status code to be 500
                var response = _env.IsDevelopment()
                ? new AppException(context.Response.StatusCode, exception.Message, exception.StackTrace?.ToString())
                : new AppException(context.Response.StatusCode, "Server Error");
                // Ensures response is returned as json with camelCase
                var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
                var json = JsonSerializer.Serialize(response, options);
                await context.Response.WriteAsync(json);
            };
        }
    }
}