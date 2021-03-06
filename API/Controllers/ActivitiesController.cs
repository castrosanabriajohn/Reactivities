using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [AllowAnonymous]
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<IActionResult> GetActivities(CancellationToken cancellationToken)
        {
            return HandleResult(await Mediator.Send(new List.Query(), cancellationToken));
        }
        [HttpGet("{id}")] // activities/id
        public async Task<IActionResult> GetActivity(Guid id) // IActionResult allows to return http responses
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {
            return HandleResult(await Mediator.Send(new Create.Command { Activity = activity }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            // Add the id to the object before we pass it to a handler
            activity.Id = id;
            return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
        // Endpoint for deleting
        [HttpDelete("{id}")] // route parameter
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            // Set the id when instanciating the class
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}