using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{
    [Table("Event")]
    public class Event{
        [Key]
        public int ID { get; set; }
        public bool Verified { get; set; }
        public bool Pinned {get; set; }
        
        [Required]
        [MaxLength(128)]
        public string? Title { get; set; }
        [MaxLength(2048)]
        public string? Description { get; set; }
        [Required]
        public DateTime DateTime { get; set; }
        [Required]
        public DateTime TimeOfEvent { get; set; }
        
        [Required]
        [MaxLength(128)]
        public string? Location { get; set; }
        [Required]
        public string? ImagePath { get; set; }
        [Required]
        public bool PaidEvent { get; set; }
        [Range(0, 5000)]
        public int NumberOfTickets { get; set; }
        [Range(0, 10000)]
        public float TicketPrice { get; set; }

        //Relations
        [Required]
        public User? Organiser { get; set; }
        public List<Comment>? Comments { get; set; }
        public List<User>? LikedBy { get; set; }
        public List<Reservation>? Reservations { get; set; }

    }
}