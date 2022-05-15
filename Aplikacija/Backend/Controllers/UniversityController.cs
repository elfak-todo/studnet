using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class UniversityController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    public UniversityController(Context context, IAccessTokenManager tokenManager)
    {
        _context = context;
        _tokenManager = tokenManager;
    }

    [Route("GetAll")]
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        try
        {
            return Ok(await _context.Universities.Select(p =>
            new
            {
                ID = p.ID,
                Name = p.Name
            }).ToListAsync()
            );
        }
        catch (Exception exc)
        {
            return BadRequest("Error: " + exc.Message);
        }
    }
}
