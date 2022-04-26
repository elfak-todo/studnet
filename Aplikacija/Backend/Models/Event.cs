using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{
    [Table("Event")]
    public class Event{
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(128)]
        public string? Title { get; set; }
        [MaxLength(2048)]
        public string? Description { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        //LOKACIJA FALI
        public string? ImageURL { get; set; }
        
        //Relations
        public List<Comment>? Comments { get; set; }


    }
}