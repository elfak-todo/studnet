using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class GradeController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    public GradeController(Context context, IAccessTokenManager tokenManager)
    {
        _context = context;
        _tokenManager = tokenManager;
    }


    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> PostGrade([FromBody] Grade grade)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return BadRequest("StudentNotFound");
        }

        if (grade.Value == 0)
        {
            return BadRequest("FieldMissing");
        }

        grade.PublicationTime = DateTime.Now;
        grade.GradedBy = student;
        
        _context.Grades.Add(grade);
        await _context.SaveChangesAsync();

        return Ok(grade);
    }
    [Route ("LocationGrade/{locationId}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetGrade(int locationId)
    {
        var location = await _context.Locations.Include(l => l.Grades!)
                                            .ThenInclude(g => g.GradedBy)
                                            .FirstOrDefaultAsync(l => l.ID == locationId);
        
        if (location == null)
        {
            return BadRequest("LocationNotFound");
        }
        if (location.Grades == null)
        {
            return Ok(null);
        }

        return Ok(location.Grades.OrderByDescending(l => l.PublicationTime)
                                 .Select(g => new
                                 {
                                     grade=g,
                                     gradedby = new
                                     {
                                         g.GradedBy!.ID,
                                         g.GradedBy.FirstName,
                                         g.GradedBy.LastName,
                                         g.GradedBy.Username,
                                         g.GradedBy.ImagePath
                                     }
                                 }));
    }

    [Route("Delete/{gradeId}")]
    [Authorize(Roles = "Student")]
    [HttpDelete]
    public async Task<ActionResult> DeleteGrade(int gradeId)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var grade = await _context.Grades.Include(g => g.GradedBy)
                                         .FirstOrDefaultAsync(g => g.ID == gradeId);
        
        if (grade == null)
        {
            return BadRequest("GradeNotFound");
        }

        if (grade.GradedBy == null || grade.GradedBy.ID != user.ID)
        {
            return Forbid("NotAuthor");
        }

        _context.Grades.Remove(grade);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [Route("Edit")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> EditGrade([FromBody] Grade grade)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var gradeInDatabase = await _context.Grades.FindAsync(grade.ID);

        if (gradeInDatabase == null)
        {
            return BadRequest("GradeNotFound");
        }

        if (grade.GradedBy == null || grade.GradedBy.ID != user.ID)
        {
            return Forbid("NotAuthor");
        }

        gradeInDatabase.CommentText = grade.CommentText;
        gradeInDatabase.Value = grade.Value;
        await _context.SaveChangesAsync();
        
        return Ok(gradeInDatabase);
    }
}