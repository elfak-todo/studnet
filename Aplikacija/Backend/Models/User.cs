using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class User
    {
        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string Username { get; set; }
        public string Password { get; set; }

    }
}