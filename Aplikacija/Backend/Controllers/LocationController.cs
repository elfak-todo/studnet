using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class LocationController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    public LocationController(Context context, IAccessTokenManager tokenManager)
    {
        _context = context;
        _tokenManager = tokenManager;
    }

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetUniversityLocations()
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return StatusCode(500);
        }

        var university = await _context.Universities.FindAsync(user.UniversityId);

        if (university == null)
        {
            return StatusCode(500);
        }

        var locations = await _context.Locations.Where(l => l.UniversityId == user.UniversityId).ToListAsync();

        return Ok(new
        {
            uni = new
            {
                name = university.Name,
                city = university.City,
                latitude = university.Latitude,
                longitude = university.Longitude
            },
            loc = locations,
        });
    }

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> PostLocation([FromBody] Location location)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return StatusCode(500);
        }

        location.AuthorId = user.ID;
        location.UniversityId = user.UniversityId;
        location.Events = new List<Event>();
        location.Grades = new List<Grade>();

        _context.Add(location);
        await _context.SaveChangesAsync();

        return Ok(location);
    }
}
