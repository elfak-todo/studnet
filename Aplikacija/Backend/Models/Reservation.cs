using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Reservation")]
    public class Reservation
    {
        #region Props

        [Key]
        public int ID { get; set; }

        [Range(1, 10)]
        public int NumberOfTickets { get; set; } = 1;

        public DateTime ReservationTime { get; set; }

        public bool Canceled { get; set; } = false;

        #endregion Props

        #region Relations

        [JsonIgnore]
        public Student? ReservedBy { get; set; }
        public int? ReservedById { get; set; }

        [JsonIgnore]
        public Event? Event { get; set; }
        public int? EventId { get; set; }

        #endregion Relations
    }
}