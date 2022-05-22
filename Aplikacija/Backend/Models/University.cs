using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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

        //Geografska širina
        public float Latitude { get; set; }

        //Geografska dužina
        public float Longitude { get; set; }


        #endregion Props

        #region Relations    

        public List<Student>? Users { get; set; }
        [JsonIgnore]
        public List<Parlament>? Parlaments { get; set; }

        public List<Location>? Locations { get; set; }

        public List<Post>? Posts { get; set; }

        public List<Event>? Events { get; set; }

        #endregion Relations
    }
}