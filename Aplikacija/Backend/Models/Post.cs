using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Post")]
    public class Post
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public bool Verified { get; set; }

        [Required]
        public bool Pinned { get; set; }

        [Required]
        public bool Edited { get; set; }

        [NotMapped]
        public int LikeCount
        {
            get
            {
                if (LikedBy != null)
                {
                    return LikedBy.Count();
                }
                return 0;
            }
        }

        [Required]
        public DateTime PublicationTime { get; set; }

        [Required]
        [MaxLength(2048)]
        public string? Text { get; set; }


        //R E L A T I O N S
        public Student? Author { get; set; }

        public List<Comment>? Comments { get; set; }

        public List<Student>? LikedBy { get; set; }
    }
}