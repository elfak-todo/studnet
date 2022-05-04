using Backend.Services;

namespace Backend.Data
{
    public class UserDetails
    {
        public int ID { get; set; }

        public string? Username { get; set; }

        public Role Role { get; set; }
    }
}