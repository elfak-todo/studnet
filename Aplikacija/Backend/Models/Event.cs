using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{
    [Table("Event")]
    public class Event{
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(128)]
        public bool Verified { get; set; }
        public bool Pinned {get; set; }

        public string? Title { get; set; }
        [MaxLength(2048)]
        public string? Description { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        [MaxLength(128)]
        public string? Location { get; set; }
        [Required]
        public string? ImagePath { get; set; }

        //Relations
        [Required]
        public User? Author { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<User>? LikedBy { get; set; }


    }
}