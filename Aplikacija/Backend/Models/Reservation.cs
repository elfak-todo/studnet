using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Reservation")]
    public class Reservation
    {
        #region Props

        [Key]
        public int ID { get; set; }

        public int NumberOfTickets { get; set; } = 1;

        #endregion Props

        #region Relations

        public Student? ReservedBy { get; set; }

        public Event? Event { get; set; }

        #endregion Relations
    }
}