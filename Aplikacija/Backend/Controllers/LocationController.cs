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
public class LocationController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    private IImageManager _imageManager;

    public LocationController(Context context, IAccessTokenManager tokenManager,
                         IImageManager imageManager)
    {
        _context = context;
        _tokenManager = tokenManager;
        _imageManager = imageManager;
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
                                .ThenInclude(a => a!.Parlament)
                                .ThenInclude(p => p!.Faculty)
                                .Include(l => l.Events!.Where(e => e.EndTime >= DateTime.Now))
                                .AsSplitQuery()
                                .Include(l => l.Grades)
                                .AsSplitQuery()
                                .FirstAsync(l => l.ID == locationId);

        if (location == null)
        {
            return StatusCode(404);
        }

        location.GradeCount = location.Grades!.Count();

        return Ok(new
        {
            details = location,
            author = new
            {
                id = location.Author!.ID,
                firstName = location.Author.FirstName,
                lastName = location.Author.LastName,
                imagePath = location.Author.ImagePath,
                facultyName = location.Author.Parlament!.Faculty!.Name
            },
            eventCount = location.Events!.Count,
            gradeCount = location.Grades!.Count
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
                            .AsSplitQuery()
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

    [Route("Trending/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetTrendingLocations(int page)
    {
        const int pageSize = 10;

        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return StatusCode(500);
        }

        var locations = await _context.Locations
                        .Include(l => l.Grades!.OrderByDescending(g => g.PublicationTime))
                        .ThenInclude(g => g.GradedBy)
                        .AsSplitQuery()
                        .Where(l => l.UniversityId == user.UniversityId)
                        .OrderByDescending(l => l.Grades!.Count())
                        .Skip(page * pageSize)
                        .Take(pageSize)
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
    public async Task<ActionResult> CreateLocation(
                            [FromForm] PostLocationModel request)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return StatusCode(500);
        }

        if (request.location == null)
        {
            return StatusCode(500, "NoLocation");
        }

        LocationDetails? addLocation = JsonSerializer.Deserialize<LocationDetails>(request.location);

        if (addLocation == null)
        {
            return BadRequest("LocationNotValid");
        }

        Location location = new Location();

        location.Address = addLocation.address!;
        location.Description = addLocation.description!;
        location.Latitude = addLocation.latitude!;
        location.Longitude = addLocation.longitude!;
        location.Name = addLocation.name!;
        location.Type = addLocation.type!;
        location.Webpage = addLocation.webpage!;

        location.AuthorId = user.ID;
        location.UniversityId = user.UniversityId;
        location.Events = new List<Event>();
        location.Grades = new List<Grade>();
        location.PublicationTime = DateTime.Now;

        if (user.Role == Role.Student)
        {
            location.Verified = false;
            location.Parlament = null;
        }

        if (request.image != null)
        {
            location.ImagePath =
                await _imageManager.SaveImage(request.image, "/images/locations/");
        }

        if (request.imageGallery != null && request.imageGallery.Count > 0)
        {
            foreach (IFormFile img in request.imageGallery)
            {
                var imagePath = await _imageManager.SaveImage(img, "/images/locationGallery/");
                if (imagePath != null)
                {
                    location.ImageGallery.Add(imagePath);
                }
            }
        }

        _context.Add(location);
        await _context.SaveChangesAsync();
        return Ok(location);
    }

    [Route("{locationId}")]
    [Authorize(Roles = "Student")]
    [HttpPatch]
    public async Task<ActionResult> EditLocation(
                            [FromForm] PostLocationModel request, int locationId)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return StatusCode(500);
        }

        if (request.location == null)
        {
            return StatusCode(500, "NoLocation");
        }

        LocationDetails? addLocation = JsonSerializer.Deserialize<LocationDetails>(request.location);

        if (addLocation == null)
        {
            return BadRequest("LocationNotValid");
        }

        var location = await _context.Locations.FindAsync(locationId);

        if (location == null)
        {
            return BadRequest("LocationNotFound");
        }

        if (user.Role < Role.AdminUni && location.AuthorId != user.ID)
        {
            return Forbid("NotAuthor");
        }

        location.Address = addLocation.address!;
        location.Description = addLocation.description!;
        location.Latitude = addLocation.latitude!;
        location.Longitude = addLocation.longitude!;
        location.Name = addLocation.name!;
        location.Type = addLocation.type!;
        location.Webpage = addLocation.webpage!;

        if (user.Role == Role.Student)
        {
            location.Verified = false;
            location.Parlament = null;
        }

        if (request.image != null)
        {
            var imagePath = await _imageManager.SaveImage(request.image, "/images/locations/");

            if (imagePath == "UnsupportedFileType")
            {
                return BadRequest("UnsupportedFileType");
            }

            if (location.ImagePath != null && location.ImagePath != "")
            {
                _imageManager.DeleteImage(location.ImagePath);
            }

            location.ImagePath = imagePath;
        }

        if (request.imageGallery != null && request.imageGallery.Count > 0)
        {
            var images = new List<String>();

            foreach (var img in request.imageGallery)
            {
                var imagePath = await _imageManager.SaveImage(img, "/images/locationGallery/");

                if (imagePath == "UnsupportedFileType")
                {
                    return BadRequest("UnsupportedFileType");
                }

                if (imagePath != null)
                {
                    images.Add(imagePath);
                }
            }

            foreach (var s in location.ImageGallery)
            {
                _imageManager.DeleteImage(s);
            }

            location.ImageGallery = images;
        }
        await _context.SaveChangesAsync();
        return Ok(location);
    }

    [Route("{locationId}/Events/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetLocationEvents(int locationId, int page)
    {
        const int pageSize = 10;

        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        var events = _context.Events.Include(p => p.Organiser!)
                                .ThenInclude(a => a.Parlament!)
                                .ThenInclude(p => p.Faculty)
                                .Include(p => p.Comments!)
                                .ThenInclude(c => c.LikedBy)
                                .Include(p => p.LikedBy)
                                .AsSplitQuery()
                                .Where(p => p.LocationId == locationId)
                                .OrderByDescending(p => p.PublicationTime)
                                .Skip(page * pageSize)
                                .Take(pageSize);

        var eventsSelected = events.Select(p => new
        {
            id = p.ID,
            ev = p,
            liked = p.LikedBy!.Contains(student),
            verified = p.Verified,
            pinned = p.Pinned,
            author = new
            {
                p.Organiser!.ID,
                p.Organiser.FirstName,
                p.Organiser.LastName,
                p.Organiser.Username,
                p.Organiser.ImagePath,
                facultyName = p.Organiser.Parlament!.Faculty!.Name,
                facultyImagePath = p.Organiser.Parlament!.Faculty!.ImagePath
            },
        });

        return Ok(await eventsSelected.ToListAsync());
    }

    [Route("GetAllLocations/{page}")]
    [Authorize(Roles = "Admin")]
    [HttpGet]

    public async Task<ActionResult> GetAllLocations(int page)
    {
        const int locNum = 20;

        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        if ((int)student.Role != 3)
        {
            return Unauthorized("BadCredentials");
        }

        IQueryable<Location> locations;

        if (page == 0)
        {
            locations = _context.Locations.Include(p => p.University)
                                          .Include(p => p.Events)
                                          .OrderByDescending(p => p.ID)
                                          .Take(locNum);
        }
        else
        {
            locations = _context.Locations.Include(p => p.University)
                                          .Include(p => p.Events)
                                          .OrderByDescending(p => p.ID)
                                          .Skip(page * locNum)
                                          .Take(locNum);
        }

        var selectedLocations = locations.Select(p => new
        {
            id = p.ID,
            name = p.Name,
            type = p.Type,
            webpage = p.Webpage,
            firstName = p.Author!.FirstName,
            lastName = p.Author.LastName,
            author = p.Author.Username,
            university = p.University,
        });

        return Ok(await selectedLocations.ToListAsync());
    }
}
