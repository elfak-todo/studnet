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
                        || s.Email == creds.Username).FirstOrDefaultAsync();

        if (student == null || !_passwordManager.verifyPassword(creds.Password, student.Password))
        {
            return Unauthorized("BadCredentials");
        }

        string? token = _tokenManager.GenerateAccessToken(student);

        return Ok(
            new
            {
                imagePath = student.ImagePath,
                id = student.ID,
                username = student.Username,
                name = $"{student.FirstName} {student.LastName}",
                role = student.Role,
                accessToken = token,
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

