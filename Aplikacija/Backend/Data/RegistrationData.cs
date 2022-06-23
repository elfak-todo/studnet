using System.ComponentModel.DataAnnotations;

namespace Backend.Data
{
    public class RegistrationData
    {
        [MaxLength(32)]
        public string Username { get; set; } = String.Empty;

        [MinLength(6)]
        [MaxLength(256)]
        public string Password { get; set; } = String.Empty;

        [MaxLength(64)]
        [RegularExpression("^\\S+@\\S+\\.\\S+$")]
        public string Email { get; set; } = String.Empty;

        [MaxLength(32)]
        public string FirstName { get; set; } = String.Empty;

        [MaxLength(32)]
        public string LastName { get; set; } = String.Empty;

        [MaxLength(1)]
        public string Gender { get; set; } = String.Empty;

        public bool IsExchange { get; set; } = false;

        public int UniversityId { get; set; } = -1;

        public int ParlamentId { get; set; } = -1;

    }
}