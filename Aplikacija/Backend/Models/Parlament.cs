using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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

        [MaxLength(256)]
        public string FacultyName { get; set; } = String.Empty;

        #endregion Props

        #region Relations
        public University? University { get; set; }

        public List<Student>? Members { get; set; }

        public List<Event>? Events { get; set; }

        #endregion Relations
    }
}