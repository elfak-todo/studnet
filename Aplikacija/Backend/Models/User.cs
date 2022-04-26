using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum Roles{
        Student = 0,
        ParlamentMember = 1,
        AdminUni = 2,
        Admin = 3
    }
    [Table("User")]
    public class User
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(32)]
        public string? Username { get; set; }
        [Required]
        [MaxLength(256)]
        public string? Password { get; set; }
        [Required]
        [MaxLength(64)]
        [RegularExpression("^\\S+@\\S+\\.\\S+$")]
        public string? Email { get; set; }
        [Required]
        [MaxLength(32)]
        public string? FirstName { get; set; }
        [Required]
        [MaxLength(32)]
        public string? LastName { get; set; }
        [Required]
        public Roles Role { get; set; }
        //Relations
        public Parlament? Parlament { get; set; }
        [Required]
        public University? University { get; set; }
    }
}