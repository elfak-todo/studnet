using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("University")]
    public class University
    {
        #region Props

        [Key]
        public int ID { get; set; }

        [MaxLength(32)]
        public string Name { get; set; } = String.Empty;

        [MaxLength(32)]
        public string City { get; set; } = String.Empty;

        #endregion Props

        #region Relations    

        public List<Student>? Users { get; set; }

        public List<Parlament>? Parlaments { get; set; }

        public List<Location>? Locations { get; set; }

        #endregion Relations
    }
}