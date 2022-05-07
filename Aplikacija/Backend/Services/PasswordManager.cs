using System.Text;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace Backend.Services
{
    public interface IPasswordManager
    {
        public string hashPassword(string password);
        public bool verifyPassword(string? password, string? hashedPassword);
    }

    public class PasswordManager : IPasswordManager
    {
        private IConfiguration Config;

        public PasswordManager(IConfiguration config)
        {
            Config = config;
        }

        public string hashPassword(string password)
        {
            byte[] salt = Encoding.ASCII.GetBytes(Config["Passwords:Salt"]);

            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 128));

            return hashed;
        }

        public bool verifyPassword(string? password, string? hashedPassword)
        {
            if (password == null || hashedPassword == null)
                return false;

            return hashedPassword == hashPassword(password);
        }
    }
}