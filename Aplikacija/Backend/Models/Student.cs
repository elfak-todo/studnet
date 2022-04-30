using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum Role
    {
        Student = 0,
        ParlamentMember = 1,
        AdminUni = 2,
        Admin = 3
    }

    [Table("User")]
    public class Student
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(32)]
        public string? Username { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(256)]
        public string? Password { get; set; }

        [Required]
        [MaxLength(64)]
        [RegularExpression("^\\S+@\\S+\\.\\S+$")]
        public string? Email { get; set; }

        [Required]
        [MaxLength(128)]
        public string? ImagePath { get; set; }

        [Required]
        [MaxLength(32)]
        public string? FirstName { get; set; }

        [Required]
        [MaxLength(32)]
        public string? LastName { get; set; }

        [Required]
        [MaxLength(1)]
        public string? Gender { get; set; }

        [Required]
        public Role Role { get; set; }

        [Required]
        public bool IsExchange { get; set; }


        //R E L A T I O N S
        [Required]
        public University? University { get; set; }

        public Parlament? Parlament { get; set; }

        public List<Post>? PublishedPosts { get; set; }

        public List<Event>? PublishedEvents { get; set; }

        public List<Comment>? PublishedComments { get; set; }

        public List<Post>? LikedPosts { get; set; }

        public List<Event>? LikedEvents { get; set; }

        public List<Comment>? LikedComments { get; set; }

        public List<Location>? LikedLocations { get; set; }

        public List<Grade>? Grades { get; set; }

        public List<Reservation>? Reservations { get; set; }

        public List<Location>? Locations { get; set; }

    }
}