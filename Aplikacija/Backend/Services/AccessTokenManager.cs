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

    public class AccessTokenManager
    {
        public static readonly string[] Roles = { "Student", "ParlamentMember", "AdminUni", "Admin" };

        private IConfiguration Config;

        public AccessTokenManager(IConfiguration config)
        {
            Config = config;
        }

        public string? GenerateAccessToken(Student student)
        {
            if (student == null || student.Username == null)
            {
                return null;
            }

            var claims = new List<Claim>();
            claims.Add(new Claim(JwtRegisteredClaimNames.Sub, Config["Jwt:Subject"]));
            claims.Add(new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()));
            claims.Add(new Claim("ID", student.ID.ToString()));
            claims.Add(new Claim("username", student.Username));
            claims.Add(new Claim("roleID", ((int)student.Role).ToString()));

            for (int i = 0; i <= (int)student.Role; i++)
            {
                claims.Add(new Claim("role", Roles[i]));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Config["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                Config["Jwt:Issuer"],
                Config["Jwt:Audience"],
                claims.ToArray(),
                expires: DateTime.UtcNow.AddMinutes(60),
                signingCredentials: signIn);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public UserDetails? GetUserDetails(ClaimsPrincipal user)
        {
            var details = new UserDetails();

            var id = user.Claims.FirstOrDefault(c => c.Type == "ID");
            var username = user.Claims.FirstOrDefault(c => c.Type == "username");
            var role = user.Claims.FirstOrDefault(c => c.Type == "roleID");

            if (id == null || username == null || role == null)
            {
                return null;
            }

            details.ID = int.Parse(id.Value);
            details.Username = username.Value;
            details.Role = (Role)(int.Parse(role.Value));

            return details;
        }
    }
}