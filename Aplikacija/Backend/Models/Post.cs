using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{
    [Table("Post")]
    public class Post{
        [Key]
        public int ID { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public User? Author { get; set; }
        
    }
}