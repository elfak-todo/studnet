using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Backend.Services;

namespace Backend.Models
{
    [Table("Student")]
    public class Student
    {
        #region Props

        [Key]
        public int ID { get; set; }

        [MaxLength(32)]
        public string Username { get; set; } = String.Empty;

        [JsonIgnore]
        [MinLength(6)]
        [MaxLength(256)]
        public string Password { get; set; } = "PasswordNotSet";

        [MaxLength(64)]
        [RegularExpression("^\\S+@\\S+\\.\\S+$")]
        public string Email { get; set; } = String.Empty;

        [MaxLength(128)]
        public string? ImagePath { get; set; }

        [MaxLength(32)]
        public string FirstName { get; set; } = String.Empty;

        [MaxLength(32)]
        public string LastName { get; set; } = String.Empty;

        [MaxLength(1)]
        public string Gender { get; set; } = String.Empty;

        public Role Role { get; set; } = Role.Student;

        public bool IsExchange { get; set; } = false;

        #endregion Props

        #region Relations

        [JsonIgnore]
        public University? University { get; set; }
        public int? UniversityId { get; set; }

        [JsonIgnore]
        public Parlament? Parlament { get; set; }
        public int? ParlamentId { get; set; }

        [JsonIgnore]
        public List<Post>? PublishedPosts { get; set; }

        [JsonIgnore]
        public List<Event>? PublishedEvents { get; set; }

        [JsonIgnore]
        public List<Comment>? PublishedComments { get; set; }

        [JsonIgnore]
        public List<Post>? LikedPosts { get; set; }

        [JsonIgnore]
        public List<Event>? LikedEvents { get; set; }

        [JsonIgnore]
        public List<Comment>? LikedComments { get; set; }

        [JsonIgnore]
        public List<Location>? LikedLocations { get; set; }

        [JsonIgnore]
        public List<Grade>? Grades { get; set; }
        [JsonIgnore]
        public List<Reservation>? Reservations { get; set; }

        [JsonIgnore]
        public List<Location>? Locations { get; set; }

        #endregion Relations
    }
}