using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Activities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
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
    [Authorize(Policy = "IsHostPolicy")]
    [HttpPut("{id}")]
    public async Task<IActionResult> EditActivity(Guid id, Activity activity)
    {
      // Add the id to the object before we pass it to a handler
      activity.Id = id;
      return HandleResult(await Mediator.Send(new Edit.Command { Activity = activity }));
    }
    [Authorize(Policy = "IsHostPolicy")]
    [HttpDelete("{id}")] // route parameter
    public async Task<IActionResult> DeleteActivity(Guid id)
    {
      // Set the id when instanciating the class
      return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }
    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(Guid id) => HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
  }
}