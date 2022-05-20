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


    [Route("Event")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> Event([FromBody] Event _event)
    {
        var student = await _tokenManagerManager.GetStudent(HttpContext.User);

        if (student ==  null)
        {
            return BadRequest("StudentNotFound");
        }

        _event.PublicationTime = DateTime.Now;
        _event.Author = student;
        _event.Edited = false;
        _event.Comments = new List<Comment>();
        _event.LikedBy = new List<Student>();

        if ((int)student.Role < (int)Role.ParlamentMember)
        {
            _event.Verified = false;
            _event.Pinned = false;
        }

        _context.Event.Add(_event);
        await _context.SaveChangesAsync();

        return Ok(post);
    }

    [Route("Feed/Event/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetFeed(int page)
    {
        const int pageSize = 20;

        IQeryable<Event> events;

        if (page == 0)
        {
            events = _context.Events.Include (events =>events.Author)
                                    .Include(e=>e.Comments)
                                    .OrderByDescending(e=>e.PublicationTime)
                                    .Take(pageSize)
                                    .OrderByDescending(e=> e.Pinned)
                                    .ThenByDescending(e => e.Verified)
                                    .ThenByDescending(e => e.PublicationTime);
        }
        else
        {
            events = _context.Events.Include(e=>e.Author)
                                    .Include(e=>e.Comments)
                                    .OrderByDescending(e=>e.PublicationTime)
                                    .Skip(page * pageSize)
                                    .Take(pageSize);
        }

        var EventsSelected = events.Select(e=> new
        {
            _event = e,
            author = new
            {
                e.Author!.ID,
                e.Author.FirstName,
                e.Author.LastName,
                e.Author.Username,
                e.Author.ImagePath
            },
            comments = e.Comments!.OrderByDescending(e=>e.Pinned)
                                .ThenByDescending(e=>e.verified)
                                .ThenByDescending(e=>e.PublicationTime)
                                .Take(3)
                                .Select(c=> new 
                                {
                                    comment = c,
                                    author = e.Anonymous ? null : new
                                    {
                                        e.Author!.ID,
                                        e.Author.FirstName,
                                        e.Author.LastName,
                                        e.Author.Username,
                                        e.Author.ImagePath
                                    }
                                }),
        });
        return Ok(await EventsSelected.ToListAsync());
    }

    [Route("Edit")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> EditEvent([FromBody] Event _event)
    {
         var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var eventInDatabase = await _context.Events.FindAsync(_event.ID);

        if (eventInDatabase == null)
        {
            return BadRequest("EventNotFound");
        }

        if (_event.Author == null || _event.Author.ID != user.ID)
        {
            return Forbid("NotAuthor");
        }

        eventInDatabase.Text = _event.Text;
        eventInDatabase.Edited = true;

        if ((int)user.Role >= (int)Role.ParlamentMember)
        {
            eventInDatabase.Verified = _event.Verified;
            eventInDatabase.Pinned = _event.Pinned;
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

        var _event = await _context.Events.Include(e => e.Author)
                            .FirstOrDefaultAsync(e => e.ID == eventId);

        if (_event == null)
        {
            return BadRequest("PostNotFound");
        }

        if (_event.Author == null || _event.Author.ID != user.ID)
        {
            return Forbid("NotAuthor");
        }

        _context.Events.Remove(_event);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [Route("SetVerified/{eventId}/{verified}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPut]
    public async Task<ActionResult> SetVerified(int eventId, bool verified)
    {
        var _event = await _context.Events.FindAsync(eventId);

        if (_event == null)
        {
            return BadRequest("PostNotFound");
        }

        _event.Verified = verified;

        await _context.SaveChangesAsync();
        return Ok(_event);
    }

    [Route("SetPinned/{eventId}/{pinned}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPut]
    public async Task<ActionResult> SetPinned(int eventId, bool pinned)
    {
        var _event = await _context.Events.FindAsync(eventId);

        if (_event == null)
        {
            return BadRequest("EventNotFound");
        }

        _event.Pinned = pinned;

        await _context.SaveChangesAsync();
        return Ok(_event);
    }
}
