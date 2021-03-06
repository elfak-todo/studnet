using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public enum LocationType
    {
        //TODO Add location types
        Cafe = 0,
        Club,
        Brewery,
        Bar,
        Restoraunt,
        Tavern,
        Gym,
        Library,
        Faculty,
        BasketballCourt,
        FootballField,
        BowlingAlley,
        Doctor,
        Confectionery,
        Shop,
        SkatePark,
        University,
        Field
    }

    [Table("Location")]
    public class Location
    {
        #region Props

        [Key]
        public int ID { get; set; }

        [MaxLength(128)]
        public string Name { get; set; } = String.Empty;

        [MaxLength(2048)]
        public string Description { get; set; } = String.Empty;

        [MaxLength(256)]
        public string Address { get; set; } = String.Empty;

        public LocationType Type { get; set; }

        //Geografska širina
        public float Latitude { get; set; }

        //Geografska dužina
        public float Longitude { get; set; }

        public DateTime PublicationTime { get; set; }

        [NotMapped]
        public double AverageGrade
        {
            get
            {
                if (Grades != null && Grades.Count > 0)
                {
                    return Grades.Average(p => p.Value);
                }
                return -1;
            }
        }

        public string? ImagePath { get; set; }

        [JsonIgnore]
        public string GalleryString { get; set; } = String.Empty;

        [NotMapped]
        public List<string> ImageGallery
        {
            get
            {
                return GalleryString.Split(';').ToList();
            }
            set
            {
                GalleryString = string.Join(';', value);
            }
        }

        [MaxLength(256)]
        public string Webpage { get; set; } = String.Empty;

        public bool Verified { get; set; } = false;

        [NotMapped]
        public int GradeCount { get; set; }

        #endregion Props

        #region Relations

        [JsonIgnore]
        public Student? Author { get; set; }
        public int? AuthorId { get; set; }

        [JsonIgnore]
        public University? University { get; set; }
        public int? UniversityId { get; set; }

        [JsonIgnore]
        public List<Event>? Events { get; set; }

        public List<Grade>? Grades { get; set; } = new List<Grade>();

        [JsonIgnore]
        public Parlament? Parlament { get; set; }

        #endregion Relations
    }
}