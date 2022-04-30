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


        //R E L A T I O N S
        public University? University { get; set; }

        public List<Student>? Members { get; set; }

        public List<Event>? Events { get; set; }
    }
}