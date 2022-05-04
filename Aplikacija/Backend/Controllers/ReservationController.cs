using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

using Backend.Models;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ReservationController : ControllerBase
{
    public Context Context { get; set; }

    public ReservationController(Context context)
    {
        Context = context;
    }
}
