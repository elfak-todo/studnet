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
public class ParlamentController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;
    private IImageManager _imageManager;

    public ParlamentController(Context context, IAccessTokenManager tokenManager,
                    IImageManager imageManager)
    {
        _context = context;
        _tokenManager = tokenManager;
        _imageManager = imageManager;
    }

    [Route("List/{page}")]
    [Authorize(Roles = "AdminUni")]
    [HttpGet]
    public async Task<ActionResult> ListParlaments(int page)
    {
        const int pageSize = 20;

        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return Unauthorized();
        }

        var parlamentList = _context.Parlaments
            .Include(p => p.Faculty)
            .Include(p => p.Members)
            .Include(p => p.Events)
            .Where(p => (int)student.Role == 3 || p.UniversityId == student.UniversityId)
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

    [Route("{parId}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpGet]
    public async Task<ActionResult> GetParlament(int parId)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return Unauthorized();
        }

        var parlament = await _context.Parlaments
            .Include(p => p.Faculty)
            .Include(p => p.University)
            .FirstOrDefaultAsync(p => parId == 0 ? p.ID == student.ParlamentId : p.ID == parId);

        if (parlament == null)
        {
            return StatusCode(404);
        }

        return Ok(new
        {
            id = parlament.ID,
            location = parlament.Faculty,
            name = parlament.Name
        });
    }

    [Route("Posts/{page}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpGet]
    public async Task<ActionResult> GetParlamentPosts(int page)
    {
        const int pageSize = 10;

        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        var posts = _context.Posts.Include(p => p.Author!)
            .ThenInclude(a => a.Parlament!)
            .ThenInclude(p => p.Faculty)
            .Include(p => p.Comments!)
            .ThenInclude(c => c.LikedBy)
            .Include(p => p.LikedBy)
            .AsSplitQuery()
            .Where(p => p.Author!.ParlamentId == student.ParlamentId && p.Verified)
            .OrderByDescending(p => p.PublicationTime)
            .Skip(page * pageSize)
            .Take(pageSize);

        var postsSelected = posts.Select(p => new
        {
            id = p.ID,
            post = p,
            liked = p.LikedBy!.Contains(student),
            author = new
            {
                p.Author!.ID,
                p.Author.FirstName,
                p.Author.LastName,
                p.Author.Username,
                p.Author.ImagePath,
                facultyName = p.Author.Parlament!.Faculty!.Name,
                facultyImagePath = p.Author.Parlament!.Faculty!.ImagePath
            },
            comments = p.Comments!.OrderByDescending(p => p.Pinned)
            .ThenByDescending(p => p.Verified)
            .ThenByDescending(p => p.PublicationTime)
            .Take(3)
            .Select(c => new
            {
                comment = c,
                liked = c.LikedBy!.Contains(student),
                author = c.Anonymous && c.AuthorId != student.ID ?
                null : new
                {
                    c.Author!.ID,
                    c.Author.FirstName,
                    c.Author.LastName,
                    c.Author.Username,
                    c.Author.ImagePath,
                    facultyName = c.Author.Parlament!.Faculty!.Name,
                    facultyImagePath = c.Author.Parlament!.Faculty!.ImagePath
                }
            }),
        });

        return Ok(await postsSelected.ToListAsync());
    }

    [Route("Events/{page}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpGet]
    public async Task<ActionResult> GetParlamentEvents(int page)
    {
        const int pageSize = 10;

        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        var events = _context.Events
            .Include(e => e.Organiser!)
            .ThenInclude(o => o.Parlament!)
            .ThenInclude(p => p.Faculty)
            .Include(e => e.Comments!)
            .ThenInclude(c => c.LikedBy)
            .Include(e => e.LikedBy)
            .Include(e => e.Location)
            .AsSplitQuery()
            .Where(e => e.OrganisingParlamentId == student.ParlamentId && e.Verified)
            .OrderByDescending(e => e.PublicationTime)
            .Skip(page * pageSize)
            .Take(pageSize);

        var eventsSelected = events.Select(p => new
        {
            id = p.ID,
            ev = p,
            liked = p.LikedBy!.Contains(student),
            verified = p.Verified,
            pinned = p.Pinned,
            location = p.Location,
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

    [Route("Locations/{page}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpGet]
    public async Task<ActionResult> GetStudentLocations(int page)
    {
        const int pageSize = 10;

        var user = _tokenManager.GetUserDetails(HttpContext.User);

        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return BadRequest("UserNotFound");
        }
        if (user == null)
        {
            return StatusCode(500);
        }

        var locations = await _context.Locations
            .Include(l => l.Grades!.OrderByDescending(g => g.PublicationTime))
            .ThenInclude(g => g.GradedBy)
            .AsSplitQuery()
            .Where(l => l.Author!.ParlamentId == student.ParlamentId && l.Verified)
            .OrderByDescending(l => l.Grades!.Count())
            .Skip(page * pageSize)
            .Take(10)
            .ToListAsync();

        locations.ForEach(l =>
        {
            l.GradeCount = l.Grades!.Count();
            l.Grades = l.Grades!.Take(3).ToList();
        });

        return Ok(locations);
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

    [Route("")]
    [Authorize(Roles = "AdminUni")]
    [HttpPost]
    public async Task<ActionResult> CreateParlament(
                            [FromForm] PostParlamentModel request)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return StatusCode(500);
        }

        if (request.parlament == null)
        {
            return StatusCode(500, "NoParlament");
        }

        ParlamentDetails? addParlament = JsonSerializer.Deserialize<ParlamentDetails>(request.parlament);

        if (addParlament == null)
        {
            return BadRequest("ParlamentNotValid");
        }

        if (addParlament.location == null)
        {
            return BadRequest("LocationRequired");
        }

        Location location = new Location();

        location.Address = addParlament.location.address!;
        location.Description = addParlament.location.description!;
        location.Latitude = addParlament.location.latitude!;
        location.Longitude = addParlament.location.longitude!;
        location.Name = addParlament.location.name!;
        location.Type = LocationType.Faculty;
        location.Webpage = addParlament.location.webpage!;

        location.AuthorId = user.ID;
        location.UniversityId = addParlament.uniId;
        location.Events = new List<Event>();
        location.Grades = new List<Grade>();
        location.PublicationTime = DateTime.Now;
        location.Verified = true;

        Parlament parlament = new Parlament();
        parlament.Faculty = location;
        parlament.UniversityId = addParlament.uniId;
        parlament.Name = addParlament.name!;

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

        _context.Add(parlament);
        await _context.SaveChangesAsync();
        return Ok(new
        {
            id = parlament.ID,
            name = parlament.Name,
            facultyName = parlament.Faculty != null ? parlament.Faculty.Name : "",
            memberCount = parlament.Members != null ? parlament.Members.Where(s => s.Role > Role.Student).Count() : 0,
            eventCount = parlament.Events != null ? parlament.Events.Count() : 0,
        });
    }

    [Route("{parlamentId}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPatch]
    public async Task<ActionResult> EditParlament(
                            [FromForm] PostParlamentModel request, int parlamentId)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return StatusCode(500);
        }

        if (request.parlament == null)
        {
            return StatusCode(500, "NoParlament");
        }

        ParlamentDetails? addParlament = JsonSerializer.Deserialize<ParlamentDetails>(request.parlament);

        if (addParlament == null)
        {
            return BadRequest("ParlamentNotValid");
        }

        var parlament = await _context.Parlaments
            .Include(p => p.Faculty)
            .FirstOrDefaultAsync(p => parlamentId == p.ID);

        if (parlament == null)
        {
            return BadRequest("ParlamentNotFound");
        }

        if (student.Role < Role.AdminUni && parlament.ID != student.ParlamentId)
        {
            return Forbid("NotAuthor");
        }

        if (addParlament.location == null)
        {
            return BadRequest("LocationRequired");
        }

        parlament.Faculty!.Address = addParlament.location.address!;
        parlament.Faculty.Description = addParlament.location.description!;
        parlament.Faculty.Latitude = addParlament.location.latitude!;
        parlament.Faculty.Longitude = addParlament.location.longitude!;
        parlament.Faculty.Name = addParlament.location.name!;
        parlament.Faculty.Webpage = addParlament.location.webpage!;

        parlament.Name = addParlament.name!;

        if (request.image != null)
        {
            var imagePath = await _imageManager.SaveImage(request.image, "/images/locations/");

            if (imagePath == "UnsupportedFileType")
            {
                return BadRequest("UnsupportedFileType");
            }

            if (parlament.Faculty.ImagePath != null && parlament.Faculty.ImagePath != "")
            {
                _imageManager.DeleteImage(parlament.Faculty.ImagePath);
            }

            parlament.Faculty.ImagePath = imagePath;
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

            foreach (var s in parlament.Faculty.ImageGallery)
            {
                _imageManager.DeleteImage(s);
            }

            parlament.Faculty.ImageGallery = images;
        }
        await _context.SaveChangesAsync();
        return Ok(new
        {
            id = parlament.ID,
            name = parlament.Name,
            facultyName = parlament.Faculty != null ? parlament.Faculty.Name : "",
            memberCount = parlament.Members != null ? parlament.Members.Where(s => s.Role > Role.Student).Count() : 0,
            eventCount = parlament.Events != null ? parlament.Events.Count() : 0,
        });
    }
}
