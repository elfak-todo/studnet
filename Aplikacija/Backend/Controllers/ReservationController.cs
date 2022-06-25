using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class ReservationController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    public ReservationController(Context context, IAccessTokenManager tokenManager)
    {
        _context = context;
        _tokenManager = tokenManager;
    }

    [Route("Event/{eventId}/{page}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpGet]
    public async Task<ActionResult> GetEventReservations(int eventId, int page)
    {
        const int pageSize = 20;

        var reservations = _context.Reservations
                                .Include(r => r.ReservedBy)
                                .ThenInclude(s => s!.Parlament)
                                .ThenInclude(p => p!.Faculty)
                                .Where(r => r.EventId == eventId)
                                .OrderByDescending(r => r.ReservationTime)
                                .Skip(pageSize * page)
                                .Take(pageSize);

        var rSelected = reservations.Select(r => new
        {
            id = r.ID,
            reservation = r,
            author = new
            {
                r.ReservedBy!.ID,
                r.ReservedBy.FirstName,
                r.ReservedBy.LastName,
                r.ReservedBy.Username,
                r.ReservedBy.ImagePath,
                facultyName = r.ReservedBy.Parlament!.Faculty!.Name,
                facultyImagePath = r.ReservedBy.Parlament.Faculty.ImagePath
            },
        });

        return Ok(await rSelected.ToListAsync());
    }

    [Route("EventReservations/{eventId}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpGet]
    public async Task<ActionResult> ExportReservations(int eventId)
    {

        var reservations = _context.Reservations
                                .Include(r => r.ReservedBy)
                                .ThenInclude(s => s!.Parlament)
                                .ThenInclude(p => p!.Faculty)
                                .Where(r => r.EventId == eventId && !r.Canceled);

        var rSelected = reservations.Select(r => new
        {
            Name = r.ReservedBy!.FirstName + " " + r.ReservedBy.LastName,
            Username = r.ReservedBy.Username,
            FacultyName = r.ReservedBy.Parlament!.Faculty!.Name,
            Tickets = r.NumberOfTickets,
        });

        return Ok(await rSelected.ToListAsync());
    }

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> Reserve([FromBody] Reservation res)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return StatusCode(500);
        }

        if (res.EventId == null)
        {
            return BadRequest("EventRequired");
        }

        var ev = await _context.Events
                .Include(e => e.Reservations)
                .FirstOrDefaultAsync(e => e.ID == res.EventId);

        if (ev == null)
        {
            return BadRequest("EventNotFound");
        }

        if (await _context.Reservations.FirstOrDefaultAsync(r => r.EventId
        == res.EventId && r.ReservedById == res.ReservedById) != null)
        {
            return BadRequest("ReservationAlreadyExists");
        }

        int ticketsLeft = ev.NumberOfTickets - ev.TicketsReserved;

        if (res.NumberOfTickets > ticketsLeft)
        {
            return BadRequest("NotEnoughTicketsLeft");
        }

        res.ReservationTime = DateTime.Now;
        res.ReservedById = userDetails.ID;

        _context.Reservations.Add(res);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            reservation = res,
            spaceTaken = ev.SpaceTaken
        });
    }

    [Route("Edit")]
    [Authorize(Roles = "Student")]
    [HttpPatch]
    public async Task<ActionResult> EditReservation([FromBody] Reservation res)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return StatusCode(500);
        }

        var resInDatabase = await _context.Reservations.FindAsync(res.ID);

        if (resInDatabase == null)
        {
            return NotFound("ReservationNotFound");
        }

        var ev = await _context.Events
                .Include(e => e.Reservations)
                .FirstOrDefaultAsync(e => e.ID == res.EventId);

        if (ev == null)
        {
            return BadRequest("EventNotFound");
        }

        int ticketsLeft = ev.NumberOfTickets - ev.TicketsReserved;

        if (res.NumberOfTickets > ticketsLeft)
        {
            return BadRequest("NotEnoughTicketsLeft");
        }

        resInDatabase.NumberOfTickets = res.NumberOfTickets;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            reservation = res,
            spaceTaken = ev.SpaceTaken
        });
    }

    [Route("{resId}")]
    [Authorize(Roles = "AdminUni")]
    [HttpDelete]
    public async Task<ActionResult> DeleteReservation(int resId)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return StatusCode(500);
        }

        var res = await _context.Reservations.FindAsync(resId);

        if (res == null)
        {
            return NotFound("ReservationNotFound");
        }

        _context.Reservations.Remove(res);
        await _context.SaveChangesAsync();
        return Ok(res);
    }

    [Route("{resId}/Cancel")]
    [Authorize(Roles = "Student")]
    [HttpPatch]
    public async Task<ActionResult> CancelReservation(int resId)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return StatusCode(500);
        }

        var res = await _context.Reservations.FindAsync(resId);

        if (res == null)
        {
            return NotFound("ReservationNotFound");
        }

        if (res.ReservedById != userDetails.ID)
        {
            return Forbid();
        }

        var ev = await _context.Events
                .Include(e => e.Reservations)
                .FirstOrDefaultAsync(e => e.ID == res.EventId);

        if (ev == null)
        {
            return BadRequest("EventNotFound");
        }

        res.Canceled = true;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            reservation = res,
            spaceTaken = ev.SpaceTaken
        });
    }
}
