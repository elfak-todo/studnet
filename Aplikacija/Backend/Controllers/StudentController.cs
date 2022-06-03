using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using Backend.Models;
using Backend.Data;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class StudentController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;
    private IPasswordManager _passwordManager;

    public StudentController(Context context, IConfiguration config,
            IAccessTokenManager tokenManager, IPasswordManager passwordManager)
    {
        _context = context;
        _tokenManager = tokenManager;
        _passwordManager = passwordManager;
    }

    [Route("{studentId}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetStudent(int studentId)
    {
        if (_context.Students == null)
        {
            return StatusCode(500);
        }

        var student = await _context.Students.Include(s => s.PublishedPosts)
                                        .Include(s => s.PublishedEvents)
                                        .Include(s => s.Locations)
                                        .Include(s => s.University)
                                        .Include(s => s.Parlament!)
                                        .ThenInclude(p => p.Faculty)
                                        .AsSplitQuery()
                                        .Where(s => s.ID == studentId)
                                        .FirstOrDefaultAsync();

        if (student == null)
        {
            return NotFound("StudentNotFound");
        }

        return Ok(
            new
            {
                id = student.ID,
                username = student.Username,
                firstName = student.FirstName,
                lastName = student.LastName,
                isExchange = student.IsExchange,
                gender = student.Gender,
                role = student.Role,
                imagePath = student.ImagePath,
                universityName = student.University!.Name,
                universityId = student.University!.ID,
                facultyName = student.Parlament!.Faculty!.Name,
                facultyImagePath = student.Parlament!.Faculty!.ImagePath,
                facultyId = student.Parlament!.ID,
                postCount = student.PublishedPosts!.Count(),
                locationCount = student.Locations!.Count(),
                eventCount = student.PublishedEvents!.Count()
            }
        );
    }

    [Route("Login")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult> Login([FromBody] LoginCredentials creds)
    {
        if (_context.Students == null)
        {
            return StatusCode(500);
        }

        if (creds.Username == null || creds.Password == null)
        {
            return BadRequest("FieldMissing");
        }

        var student = await _context.Students.Where(s => s.Username == creds.Username
                        || s.Email == creds.Username)
                                .Include(s => s.University)
                                .FirstOrDefaultAsync();

        if (student == null || !_passwordManager.verifyPassword(creds.Password, student.Password))
        {
            return Unauthorized("BadCredentials");
        }

        if (student.University == null)
        {
            return StatusCode(500, "UniversityNotFound");
        }

        string? token = _tokenManager.GenerateAccessToken(student);

        return Ok(
            new
            {
                id = student.ID,
                username = student.Username,
                firstName = student.FirstName,
                lastName = student.LastName,
                role = student.Role,
                accessToken = token,
                imagePath = student.ImagePath,
                university = student.University.Name,
                universityId = student.University.ID,
            }
        );
    }

    [Route("Register")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult> Register([FromBody] Student student)
    {
        if (student.Password == null || student.ParlamentId == null || student.UniversityId == null)
        {
            return BadRequest("FieldMissing");
        }

        if ((await _context.Students.FirstOrDefaultAsync(s => s.Email == student.Email)) != null)
        {
            return BadRequest("EmailTaken");
        }

        if ((await _context.Students.FirstOrDefaultAsync(s => s.Username == student.Username)) != null)
        {
            return BadRequest("UsernameTaken");
        }

        student.PublishedPosts = new List<Post>();
        student.PublishedEvents = new List<Event>();
        student.PublishedComments = new List<Comment>();
        student.LikedPosts = new List<Post>();
        student.LikedEvents = new List<Event>();
        student.LikedComments = new List<Comment>();
        student.LikedLocations = new List<Location>();
        student.Grades = new List<Grade>();
        student.Reservations = new List<Reservation>();
        student.Locations = new List<Location>();

        student.Password = _passwordManager.hashPassword(student.Password);

        await _context.AddAsync(student);
        await _context.SaveChangesAsync();

        return Ok("RegistrationSuccessful");
    }

    [Route("Delete")]
    [Authorize]
    [HttpDelete]
    public async Task<ActionResult> Delete()
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return BadRequest("StudentNotFound");
        }

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();

        return Ok("DeletionSuccessful");
    }
}

