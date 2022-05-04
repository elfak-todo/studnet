using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    public Context Context { get; set; }

    public CommentController(Context context)
    {
        Context = context;
    }
}
