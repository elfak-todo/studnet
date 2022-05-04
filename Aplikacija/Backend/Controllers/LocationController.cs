using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class LocationController : ControllerBase
{
    public Context Context { get; set; }

    public LocationController(Context context)
    {
        Context = context;
    }
}
