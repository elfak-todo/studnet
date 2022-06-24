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
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return BadRequest("BadToken");
        }

        var student = await _context.Students.Include(s => s.Parlament!)
                                .ThenInclude(p => p.Faculty)
                                .Where(s => s.ID == userDetails.ID)
                                .FirstOrDefaultAsync();

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

        if (student.Role < Role.ParlamentMember)
        {
            post.Verified = false;
            post.Pinned = false;
        }
        else
        {
            
        }

        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            id = post.ID,
            post,
            verified = post.Verified,
            pinned=post.Pinned,
            author = new
            {
                post.Author.ID,
                post.Author.FirstName,
                post.Author.LastName,
                post.Author.Username,
                post.Author.ImagePath,
                facultyName = post.Author.Parlament!.Faculty!.Name
            },
            comments = new List<Comment>(),
        });
    }

    [Route("Feed/{page}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetFeed(int page)
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
                            .Where(p => p.UniversityId == student.UniversityId)
                            .OrderByDescending(p => p.Pinned)
                            .ThenByDescending(p => p.PublicationTime)
                            .Skip(page * pageSize)
                            .Take(pageSize);

        var postsSelected = posts.Select(p => new
        {
            id = p.ID,
            post = p,
            liked = p.LikedBy!.Contains(student),
            verified = p.Verified,
            pinned = p.Pinned,
            author = p.Anonymous && p.AuthorId != student.ID ? null : new
            {
                p.Author!.ID,
                p.Author.FirstName,
                p.Author.LastName,
                p.Author.Username,
                p.Author.ImagePath,
                p.Author.IsExchange,
                facultyName = p.Author.Parlament!.Faculty!.Name,
                facultyImagePath = p.Author.Parlament!.Faculty!.ImagePath
            },
            comments = p.Comments!
                    .Where(p => p.Pinned)
                    .OrderByDescending(p => p.PublicationTime)
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

        var postInDatabase = await _context.Posts
                            .Include(p => p.Author)
                            .Where(p => p.ID == post.ID)
                            .FirstOrDefaultAsync();

        if (postInDatabase == null)
        {
            return BadRequest("PostNotFound");
        }

        if (postInDatabase.Author == null || postInDatabase.Author.ID != user.ID)
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
                            .Include(p => p.Comments)
                            .FirstOrDefaultAsync(p => p.ID == postId);

        if (post == null)
        {
            return BadRequest("PostNotFound");
        }

        if (user.Role < Role.AdminUni && (post.Author == null || post.Author.ID != user.ID))
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

    [Route("SetLiked/{postId}/{liked}")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> SetLiked(int postId, bool liked)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return BadRequest("BadToken");
        }

        var post = await _context.Posts.FindAsync(postId);

        if (post == null)
        {
            return BadRequest("PostNotFound");
        }

        var student = await _context.Students.Include(s => s.LikedPosts)
                                        .Where(s => s.ID == userDetails.ID)
                                        .FirstOrDefaultAsync();

        if (student == null)
        {
            return BadRequest("UserNotFound");
        }

        if (liked)
        {
            student.LikedPosts!.Add(post);
        }
        else
        {
            student.LikedPosts!.Remove(post);
        }

        await _context.SaveChangesAsync();
        return Ok(liked);
    }
}
