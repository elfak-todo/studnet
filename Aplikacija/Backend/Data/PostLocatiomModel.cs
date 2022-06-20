using Microsoft.AspNetCore.Mvc;

namespace Backend.Data
{
    public class PostLocationModel
    {
        [FromForm(Name = "location")]
        public string? location { get; set; }

        [FromForm(Name = "image")]
        public IFormFile? image { get; set; }

        [FromForm(Name = "imageGallery")]
        public List<IFormFile>? imageGallery { get; set; }

    }
}