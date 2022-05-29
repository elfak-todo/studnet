using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Grade")]
    public class Grade
    {
        #region Props

        [Key]
        public int ID { get; set; }

        [Required]
        [Range(1, 5)]
        public int Value { get; set; } = 0;

        [MaxLength(1024)]
        public string? CommentText { get; set; }

        public DateTime PublicationTime { get; set; }

        #endregion Props

        #region Relations

        public Student? GradedBy { get; set; }
        public int? GradedById { get; set; }

        [JsonIgnore]
        public Location? GradedLocation { get; set; }
        public int? GradedLocationId { get; set; }

        #endregion Relations
    }
}