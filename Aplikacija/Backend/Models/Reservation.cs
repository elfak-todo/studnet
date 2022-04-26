using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{
    [Table("Reservation")]
    public class Reservation{
        [Key]
        public int ID { get; set; }
        public int NumberOfTickets { get; set; }

        //Relations
        public User? ReservedBy { get; set; }
        public Event? Event { get; set; }
    }
}