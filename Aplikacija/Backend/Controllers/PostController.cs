using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class PostController : ControllerBase
{
    public Context Context { get; set; }

    public PostController(Context context)
    {
        Context = context;
    }
}
