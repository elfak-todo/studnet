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

    [Route("List/{page}")]
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult> ListUniversities(int page)
    {
        const int pageSize = 20;

        var universityList = _context.Universities
                                    .Include(u => u.Users)
                                    .Include(u => u.Parlaments)
                                    .Include(u => u.Posts)
                                    .Include(u => u.Locations)
                                    .Include(u => u.Events)
                                    .OrderBy(u => u.ID)
                                    .Skip(page * pageSize)
                                    .AsSplitQuery()
                                    .Take(pageSize);

        var universityListSelected = universityList.Select(u => new
        {
            id = u.ID,
            name = u.Name,
            userCount = u.Users != null ? u.Users.Count() : 0,
            parlamentCount = u.Parlaments != null ? u.Parlaments.Count() : 0,
            postCount = u.Posts != null ? u.Posts.Count() : 0,
            locationCount = u.Locations != null ? u.Locations.Count() : 0,
            eventCount = u.Events != null ? u.Events.Count() : 0,
        });

        return Ok(await universityListSelected.ToListAsync());
    }

    [Route("GetAll")]
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult> GetAll()
    {
        try
        {
            return Ok
            (
                await _context.Universities.Select(p =>
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
