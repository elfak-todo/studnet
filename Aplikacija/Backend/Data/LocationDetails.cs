using Backend.Models;

namespace Backend.Data
{
    public class LocationDetails
    {
        public string? address { get; set; }
        public string? description { get; set; }
        public string? name { get; set; }
        public string? webpage { get; set; } = String.Empty;
        public float latitude { get; set; }
        public float longitude { get; set; }
        public LocationType type { get; set; }
    }
}