using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class GradeController : ControllerBase
{
    public Context Context { get; set; }

    public GradeController(Context context)
    {
        Context = context;
    }
}
