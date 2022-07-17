using Application.Core;
using MediatR;
using Microsoft.AspNetCore.Mvc;
namespace API.Controllers
{
  [ApiController] // auto-generate http responses 
  [Route("api/[controller]")]
  public class BaseApiController : ControllerBase
  {
    private IMediator _mediator;
    // Protected property to get access to mediator 
    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();

    protected ActionResult HandleResult<T>(Result<T> result)
    {
      if (result == null) return NotFound();
      if (result.isSuccess && result.Value != null) return Ok(result.Value);
      if (result.isSuccess && result.Value == null) return NotFound();
      return BadRequest(result.Error);
    }
  }
}