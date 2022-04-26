using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum Roles
    {
        Student = 0,
        ParlamentMember = 1,
        AdminUni = 2,
        Admin = 3
    }
    [Table("User")]
    public class User
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(32)]
        public string? Username { get; set; }
        [Required]
        [MaxLength(256)]
        public string? Password { get; set; }
        [Required]
        [MaxLength(64)]
        [RegularExpression("^\\S+@\\S+\\.\\S+$")]
        public string? Email { get; set; }
        [Required]
        [MaxLength(32)]
        public string? FirstName { get; set; }
        [Required]
        [MaxLength(32)]
        public string? LastName { get; set; }
        [Required]
        public Roles Role { get; set; }

        //Relations
        [Required]
        public University? University { get; set; }
        public Parlament? Parlament { get; set; }
        public List<Post>? PublishedPosts { get; set; }
        public List<Event>? PublishedEvents { get; set; }
        public List<Comment>? PublishedComments { get; set; }
        public List<Post>? LikedPosts { get; set; }
        public List<Event>? LikedEvents { get; set; }
        public List<Comment>? LikedComments { get; set; }
        public List<Grade>? Grade { get; set; }

    }
}