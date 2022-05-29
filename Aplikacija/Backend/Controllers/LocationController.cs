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

    [Route("{locationId}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetLocationDetails(int locationId)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return StatusCode(500);
        }

        var location = await _context.Locations
                                .Include(l => l.Author)
                                .Include(l => l.Events!.Where(e => e.EndTime >= DateTime.Now))
                                .Include(l => l.Grades!.OrderByDescending(g => g.PublicationTime))
                                .Where(l => l.ID == locationId)
                                .FirstOrDefaultAsync();

        if (location == null)
        {
            return StatusCode(404);
        }

        location.GradeCount = location.Grades!.Count();

        return Ok(new
        {
            details = location,
            author = location.Author,
            events = location.Events,
            grades = location.Grades
        });
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

        var locations = await _context.Locations
                            .Where(l => l.UniversityId == user.UniversityId)
                            .Include(l => l.Grades)
                            .ToListAsync();
        return Ok(new
        {
            uni = new
            {
                name = university.Name,
                city = university.City,
                latitude = university.Latitude,
                longitude = university.Longitude
            },
            loc = locations.Select(l => new
            {
                id = l.ID,
                name = l.Name,
                description = l.Description,
                type = l.Type,
                latitude = l.Latitude,
                longitude = l.Longitude,
                averageGrade = l.AverageGrade,
                imagePath = l.ImagePath,
                verified = l.Verified
            }),
        });
    }

    [Route("Trending")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetTrendingLocations()
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

        var locations = await _context.Locations
                            .Include(l => l.Grades!.OrderByDescending(g => g.PublicationTime))
                            .ThenInclude(g => g.GradedBy)
                            .Where(l => l.UniversityId == user.UniversityId)
                            .OrderByDescending(l => l.Grades!.Count())
                            .Take(10)
                            .ToListAsync();

        locations.ForEach(l =>
        {
            l.GradeCount = l.Grades!.Count();
            l.Grades = l.Grades!.Take(3).ToList();
        });

        return Ok(locations);
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
