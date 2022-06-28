using Microsoft.AspNetCore.Mvc;

namespace Backend.Data
{
    public class PostParlamentModel
    {
        [FromForm(Name = "parlament")]
        public string? parlament { get; set; }

        [FromForm(Name = "image")]
        public IFormFile? image { get; set; }

        [FromForm(Name = "imageGallery")]
        public List<IFormFile>? imageGallery { get; set; }
    }
}