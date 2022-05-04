using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UniversityController : ControllerBase
{
    public Context Context { get; set; }

    public UniversityController(Context context)
    {
        Context = context;
    }
}
