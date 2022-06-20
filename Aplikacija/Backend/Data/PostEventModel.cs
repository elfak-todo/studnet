using Microsoft.AspNetCore.Mvc;

namespace Backend.Data
{
    public class PostEventModel
    {
        [FromForm(Name = "ev")]
        public string? ev { get; set; }

        [FromForm(Name = "image")]
        public IFormFile? image { get; set; }
    }
}