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

    [Route("List/{page}")]
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult> ListParlaments(int page)
    {
        const int pageSize = 20;

        var parlamentList = _context.Parlaments
                                    .Include(p => p.Faculty)
                                    .Include(p => p.Members)
                                    .Include(p => p.Events)
                                    .OrderBy(p => p.ID)
                                    .Skip(page * pageSize)
                                    .AsSplitQuery()
                                    .Take(pageSize);

        var parlamentListSelected = parlamentList.Select(p => new
        {
            id = p.ID,
            name = p.Name,
            facultyName = p.Faculty != null ? p.Faculty.Name : "",
            memberCount = p.Members != null ? p.Members.Where(s => s.Role > Role.Student).Count() : 0,
            eventCount = p.Events != null ? p.Events.Count() : 0,
        });

        return Ok(await parlamentListSelected.ToListAsync());
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
