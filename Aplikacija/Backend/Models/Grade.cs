using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Grade")]
    public class Grade
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Range(1, 5)]
        public int Value { get; set; }

        [MaxLength(1024)]
        public string? CommentText { get; set; }


        //Relations
        [Required]
        public User? GradedBy { get; set; }

    }
}