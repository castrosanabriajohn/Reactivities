using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using MediatR;
using Application.Activities;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
            /* return await _context.Activities.ToListAsync(); */
        }
        [HttpGet("{id}")] // activities/id
        public async Task<ActionResult<Activity>> GetActivity(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id }); // object initializer syntax
            /* return await _context.Activities.FindAsync(id); */
        }
        // Create endpoint for creating an activity
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {
            return Ok(await Mediator.Send(new Create.Command { Activity = activity }));
        }
        // Endpoint for updating an activity
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            // Add the id to the object before we pass it to a handler
            activity.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Activity = activity }));
        }
        // Endpoint for deleting
        [HttpDelete("{id}")] // route parameter
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            // Set the id when instanciating the class
            return Ok(await Mediator.Send(new Delete.Command { Id = id }));
        }
    }
}