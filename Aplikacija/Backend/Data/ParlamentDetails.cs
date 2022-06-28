using Backend.Models;

namespace Backend.Data
{
    public class ParlamentDetails
    {
        public string? name { get; set; }

        public int? uniId { get; set; }
        public LocationDetails? location { get; set; }
    }
}