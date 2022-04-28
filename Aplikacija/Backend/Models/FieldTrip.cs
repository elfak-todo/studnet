using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("FieldTrip")]
    class FieldTrip : Event
    {
        public int Length { get; set; }
    }
}