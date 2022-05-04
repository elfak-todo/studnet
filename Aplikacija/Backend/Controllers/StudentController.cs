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
    public Context Context { get; set; }
    private AccessTokenManager TokenManager;
    private PasswordManager PasswordManager;

    public StudentController(Context context, IConfiguration config)
    {
        Context = context;
        TokenManager = new AccessTokenManager(config);
        PasswordManager = new PasswordManager(config);
    }

    [Route("Login")]
    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult> Login([FromBody] LoginCredentials creds)
    {
        if (Context.Students == null)
        {
            return StatusCode(500);
        }

        if (creds.Username == null || creds.Password == null)
        {
            return BadRequest("FieldMissing");
        }

        var student = await Context.Students.Where(s => s.Username == creds.Username || s.Email == creds.Username).FirstOrDefaultAsync();

        if (student == null || !PasswordManager.verifyPassword(creds.Password, student.Password))
        {
            return Unauthorized("BadCredentials");
        }

        string? token = TokenManager.GenerateAccessToken(student);

        return Ok(
            new
            {
                username = student.Username,
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
        //TODO data validation
        if (student.Password == null)
        {
            return BadRequest("FieldMissing");
        }

        student.Password = PasswordManager.hashPassword(student.Password);

        await this.Context.AddAsync(student);
        await Context.SaveChangesAsync();

        return Ok("RegistrationSuccessful");
    }

    [Route("Delete")]
    [Authorize]
    [HttpDelete]
    public async Task<ActionResult> Delete()
    {
        var userDetails = TokenManager.GetUserDetails(HttpContext.User);
        if (userDetails == null || Context.Students == null)
        {
            return StatusCode(500);
        }

        var user = await Context.Students.FindAsync(userDetails.ID);
        if (user == null)
        {
            return BadRequest("StudentNotFound");
        }

        Context.Students.Remove(user);
        await Context.SaveChangesAsync();

        return Ok("DeletionSuccessful");
    }
}

