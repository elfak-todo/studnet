using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ParlamentController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    public ParlamentController(Context context, IAccessTokenManager tokenManager)
    {
        _context = context;
        _tokenManager = tokenManager;
    }

    [Route("GetByUniversity/{universityID}")]
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult> GetByUniversity(int universityID)
    {
        try
        {
            var parlaments = await _context.Parlaments
                    .Include(p => p.Faculty)
                    .Where(p => p.UniversityId == universityID)
                    .Select(p =>
                        new
                        {
                            ID = p.ID,
                            FacultyName = p.Faculty!.Name
                        }
                    ).ToListAsync();

            if (parlaments == null)
            {
                return BadRequest("ParlamentsNotFound");
            }

            return Ok(parlaments);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }
}
