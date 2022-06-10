namespace Backend.Services
{
    public interface IImageManager
    {
        public Task<string?> SaveImage(IFormFile image, string path);

        public void DeleteImage(string path);
    }

    public class ImageManager : IImageManager
    {
        private string[] allowedExtensions = new string[] { ".png", ".jpg", ".jpeg" };

        private IConfiguration _config;

        public ImageManager(IConfiguration config)
        {
            _config = config;
        }

        public async Task<string?> SaveImage(IFormFile image, string path)
        {
            string extension = Path.GetExtension(image.FileName);

            if (!allowedExtensions.Contains(extension))
            {
                return "UnsupportedFileType";
            }

            var fileName = Path.GetRandomFileName();
            var imagePath = path + fileName + extension;

            using (var stream = File.Create(_config["Files:StaticPath"] + imagePath))
            {
                await image.CopyToAsync(stream);
                return imagePath;
            }
        }

        public void DeleteImage(string path)
        {
            try
            {
                File.Delete(_config["Files:StaticPath"] + path);
            }
            catch (Exception) { }
        }
    }

}