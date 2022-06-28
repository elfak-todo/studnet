using Backend.Models;

namespace Backend.Data
{
    public class UniversityDetails
    {
        public string? name { get; set; } = String.Empty;
        public string? city { get; set; } = String.Empty;
        public float latitude { get; set; }
        public float longitude { get; set; }
    }
}