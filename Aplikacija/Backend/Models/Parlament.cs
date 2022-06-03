using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Parlament")]
    public class Parlament
    {
        #region Props

        [Key]
        public int ID { get; set; }

        [MaxLength(32)]
        public string Name { get; set; } = String.Empty;

        #endregion Props

        #region Relations

        [JsonIgnore]
        public University? University { get; set; }
        public int? UniversityId { get; set; }

        [JsonIgnore]
        public List<Student>? Members { get; set; }

        [JsonIgnore]
        public List<Event>? Events { get; set; }

        [JsonIgnore]
        public Location? Faculty { get; set; }
        public int? FacultyId { get; set; }

        #endregion Relations
    }
}