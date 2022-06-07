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

    [Route("{locationId}/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetLocatinGrades(int locationId, int page)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return StatusCode(500);
        }

        const int pageSize = 10;

        var grades = _context.Grades
                            .OrderByDescending(g => g.PublicationTime)
                            .Include(g => g.GradedBy)
                            .ThenInclude(s => s!.Parlament)
                            .ThenInclude(p => p!.Faculty)
                            .AsSplitQuery()
                            .Where(g => g.GradedLocationId == locationId
                                    && g.GradedById != userDetails.ID)
                            .Skip(page * pageSize)
                            .Take(pageSize);

        var gradesSelected = grades.Select(g => new
        {
            id = g.ID,
            commentText = g.CommentText,
            value = g.Value,
            publicationTime = g.PublicationTime,
            gradedBy = new
            {
                id = g.GradedBy!.ID,
                firstName = g.GradedBy.FirstName,
                lastName = g.GradedBy.LastName,
                imagePath = g.GradedBy.ImagePath,
                facultyName = g.GradedBy.Parlament!.Faculty!.Name,
                facultyImagePath = g.GradedBy.Parlament!.Faculty!.ImagePath
            }
        });


        return Ok(await gradesSelected.ToListAsync());
    }

    [Route("MyGrade/{locationId}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetMyLocatinGrade(int locationId)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return StatusCode(500);
        }

        var grade = await _context.Grades
                            .OrderByDescending(g => g.PublicationTime)
                            .Include(g => g.GradedBy)
                            .FirstOrDefaultAsync(g => g.GradedLocationId == locationId && g.GradedById == userDetails.ID);
        return Ok(grade);
    }

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> CreateOrEditGrade([FromBody] Grade grade)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var gradeInDatabase = await _context.Grades
                    .FirstOrDefaultAsync(g => g.GradedLocationId == grade.GradedLocationId
                                 && g.GradedById == user.ID);

        if (gradeInDatabase == null)
        {
            gradeInDatabase = new Grade();
            gradeInDatabase.GradedById = user.ID;
            gradeInDatabase.GradedLocationId = grade.GradedLocationId;
            await _context.Grades.AddAsync(gradeInDatabase);
        }

        gradeInDatabase.CommentText = grade.CommentText;
        gradeInDatabase.Value = grade.Value;
        gradeInDatabase.PublicationTime = DateTime.Now;

        await _context.SaveChangesAsync();

        var location = await _context.Locations
                                .Include(l => l.Grades)
                                .AsSplitQuery()
                                .FirstAsync(l => l.ID == gradeInDatabase.GradedLocationId);

        return Ok(new
        {
            myGrade = gradeInDatabase,
            gradeCount = location.Grades!.Count,
            averageGrade = location.AverageGrade
        });
    }

    [Route("{gradeId}")]
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

        var location = await _context.Locations
                                            .Include(l => l.Grades)
                                            .AsSplitQuery()
                                            .FirstAsync(l => l.ID == grade.GradedLocationId);

        _context.Grades.Remove(grade);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            gradeCount = location.Grades!.Count,
            averageGrade = location.AverageGrade
        });
    }
}