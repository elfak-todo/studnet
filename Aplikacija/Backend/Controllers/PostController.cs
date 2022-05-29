using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class PostController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    public PostController(Context context, IAccessTokenManager tokenManager)
    {
        _context = context;
        _tokenManager = tokenManager;
    }

    [Route("")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> Post([FromBody] Post post)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return BadRequest("StudentNotFound");
        }

        post.PublicationTime = DateTime.Now;
        post.Author = student;
        post.Edited = false;
        post.Comments = new List<Comment>();
        post.LikedBy = new List<Student>();
        post.UniversityId = student.UniversityId;

        if ((int)student.Role < (int)Role.ParlamentMember)
        {
            post.Verified = false;
            post.Pinned = false;
        }

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return Ok(post);
    }

    [Route("Feed/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetFeed(int page)
    {
        const int pageSize = 10;

        var user = _tokenManager.GetUserDetails(HttpContext.User);
        if (user == null)
        {
            return StatusCode(500);
        }

        IQueryable<Post> posts;

        if (page == 0)
        {
            posts = _context.Posts.Include(p => p.Author)
                                .ThenInclude(a => a!.Parlament)
                                .Include(p => p.Comments)
                                .Where(p => p.UniversityId == user.UniversityId)
                                .OrderByDescending(p => p.PublicationTime)
                                .Take(pageSize)
                                .OrderByDescending(p => p.Pinned)
                                .ThenByDescending(p => p.Verified)
                                .ThenByDescending(p => p.PublicationTime);
        }
        else
        {
            posts = _context.Posts.Include(p => p.Author)
                                .ThenInclude(a => a!.Parlament)
                                .Include(p => p.Comments)
                                .Where(p => p.UniversityId == user.UniversityId)
                                .OrderByDescending(p => p.PublicationTime)
                                .Skip(page * pageSize)
                                .Take(pageSize);
        }

        var postsSelected = posts.Select(p => new
        {
            post = p,
            author = p.Anonymous ? null : new
            {
                p.Author!.ID,
                p.Author.FirstName,
                p.Author.LastName,
                p.Author.Username,
                p.Author.ImagePath,
                p.Author.Parlament!.FacultyName
            },
            comments = p.Comments!.OrderByDescending(p => p.Pinned)
                                .ThenByDescending(p => p.Verified)
                                .ThenByDescending(p => p.PublicationTime)
                                .Take(3)
                                .Select(c => new
                                {
                                    comment = c,
                                    author = c.Anonymous ? null : new
                                    {
                                        c.Author!.ID,
                                        c.Author.FirstName,
                                        c.Author.LastName,
                                        c.Author.Username,
                                        c.Author.ImagePath,
                                        c.Author.Parlament!.FacultyName
                                    }
                                }),
        });

        return Ok(await postsSelected.ToListAsync());
    }

    [Route("Edit")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> EditPost([FromBody] Post post)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var postInDatabase = await _context.Posts.FindAsync(post.ID);

        if (postInDatabase == null)
        {
            return BadRequest("PostNotFound");
        }

        if (post.Author == null || post.Author.ID != user.ID)
        {
            return Forbid("NotAuthor");
        }

        postInDatabase.Text = post.Text;
        postInDatabase.Edited = true;

        if ((int)user.Role >= (int)Role.ParlamentMember)
        {
            postInDatabase.Verified = post.Verified;
            postInDatabase.Pinned = post.Pinned;
        }

        await _context.SaveChangesAsync();

        return Ok(postInDatabase);
    }

    [Route("Delete/{postId}")]
    [Authorize(Roles = "Student")]
    [HttpDelete]
    public async Task<ActionResult> DeletePost(int postId)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var post = await _context.Posts.Include(p => p.Author)
                            .FirstOrDefaultAsync(p => p.ID == postId);

        if (post == null)
        {
            return BadRequest("PostNotFound");
        }

        if (post.Author == null || post.Author.ID != user.ID)
        {
            return Forbid("NotAuthor");
        }

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [Route("SetVerified/{postId}/{verified}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPut]
    public async Task<ActionResult> SetVerified(int postId, bool verified)
    {
        var post = await _context.Posts.FindAsync(postId);

        if (post == null)
        {
            return BadRequest("PostNotFound");
        }

        post.Verified = verified;

        await _context.SaveChangesAsync();
        return Ok(post);
    }

    [Route("SetPinned/{postId}/{pinned}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPut]
    public async Task<ActionResult> SetPinned(int postId, bool pinned)
    {
        var post = await _context.Posts.FindAsync(postId);

        if (post == null)
        {
            return BadRequest("PostNotFound");
        }

        post.Pinned = pinned;

        await _context.SaveChangesAsync();
        return Ok(post);
    }
}
