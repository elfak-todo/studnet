using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
        Liberary
    }

    [Table("Location")]
    public class Location
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public LocationType Type { get; set; }

        //Geografska širina
        [Required]
        public float Latitude { get; set; }

        //Geografska dužina
        [Required]
        public float Longitude { get; set; }
        
        [Required]
        public DateTime PublicationTime { get; set; }

        public List<Grade>? Grades { get; set; }

        [NotMapped]
        public double AverageGrade
        {
            get
            {
                if (Grades != null)
                {
                    return Grades.Average(p => p.Value);
                }
                return -1;
            }
        }

        public string? ImagePath { get; set; }

        //Relations
        public User? Author { get; set; }
    }
}