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
    private IConfiguration _config;

    public StudentController(Context context, IConfiguration config,
            IAccessTokenManager tokenManager, IPasswordManager passwordManager)
    {
        _context = context;
        _tokenManager = tokenManager;
        _passwordManager = passwordManager;
        _config = config;
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

    //Profile page

    [Route("{studentId}/Locations/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetStudentLocations(int studentId, int page)
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
                            .Where(l => l.AuthorId == studentId)
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

    [Route("{studentId}/Posts/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetStudentPosts(int studentId, int page)
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
                                .Where(p => p.AuthorId == studentId
                                    && (!p.Anonymous || student.ID == studentId))
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

    [Route("{studentId}/Events/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetStudentEvents(int studentId, int page)
    {
        //TODO

        //const int pageSize = 10;

        // var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        // if (userDetails == null)
        // {
        //     return BadRequest("BadToken");
        // }

        await _context.SaveChangesAsync();

        return Ok(Array.Empty<Object>());
    }

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> EditProfile([FromBody] Student student)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return StatusCode(401);
        }

        if (student == null)
        {
            return BadRequest("StudentRequired");
        }

        if ((await _context.Students.FirstOrDefaultAsync(s => s.Username == student.Username)) != null)
        {
            return BadRequest("UsernameTaken");
        }

        var studentInDatabase = await _context.Students.FindAsync(userDetails.ID);

        if (studentInDatabase == null)
        {
            return BadRequest("StudentNotFound");
        }

        studentInDatabase.Username = student.Username;
        studentInDatabase.FirstName = student.FirstName;
        studentInDatabase.LastName = student.LastName;
        studentInDatabase.Gender = student.Gender;
        studentInDatabase.IsExchange = student.IsExchange;
        studentInDatabase.ParlamentId = student.ParlamentId;

        await _context.SaveChangesAsync();
        return Ok(studentInDatabase);
    }

    [Route("/Password")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePassword passwords)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (passwords.OldPassword == null || passwords.NewPassword == null)
        {
            return BadRequest("FieldMissing");
        }

        if (student == null || !_passwordManager.verifyPassword(passwords.OldPassword, student.Password))
        {
            return Unauthorized("BadCredentials");
        }

        student.Password = _passwordManager.hashPassword(passwords.NewPassword);

        await _context.SaveChangesAsync();
        return Ok();
    }

    [Route("Image")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> UploadImage([FromForm] IFormFile image)
    {
        if (image == null)
        {
            return BadRequest("ImageRequired");
        }

        string[] allowedContentType = new string[] { ".png", ".jpg", ".jpeg" };

        string extension = Path.GetExtension(image.FileName);

        if (!allowedContentType.Contains(extension))
        {
            return BadRequest("UnsupportedFileType");
        }

        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        var fileName = Path.GetRandomFileName();
        var imagePath = "/images/users/" + fileName + extension;

        using (var stream = System.IO.File.Create(_config["Files:StaticPath"] + imagePath))
        {
            await image.CopyToAsync(stream);
            student.ImagePath = imagePath;
            await _context.SaveChangesAsync();
            return Ok(imagePath);
        }
    }
}

