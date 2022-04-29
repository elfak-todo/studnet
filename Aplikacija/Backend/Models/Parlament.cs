using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Parlament")]
    public class Parlament
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(32)]
        public string? Name { get; set; }
        
        [Required]
        [MaxLength(256)]
        public string? FacultyName { get; set; }
        //Relations
        public List<User>? Members { get; set; }

        public University? University { get; set; }

    }
}