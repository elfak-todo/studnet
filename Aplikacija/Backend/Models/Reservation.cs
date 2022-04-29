using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Reservation")]
    public class Reservation
    {
        [Key]
        public int ID { get; set; }
        
        [Required]
        public int NumberOfTickets { get; set; }

        [Required]
        public int RemainingTickets { get; set; }


        //R E L A T I O N S
        public Student? ReservedBy { get; set; }

        public Event? Event { get; set; }
    }
}