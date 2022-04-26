using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{
    [Table("Comment")]
    public class Comment{
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(1024)]
        public string? Text { get; set; }

        //Relations
        [Required]
        public User? Author { get; set; }
        public Post? CommentedPost { get; set; }
        public Event? CommentedEvent { get; set; }
    }
}