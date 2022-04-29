using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Post")]
    public class Post
    {
        [Key]
        public int ID { get; set; }

        public bool Verified {get; set;}

        public bool Pinned {get; set; }

        [Required]
        public DateTime DateTime { get; set; }

        [Required]
        [MaxLength(2048)]
        public string? Text { get; set; }


        //Relations
        [Required]
        public User? Author { get; set; }

        public List<Comment>? Comments { get; set; }

        public List<User>? LikedBy { get; set; }

    }
}