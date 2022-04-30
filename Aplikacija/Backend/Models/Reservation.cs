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


        //R E L A T I O N S
        [Required]
        public Student? ReservedBy { get; set; }

        [Required]
        public Event? Event { get; set; }
    }
}