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

        public int NumberOfTickets { get; set; } = 1;

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