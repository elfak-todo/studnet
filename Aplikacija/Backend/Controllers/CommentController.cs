using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

using Backend.Models;
using Backend.Services;

namespace Backend.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class CommentController : ControllerBase
{
    private Context _context;
    private IAccessTokenManager _tokenManager;

    public CommentController(Context context, IAccessTokenManager tokenManager)
    {
        _context = context;
        _tokenManager = tokenManager;
    }

    [Route("GetPostComments/{postId}")]
    [Authorize(Roles = "Student")]
    [HttpGet]
    public async Task<ActionResult> GetPostComments(int postId)
    {
        var post = await _context.Posts.Include(p => p.Comments!)
                                .ThenInclude(c => c.Author)
                                .FirstOrDefaultAsync(p => p.ID == postId);

        if (post == null)
        {
            return BadRequest("PostNotFound");
        }

        if (post.Comments == null)
        {
            return Ok(null);
        }

        return Ok(post.Comments.OrderByDescending(p => p.Pinned)
                                .ThenByDescending(p => p.Verified)
                                .ThenByDescending(p => p.PublicationTime)
                                .Select(c => new
                                {
                                    comment = c,
                                    author = c.Anonymous ? null : new
                                    {
                                        c.Author!.ID,
                                        c.Author.FirstName,
                                        c.Author.LastName,
                                        c.Author.Username,
                                        c.Author.ImagePath
                                    }
                                }));
    }

    [Route("Post/{postId}")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> PostComment([FromBody] Comment comment, int postId)
    {
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return BadRequest("StudentNotFound");
        }

        var post = await _context.Posts.Include(p => p.Author)
                                    .Include(p => p.Comments)
                                    .FirstOrDefaultAsync(p => p.ID == postId);

        if (post == null)
        {
            return BadRequest("PostNotFound");
        }

        comment.PublicationTime = DateTime.Now;
        comment.Author = student;
        comment.CommentedPost = post;
        comment.Edited = false;
        comment.LikedBy = new List<Student>();

        if ((int)student.Role < (int)Role.ParlamentMember)
        {
            comment.Verified = false;
            comment.Pinned = false;
        }

        if (student != post.Author || !post.Anonymous)
        {
            comment.Anonymous = false;
        }

        if (post.Comments == null)
        {
            post.Comments = new List<Comment>();
        }

        post.Comments.Add(comment);
        await _context.SaveChangesAsync();
        return Ok(comment);
    }

    [Route("SetVerified/{commentId}/{verified}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPut]
    public async Task<ActionResult> SetVerified(int commentId, bool verified)
    {
        var comment = await _context.Comments.FindAsync(commentId);

        if (comment == null)
        {
            return BadRequest("CommentNotFound");
        }

        comment.Verified = verified;

        await _context.SaveChangesAsync();
        return Ok(comment);
    }

    [Route("SetPinned/{commentId}/{pinned}")]
    [Authorize(Roles = "ParlamentMember")]
    [HttpPut]
    public async Task<ActionResult> SetPinned(int commentId, bool pinned)
    {
        var comment = await _context.Comments.FindAsync(commentId);

        if (comment == null)
        {
            return BadRequest("CommentNotFound");
        }

        comment.Pinned = pinned;

        await _context.SaveChangesAsync();
        return Ok(comment);
    }
}
