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
public class EventController : ControllerBase
{
    private readonly Context _context;
    private readonly IAccessTokenManager _tokenManager;
    private readonly IImageManager _imageManager;

    public EventController(Context context, IAccessTokenManager tokenManager, IImageManager imageManager)
    {
        _context = context;
        _tokenManager = tokenManager;
        _imageManager = imageManager;
    }

    [Route("{eventId}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetEvent(int eventId)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }
        var res = await _context.Reservations
                                 .Include(r => r.ReservedBy)
                                 .ThenInclude(s => s!.Parlament)
                                 .ThenInclude(p => p!.Faculty)
                                 .Where(r => r.EventId == eventId && r.ReservedById == student.ID).FirstOrDefaultAsync();

        var ev = _context.Events.Where(e => e.ID == eventId)
                                    .Include(e => e.Location)
                                    .Include(e => e.Organiser)
                                    .Include(e => e.OrganisingParlament)
                                    .ThenInclude(e => e!.Faculty)
                                    .Include(e => e.Comments)
                                    .Include(e => e.LikedBy)
                                    .Include(e => e.Reservations)
                                    .AsSplitQuery();

        var evSelected = ev.Select(e => new
        {
            id = e.ID,
            ev = e,
            liked = e.LikedBy!.Contains(student),
            verified = e.Verified,
            pinned = e.Pinned,
            location = e.Location,
            reservation = res,
            author = new
            {
                e.Organiser!.ID,
                e.Organiser.FirstName,
                e.Organiser.LastName,
                e.Organiser.Username,
                e.Organiser.ImagePath,
                parlamentName = e.OrganisingParlament!.Name,
                facultyName = e.OrganisingParlament!.Faculty!.Name,
                facultyImagePath = e.OrganisingParlament!.Faculty!.ImagePath
            },
        });

        return Ok(await evSelected.FirstAsync());
    }

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> CreateEvent([FromForm] PostEventModel request)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return BadRequest("BadToken");
        }

        var student = await _context.Students
                            .Include(s => s.Parlament)
                            .ThenInclude(p => p!.Faculty)
                            .FirstOrDefaultAsync(s => s.ID == userDetails.ID);

        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        if (request.ev == null)
        {
            return StatusCode(500, "NoEvent");
        }

        EventDetails? eventDetails = JsonSerializer.Deserialize<EventDetails>(request.ev);

        if (eventDetails == null)
        {
            return BadRequest("EventDetailsDeserializationError");
        }

        Event ev = new Event();

        ev.Title = eventDetails.title;
        ev.Description = eventDetails.description;
        ev.Type = eventDetails.type;
        ev.TimeOfEvent = eventDetails.timeOfEvent;
        ev.EndTime = eventDetails.endTime;
        ev.LocationId = eventDetails.locationId;
        ev.PaidEvent = eventDetails.paidEvent;
        ev.NumberOfTickets = eventDetails.numberOfTickets;
        ev.TicketPrice = eventDetails.ticketPrice;

        if (student.Role == Role.Student)
        {
            ev.Pinned = false;
            ev.Verified = false;
        }
        else
        {
            ev.Pinned = eventDetails.pinned;
            ev.Verified = eventDetails.verified;
        }

        ev.PublicationTime = DateTime.Now;
        ev.Organiser = student;
        ev.UniversityId = student.UniversityId;

        ev.Comments = new List<Comment>();
        ev.LikedBy = new List<Student>();
        ev.Reservations = new List<Reservation>();

        if (student.Role > Role.Student && eventDetails.verified)
        {
            ev.OrganisingParlamentId = student.ParlamentId;
        }

        if (request.image != null)
        {
            var imagePath = await _imageManager.SaveImage(request.image, "/images/events/");

            if (imagePath == "UnsupportedFileType")
            {
                return BadRequest("UnsupportedFileType");
            }

            ev.ImagePath = imagePath != null ? imagePath : "/";
        }

        var loc = await _context.Locations.FindAsync(eventDetails.locationId);

        if (loc == null)
        {
            return BadRequest("LocationNotFound");
        }

