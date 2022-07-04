using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
// Everything inside square brackets is referred to as an attribute
[ApiController]
// route with placeholder inside square brackets which will take the first part of the classname of the controller ignoring the controller word
// this will change to "WeatherForecast"
[Route("[controller]")]
public class WeatherForecastController : ControllerBase // inherits or derives from the controller base class for MVC controllers
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<WeatherForecastController> _logger;

    public WeatherForecastController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetWeatherForecast")] // endpoint for get request
    public IEnumerable<WeatherForecast> Get()
    {
        return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        {
            Date = DateTime.Now.AddDays(index),
            TemperatureC = Random.Shared.Next(-20, 55),
            Summary = Summaries[Random.Shared.Next(Summaries.Length)]
        })
        .ToArray();
    }
}
