using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ParlamentController : ControllerBase
{
    public Context Context { get; set; }

    public ParlamentController(Context context)
    {
        Context = context;
    }
}