        _context.Events.Add(ev);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            id = ev.ID,
            ev,
            liked = false,
            verified = ev.Verified,
            pinned = ev.Pinned,
            location = loc,
            author = new
            {
                student.ID,
                student.FirstName,
                student.LastName,
                student.Username,
                student.ImagePath,
                facultyName = student.Parlament!.Faculty!.Name,
                facultyImagePath = student.Parlament!.Faculty!.ImagePath
            }
        });
    }

    [Route("Hot")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetHotEvents()
    {
        IQueryable<Event> events;

        events = _context.Events.Include(events => events.Organiser)
                                           .Include(e => e.Comments)
                                           .AsSplitQuery()
                                           .Where(e => (e.Pinned || e.Verified) && e.EndTime > DateTime.Now)
                                           .OrderBy(e => e.TimeOfEvent)
                                           .ThenBy(e => e.PublicationTime)
                                           .Take(15);

        return Ok(await events.ToListAsync());
    }

    [Route("Feed/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetFeed(int page)
    {
        const int pageSize = 10;

        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        var events = _context.Events.Include(e => e.Organiser)
                    .ThenInclude(o => o!.Parlament)
                    .ThenInclude(p => p!.Faculty)
                    .Include(e => e.Comments)
                    .Include(e => e.LikedBy)
                    .Include(e => e.Reservations)
                    .Include(e => e.Location)
                    .AsSplitQuery()
                    .Where(e => e.EndTime > DateTime.Now && e.UniversityId == student.UniversityId)
                    .OrderByDescending(e => e.Pinned)
                    .ThenBy(e => e.TimeOfEvent)
                    .Skip(page * pageSize)
                    .Take(pageSize);

        var eventsSelected = events.Select(e => new
        {
            id = e.ID,
            ev = e,
            liked = e.LikedBy!.Contains(student),
            verified = e.Verified,
            pinned = e.Pinned,
            location = e.Location,
            author = new
            {
                e.Organiser!.ID,
                e.Organiser.FirstName,
                e.Organiser.LastName,
                e.Organiser.Username,
                e.Organiser.ImagePath,
                facultyName = e.Organiser.Parlament!.Faculty!.Name,
                facultyImagePath = e.Organiser.Parlament!.Faculty!.ImagePath
            }
        });
        return Ok(await eventsSelected.ToListAsync());
    }

    [Route("{eventId}")]
    [Authorize(Roles = "Student")]
    [HttpPatch]
    public async Task<ActionResult> EditEvent([FromForm] PostEventModel request, int eventId)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        if (request.ev == null)
        {
            return BadRequest("NoEvent");
        }

        EventDetails? ev = JsonSerializer.Deserialize<EventDetails>(request.ev);

        if (ev == null)
        {
            return BadRequest("EventDetailsDeserializationError");
        }

        var eventInDatabase = await _context.Events.FindAsync(eventId);

        if (eventInDatabase == null)
        {
            return BadRequest("EventNotFound");
        }

        if (eventInDatabase.OrganiserId == null || eventInDatabase.OrganiserId != user.ID)
        {
            return Forbid("NotAuthor");
        }

        eventInDatabase.Title = ev.title;
        eventInDatabase.Description = ev.description;
        eventInDatabase.TimeOfEvent = ev.timeOfEvent;
        eventInDatabase.Type = ev.type;
        eventInDatabase.EndTime = ev.endTime;
        eventInDatabase.PaidEvent = ev.paidEvent;
        eventInDatabase.NumberOfTickets = ev.numberOfTickets;
        eventInDatabase.TicketPrice = ev.ticketPrice;
        eventInDatabase.LocationId = ev.locationId;

        if ((int)user.Role >= (int)Role.ParlamentMember)
        {
            eventInDatabase.Verified = ev.verified;
            eventInDatabase.Pinned = ev.pinned;
        }

        if (request.image != null)
        {
            var imagePath = await _imageManager.SaveImage(request.image, "/images/events/");

            if (imagePath == "UnsupportedFileType")
            {
                return BadRequest("UnsupportedFileType");
            }

            if (eventInDatabase.ImagePath != null && eventInDatabase.ImagePath != "")
            {
                _imageManager.DeleteImage(eventInDatabase.ImagePath);
            }

            eventInDatabase.ImagePath = imagePath != null ? imagePath : "/";
        }

        await _context.SaveChangesAsync();

        return await GetEvent(eventId);
    }

    [Route("Delete/{eventId}")]
    [Authorize(Roles = "Student")]
    [HttpDelete]
    public async Task<ActionResult> DeleteEvent(int eventId)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var ev = await _context.Events
                            .Include(e => e.Comments)
                            .Include(e => e.Reservations)
                            .AsSplitQuery()
                            .FirstOrDefaultAsync(e => e.ID == eventId);

        if (ev == null)
        {
            return BadRequest("EventNotFound");
        }

        if (user.Role < Role.AdminUni
            && (ev.OrganiserId == null || ev.OrganiserId != user.ID))
        {
            return Forbid("NotAuthor");
        }

        _context.Events.Remove(ev);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [Route("SetVerified/{eventId}/{verified}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPut]
    public async Task<ActionResult> SetVerified(int eventId, bool verified)
    {
        var ev = await _context.Events.FindAsync(eventId);

        if (ev == null)
        {
            return BadRequest("EventNotFound");
        }

        ev.Verified = verified;

        await _context.SaveChangesAsync();
        return Ok(ev);
    }

    [Route("SetPinned/{eventId}/{pinned}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPut]
    public async Task<ActionResult> SetPinned(int eventId, bool pinned)
    {
        var ev = await _context.Events.FindAsync(eventId);

        if (ev == null)
        {
            return BadRequest("EventNotFound");
        }

        ev.Pinned = pinned;

        await _context.SaveChangesAsync();
        return Ok(ev);
    }

    [Route("SetLiked/{eventId}/{liked}")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> SetLiked(int eventId, bool liked)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return BadRequest("BadToken");
        }

        var ev = await _context.Events.FindAsync(eventId);

        if (ev == null)
        {
            return BadRequest("EventNotFound");
        }

        var student = await _context.Students.Include(s => s.LikedEvents)
                                        .Where(s => s.ID == userDetails.ID)
                                        .FirstOrDefaultAsync();

        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        if (liked)
        {
            student.LikedEvents!.Add(ev);
        }
        else
        {
            student.LikedEvents!.Remove(ev);
        }

        await _context.SaveChangesAsync();
        return Ok(liked);
    }

    [Route("{eventId}/Cancel")]
    [Authorize(Roles = "Student")]
    [HttpPatch]
    public async Task<ActionResult> CancelEvent(int eventId)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return StatusCode(500);
        }

        var ev = await _context.Events.FindAsync(eventId);

        if (ev == null)
        {
            return BadRequest("EventNotFound");
        }

        if (userDetails.Role < Role.AdminUni && ev.OrganiserId != userDetails.ID)
        {
            return Forbid();
        }

        ev.Canceled = true;

        await _context.SaveChangesAsync();
        return Ok();
    }
}