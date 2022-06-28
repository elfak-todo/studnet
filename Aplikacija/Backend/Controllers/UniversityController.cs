using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;
using Backend.Data;
using System.Text.Json;

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

    [Route("{uniId}")]
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult> GetUniversity(int uniId)
    {
        var uni = await _context.Universities.FindAsync(uniId);
        return Ok(uni);
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

    [Route("")]
    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult> CreateParlament(
                        [FromBody] UniversityDetails uniDetails)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return StatusCode(500);
        }

        University university = new University();

        university.Name = uniDetails.name!;
        university.City = uniDetails.city!;
        university.Latitude = uniDetails.latitude;
        university.Longitude = uniDetails.longitude;

        _context.Universities.Add(university);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            id = university.ID,
            name = university.Name,
            userCount = university.Users != null
                ? university.Users.Count() : 0,
            parlamentCount = university.Parlaments != null
                ? university.Parlaments.Count() : 0,
            postCount = university.Posts != null
                ? university.Posts.Count() : 0,
            locationCount = university.Locations != null
                ? university.Locations.Count() : 0,
            eventCount = university.Events != null
                ? university.Events.Count() : 0,
        });
    }

    [Route("{uniId}")]
    [Authorize(Roles = "AdminUni")]
    [HttpPatch]
    public async Task<ActionResult> EditUniversity(
                            [FromBody] UniversityDetails uni, int uniId)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return StatusCode(500);
        }

        var uniInDatabase = await _context.Universities
            .FirstOrDefaultAsync(u => uniId == u.ID);

        if (uniInDatabase == null)
        {
            return BadRequest("UniversityNotFound");
        }

        if (student.Role < Role.Admin && uniInDatabase.ID != student.UniversityId)
        {
            return Forbid("NotAuthor");
        }

        uniInDatabase.Name = uni.name!;
        uniInDatabase.City = uni.city!;
        uniInDatabase.Latitude = uni.latitude;
        uniInDatabase.Longitude = uni.longitude;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            id = uniInDatabase.ID,
            name = uniInDatabase.Name,
            userCount = uniInDatabase.Users != null
                ? uniInDatabase.Users.Count() : 0,
            parlamentCount = uniInDatabase.Parlaments != null
                ? uniInDatabase.Parlaments.Count() : 0,
            postCount = uniInDatabase.Posts != null
                ? uniInDatabase.Posts.Count() : 0,
            locationCount = uniInDatabase.Locations != null
                ? uniInDatabase.Locations.Count() : 0,
            eventCount = uniInDatabase.Events != null
                ? uniInDatabase.Events.Count() : 0,
        });
    }
}
