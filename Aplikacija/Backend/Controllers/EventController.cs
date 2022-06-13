using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class EventController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    public EventController(Context context, IAccessTokenManager tokenManager)
    {
        _context = context;
        _tokenManager = tokenManager;
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
            author = new
            {
                e.Organiser!.ID,
                e.Organiser.FirstName,
                e.Organiser.LastName,
                e.Organiser.Username,
                e.Organiser.ImagePath,
                facultyName = e.OrganisingParlament!.Faculty!.Name,
                facultyImagePath = e.OrganisingParlament!.Faculty!.ImagePath
            },
        });

        return Ok(await evSelected.FirstAsync());
    }

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> PostEvent([FromBody] Event ev)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        var student = await _context.Students.Include(s => s.Parlament!)
                                        .ThenInclude(p => p.Faculty)
                                        .Where(s => s.ID == userDetails!.ID)
                                        .FirstOrDefaultAsync();


        if (student == null)
        {
            return BadRequest("StudentNotFound");
        }

        if (ev.LocationId == null)
        {
            return BadRequest("FieldMissing");
        }

        ev.PublicationTime = DateTime.Now;
        ev.Organiser = student;
        ev.Comments = new List<Comment>();
        ev.LikedBy = new List<Student>();
        ev.Reservations = new List<Reservation>();
        ev.OrganisingParlamentId = student.ParlamentId;
        ev.UniversityId = student.UniversityId;

        if ((int)student.Role < (int)Role.ParlamentMember)
        {
            ev.Verified = false;
            ev.Pinned = false;
        }

        _context.Events.Add(ev);
        await _context.SaveChangesAsync();

        return Ok(ev);
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

        var EventsSelected = events.Select(e => new
        {
            ev = e,
            author = new
            {
                e.Organiser!.ID,
                e.Organiser.FirstName,
                e.Organiser.LastName,
                e.Organiser.Username,
                e.Organiser.ImagePath
            },
            comments = e.Comments!.OrderByDescending(e => e.Pinned)
                                .ThenByDescending(e => e.PublicationTime)
                                .Take(3)
                                .Select(c => new
                                {
                                    comment = c,
                                    author = new
                                    {
                                        e.Organiser!.ID,
                                        e.Organiser.FirstName,
                                        e.Organiser.LastName,
                                        e.Organiser.Username,
                                        e.Organiser.ImagePath
                                    }
                                }),

        });
        return Ok(await EventsSelected.ToListAsync());
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

    [Route("Edit")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> EditEvent([FromBody] Event ev)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var eventInDatabase = await _context.Events.FindAsync(ev.ID);

        if (eventInDatabase == null)
        {
            return BadRequest("EventNotFound");
        }

        if (ev.OrganiserId == null || ev.OrganiserId != user.ID)
        {
            return Forbid("NotAuthor");
        }

        eventInDatabase.Title = ev.Title;
        eventInDatabase.Description = ev.Description;
        eventInDatabase.TimeOfEvent = ev.TimeOfEvent;
        eventInDatabase.Type = ev.Type;
        eventInDatabase.EndTime = ev.EndTime;
        eventInDatabase.LocationName = ev.LocationName;
        eventInDatabase.ImagePath = ev.ImagePath;
        eventInDatabase.PaidEvent = ev.PaidEvent;
        eventInDatabase.NumberOfTickets = ev.NumberOfTickets;
        eventInDatabase.TicketPrice = ev.TicketPrice;
        eventInDatabase.Reservations = ev.Reservations;

        if ((int)user.Role >= (int)Role.ParlamentMember)
        {
            eventInDatabase.Verified = ev.Verified;
            eventInDatabase.Pinned = ev.Pinned;
        }

        await _context.SaveChangesAsync();

        return Ok(eventInDatabase);
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