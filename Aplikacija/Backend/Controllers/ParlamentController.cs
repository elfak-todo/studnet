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
            var university = await _context.Universities.Where(p => p.ID == universityID).FirstOrDefaultAsync();
            if (university != null)
            {
                var parlaments = await _context.Parlaments.Where(p => p.University == university).Select(p =>
                    new
                    {
                        ID = p.ID,
                        FacultyName = p.FacultyName
                    }).ToListAsync();

                if (parlaments != null)
                {
                    return Ok(parlaments);
                }
                return BadRequest("No parlaments found for university with id: " + universityID);
            }
            return BadRequest("University with id: " + universityID + " doesn't exist");
        }
        catch (Exception exc)
        {
            return BadRequest("Error: " + exc.Message);
        }
    }
}
