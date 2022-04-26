using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models{
    [Table("University")]
    public class University{

        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(32)]
        public string? Name { get; set; }
        [Required]
        [MaxLength(32)]
        public string? City { get; set; }
        //Relations        public List<User>? Users { get; set; }
    }
}