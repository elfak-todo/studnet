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
    private IImageManager _imageManager;

    public StudentController(Context context, IConfiguration config,
            IAccessTokenManager tokenManager, IPasswordManager passwordManager,
            IImageManager imageManager)
    {
        _context = context;
        _tokenManager = tokenManager;
        _passwordManager = passwordManager;
        _config = config;
        _imageManager = imageManager;
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
                parlamentId = student.Parlament!.ID,
                postCount = student.PublishedPosts!.Count(),
                locationCount = student.Locations!.Count(),
                eventCount = student.PublishedEvents!.Count(),
                isBanned = student.IsBanned
            }
        );
    }

    [Route("List/{page}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpGet]
    public async Task<ActionResult> SearchStudents(int page,
                                                    [FromQuery] int? uniId,
                                                    [FromQuery] int? parId,
                                                    [FromQuery] string? q,
                                                    [FromQuery] bool? isPMember,
                                                    [FromQuery] Role? role,
                                                    [FromQuery] bool? adminMode)
    {
        const int studentNum = 10;

        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return Unauthorized();
        }

        if (adminMode == true && student.Role < Role.AdminUni)
        {
            return Forbid();
        }

        if (adminMode == false)
        {
            if ((int)student.Role == 1)
            {
                parId = student.ParlamentId;
            }
            uniId = student.UniversityId;
        }

        List<string>? toks = null;

        if (q != null)
        {
            toks = new List<string>(q.Split(' '));
        }

        var students = _context.Students
            .Include(p => p.University)
            .Include(p => p.Parlament)
            .Where(p => (uniId == null || p.UniversityId == uniId)
                && (parId == null || p.ParlamentId == parId)
                && (toks == null
                    || p.FirstName.Contains(toks[0]) || (toks.Count() > 1 && p.FirstName.Contains(toks[1]))
                    || p.LastName.Contains(toks[0]) || (toks.Count() > 1 && p.LastName.Contains(toks[1]))
                    || p.Username.Contains(toks[0]) || (toks.Count() > 1 && p.Username.Contains(toks[1])))
                && (isPMember == null || p.Role > Role.Student)
                && (role == null || p.Role == role))
            .AsSplitQuery()
            .OrderByDescending(p => p.ID)
            .Skip(page * studentNum)
            .Take(studentNum);

        if (adminMode == true)
        {
            var selectedStudents = students.Select(p => new
            {
                id = p.ID,
                username = p.Username,
                firstName = p.FirstName,
                lastName = p.LastName,
                email = p.Email,
                role = p.Role,
                gender = p.Gender,
                isExchange = p.IsExchange,
                universityName = p.University!.Name,
                facultyName = p.Parlament!.Faculty!.Name,
                isBanned = p.IsBanned
            });

            return Ok(await selectedStudents.ToListAsync());
        }
        else if ((int)student.Role == 1)
        {
            var selectedStudents = students.Select(p => new
            {
                id = p.ID,
                username = p.Username,
                firstName = p.FirstName,
                lastName = p.LastName,
                role = p.Role,
                gender = p.Gender,
                isExchange = p.IsExchange,
            });

            return Ok(await selectedStudents.ToListAsync());
        }
        else if ((int)student.Role == 2)
        {
            var selectedStudents = students.Select(p => new
            {
                id = p.ID,
                username = p.Username,
                firstName = p.FirstName,
                lastName = p.LastName,
                email = p.Email,
                role = p.Role,
                gender = p.Gender,
                isExchange = p.IsExchange,
                facultyName = p.Parlament!.Faculty!.Name,
                isBanned = p.IsBanned
            });

            return Ok(await selectedStudents.ToListAsync());
        }
        else return Forbid();
    }
    [Route("InterestingData")]
    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<ActionResult> InterestingData()
    {
        var students = await _context.Students.ToListAsync();
        var posts = await _context.Posts.ToListAsync();
        var events = await _context.Events.ToListAsync();
        var locations = await _context.Locations.ToListAsync();

        var counters = new
        {
            studentCounter = students != null ? students.Count() : 0,
            postCounter = posts != null ? posts.Count() : 0,
            eventCounter = events != null ? events.Count() : 0,
            locationsCounter = locations != null ? locations.Count() : 0,
        };
        return Ok(counters);
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
                                .Include(s => s.Parlament)
                                .ThenInclude(p => p!.Faculty)
                                .FirstOrDefaultAsync();

        if (student == null || !_passwordManager.verifyPassword(creds.Password, student.Password))
        {
            return Unauthorized("BadCredentials");
        }

        if (student.IsBanned)
        {
            return Forbid("StudentBanned");
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
                universityLongitude = student.University.Longitude,
                universityLatitude = student.University.Latitude,
                facultyName = student.Parlament!.Faculty!.Name
            }
        );
    }

    [Route("Register")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult> Register([FromBody] RegistrationData regData)
    {
        if (regData.Password == String.Empty || regData.ParlamentId == -1 || regData.UniversityId == -1)
        {
            return BadRequest("FieldMissing");
        }

        if ((await _context.Students.FirstOrDefaultAsync(s => s.Email == regData.Email)) != null)
        {
            return BadRequest("EmailTaken");
        }

        if ((await _context.Students.FirstOrDefaultAsync(s => s.Username == regData.Username)) != null)
        {
            return BadRequest("UsernameTaken");
        }

        Student student = new Student();

        student.Username = regData.Username;
        student.Email = regData.Email;
        student.FirstName = regData.FirstName;
        student.LastName = regData.LastName;
        student.Gender = regData.Gender;
        student.IsExchange = regData.IsExchange;
        student.UniversityId = regData.UniversityId;
        student.ParlamentId = regData.ParlamentId;

        student.Password = _passwordManager.hashPassword(regData.Password);

        student.ImagePath = "/";
        student.Role = Role.Student;

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
        const int pageSize = 10;

        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        var events = _context.Events.Include(e => e.Organiser!)
                                .ThenInclude(o => o.Parlament!)
                                .ThenInclude(p => p.Faculty)
                                .Include(e => e.Comments!)
                                .ThenInclude(c => c.LikedBy)
                                .Include(e => e.LikedBy)
                                .Include(e => e.Location)
                                .AsSplitQuery()
                                .Where(e => e.OrganiserId == studentId)
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

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> EditProfile([FromBody] Student student)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return Unauthorized();
        }

        if (student == null)
        {
            return BadRequest("StudentRequired");
        }

        var studentWithUsername = await _context.Students
                    .FirstOrDefaultAsync(s => s.Username == student.Username);

        if (studentWithUsername != null && studentWithUsername.ID != userDetails.ID)
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
        return await GetStudent(userDetails.ID);
    }

    [Route("Password")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> ChangePassword([FromBody] ChangePassword passwords)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return Unauthorized("UserNotFound");
        }

        if (passwords.OldPassword == null || passwords.NewPassword == null)
        {
            return BadRequest("FieldMissing");
        }

        if (!_passwordManager.verifyPassword(passwords.OldPassword, student.Password))
        {
            return BadRequest("BadCredentials");
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

        var student = await _tokenManager.GetStudent(HttpContext.User);
        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        var imagePath = await _imageManager.SaveImage(image, "/images/users/");

        if (imagePath == "UnsupportedFileType")
        {
            return BadRequest("UnsupportedFileType");
        }

        if (student.ImagePath != null && student.ImagePath != "")
        {
            _imageManager.DeleteImage(student.ImagePath);
        }

        student.ImagePath = imagePath;
        await _context.SaveChangesAsync();
        return Ok(imagePath);
    }

    [Route("{studentId}/Ban/{banned}")]
    [Authorize(Roles = "AdminUni")]
    [HttpPatch]
    public async Task<ActionResult> SetBannedStudent(int studentId, bool banned)
    {
        var student = await _context.Students.FindAsync(studentId);

        if (student == null)
        {
            return NotFound("StudentNotFound");
        }

        student.IsBanned = banned;
        await _context.SaveChangesAsync();
        return Ok(banned);
    }

    [Route("{studentId}/Role/{role}")]
    [Authorize(Roles = "AdminUni")]
    [HttpPatch]
    public async Task<ActionResult> ChangeStudentRole(int studentId, Role role)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return Unauthorized();
        }

        if (role > userDetails.Role)
        {
            return Forbid();
        }

        var student = await _context.Students.FindAsync(studentId);

        if (student == null)
        {
            return NotFound("StudentNotFound");
        }

        student.Role = role;
        await _context.SaveChangesAsync();
        return Ok(student.Role);
    }

    [Route("{studentId}")]
    [Authorize(Roles = "Student")]
    [HttpDelete]
    public async Task<ActionResult> DeleteUser(int studentId)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return Unauthorized();
        }

        if (userDetails.Role < Role.AdminUni && userDetails.ID != studentId)
        {
            return Forbid("NotAuthorized");
        }

        var student = await _context.Students
                        .Include(s => s.PublishedPosts!)
                        .ThenInclude(p => p.Comments)
                        .Include(s => s.PublishedEvents!)
                        .ThenInclude(p => p.Comments)
                        .Include(s => s.PublishedEvents!)
                        .ThenInclude(e => e.Reservations)
                        .Include(s => s.PublishedComments)
                        .Include(s => s.Locations!)
                        .ThenInclude(l => l.Grades)
                        .Include(s => s.Reservations)
                        .AsSplitQuery()
                        .FirstOrDefaultAsync(s => s.ID == studentId);

        if (student == null)
        {
            return NotFound("StudentNotFound");
        }

        var posts = _context.Posts
                        .Include(p => p.Comments)
                        .Where(p => p.AuthorId == studentId);

        var events = _context.Events
                        .Include(e => e.Comments)
                        .Include(e => e.Reservations)
                        .Where(e => e.OrganiserId == studentId);

        var reservations = _context.Reservations
                        .Where(r => r.ReservedById == studentId);

        var comments = _context.Comments
                        .Where(c => c.AuthorId == studentId);

        var locations = _context.Locations
                        .Include(l => l.Grades)
                        .Include(l => l.Events!)
                        .ThenInclude(e => e.Comments)
                        .AsSplitQuery()
                        .Where(l => l.AuthorId == studentId);

        var grades = _context.Grades
                        .Where(g => g.GradedById == studentId);

        _context.Students.Remove(student);
        _context.Posts.RemoveRange(posts);
        _context.Events.RemoveRange(events);
        _context.Reservations.RemoveRange(reservations);
        _context.Comments.RemoveRange(comments);
        _context.Locations.RemoveRange(locations);
        _context.Grades.RemoveRange(grades);
        await _context.SaveChangesAsync();
        return Ok();
    }
}

