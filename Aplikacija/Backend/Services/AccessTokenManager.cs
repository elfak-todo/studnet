using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;

using Backend.Models;
using Backend.Data;

namespace Backend.Services
{
    public enum Role
    {
        Student = 0,
        ParlamentMember = 1,
        AdminUni = 2,
        Admin = 3
    }

    public interface IAccessTokenManager
    {
        public string? GenerateAccessToken(Student student);
        public Task<Student?> GetStudent(ClaimsPrincipal user);
        public UserDetails? GetUserDetails(ClaimsPrincipal user);
    }

    public class AccessTokenManager : IAccessTokenManager
    {
        public static readonly string[] Roles = { "Student", "ParlamentMember", "AdminUni", "Admin" };

        private IConfiguration _config;
        private Context _context;

        public AccessTokenManager(IConfiguration config, Context context)
        {
            _config = config;
            _context = context;
        }

        public string? GenerateAccessToken(Student student)
        {
            if (student == null || student.Username == null)
            {
                return null;
            }

            var claims = new List<Claim>();
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, _config["Jwt:Subject"]));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()));
            claims.Add(new Claim("ID", student.ID.ToString()));
            claims.Add(new Claim("username", student.Username));
            claims.Add(new Claim("roleID", ((int)student.Role).ToString()));
            claims.Add(new Claim("uniID", student.UniversityId.ToString()!));

            for (int i = 0; i <= (int)student.Role; i++)
            {
                claims.Add(new Claim("role", Roles[i]));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims.ToArray(),
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<Student?> GetStudent(ClaimsPrincipal user)
        {
            UserDetails? userDetails = GetUserDetails(user);
            if (userDetails == null)
            {
                return null;
            }
            return await _context.Students.FindAsync(userDetails.ID);
        }

        public UserDetails? GetUserDetails(ClaimsPrincipal user)
        {
            var details = new UserDetails();

            var id = user.Claims.FirstOrDefault(c => c.Type == "ID");
            var username = user.Claims.FirstOrDefault(c => c.Type == "username");
            var role = user.Claims.FirstOrDefault(c => c.Type == "roleID");
            var university = user.Claims.FirstOrDefault(c => c.Type == "uniID");

            if (id == null || username == null || role == null || university == null)
            {
                return null;
            }

            details.ID = int.Parse(id.Value);
            details.Username = username.Value;
            details.Role = (Role)(int.Parse(role.Value));
            details.UniversityId = int.Parse(university.Value);

            return details;
        }
    }
}