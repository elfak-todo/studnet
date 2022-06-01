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
        var student = await _tokenManager.GetStudent(HttpContext.User);

        if (student == null)
        {
            return StatusCode(500, "StudentNotFound");
        }

        var comments = _context.Comments.Include(c => c.Author!)
                                .ThenInclude(a => a.Parlament)
                                .Include(c => c.LikedBy)
                                .Where(c => c.CommentedPostId == postId);

        if (comments == null)
        {
            return Ok(null);
        }

        return Ok(comments.OrderByDescending(p => p.Pinned)
                        .ThenByDescending(p => p.Verified)
                        .ThenBy(p => p.PublicationTime)
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
                                c.Author.Parlament!.FacultyName
                            }
                        }));
    }

    [Route("Post/{postId}")]
    [Authorize(Roles = "Student")]
    [HttpPost]
    public async Task<ActionResult> PostComment([FromBody] Comment comment, int postId)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return BadRequest("TokenNotValid");
        }

        var student = await _context.Students.Include(s => s.Parlament)
                                            .Where(s => s.ID == userDetails.ID)
                                            .FirstOrDefaultAsync();

        if (student == null)
        {
            return BadRequest("StudentNotFound");
        }

        var post = await _context.Posts.Include(p => p.Author!)
                                    .ThenInclude(a => a.Parlament)
                                    .Include(p => p.Comments!)
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
        return Ok(new
        {
            comment = comment,
            author = new
            {
                comment.Author!.ID,
                comment.Author.FirstName,
                comment.Author.LastName,
                comment.Author.Username,
                comment.Author.ImagePath,
                comment.Author.Parlament!.FacultyName
            }
        });
    }

    [Route("Delete/{commentId}")]
    [Authorize(Roles = "Student")]
    [HttpDelete]
    public async Task<ActionResult> DeleteCommment(int commentId)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var comment = await _context.Comments.Include(c => c.Author)
                                           .FirstOrDefaultAsync(c => c.ID == commentId);

        if (comment == null)
        {
            return BadRequest("CommentNotFound");
        }

        if (comment.Author == null || comment.Author.ID != user.ID)
        {
            return Forbid("NotAuthor");
        }

        _context.Comments.Remove(comment);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [Route("Edit")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> EditComment([FromBody] Comment comment)
    {
        var user = _tokenManager.GetUserDetails(HttpContext.User);

        if (user == null)
        {
            return BadRequest("BadToken");
        }

        var commentInDatabase = await _context.Comments
                            .Include(c => c.Author)
                            .Where(c => c.ID == comment.ID)
                            .FirstOrDefaultAsync();

        if (commentInDatabase == null)
        {
            return BadRequest("CommentNotFound");
        }

        if (commentInDatabase.Author == null || commentInDatabase.Author.ID != user.ID)
        {
            return Forbid("NotAuthor");
        }

        commentInDatabase.Text = commentInDatabase.Text;
        commentInDatabase.Edited = true;

        if ((int)user.Role >= (int)Role.ParlamentMember)
        {
            commentInDatabase.Verified = comment.Verified;
            commentInDatabase.Pinned = comment.Pinned;
        }

        await _context.SaveChangesAsync();

        return Ok(commentInDatabase);
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

    [Route("SetLiked/{commentId}/{liked}")]
    [Authorize(Roles = "Student")]
    [HttpPut]
    public async Task<ActionResult> SetLiked(int commentId, bool liked)
    {
        var userDetails = _tokenManager.GetUserDetails(HttpContext.User);

        if (userDetails == null)
        {
            return BadRequest("BadToken");
        }

        var comment = await _context.Comments.FindAsync(commentId);

        if (comment == null)
        {
            return BadRequest("CommentNotFound");
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
            student.LikedComments!.Add(comment);
        }
        else
        {
            student.LikedComments!.Remove(comment);
        }

        await _context.SaveChangesAsync();
        return Ok(liked);
    }
}