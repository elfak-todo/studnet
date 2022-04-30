using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("Comment")]
    public class Comment
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(1024)]
        public string? Text { get; set; }

        public bool Verified { get; set; }

        public bool Pinned { get; set; }

        [NotMapped]
        public int LikeCount
        {
            get
            {
                if (LikedBy != null)
                {
                    return LikedBy.Count();
                }
                else
                    return 0;
            }
        }

        [Required]
        public DateTime PublicationTime { get; set; }


        //R E L A T I O N S
        [Required]
        public Student? Author { get; set; }

        public List<Student>? LikedBy { get; set; }

        public Post? CommentedPost { get; set; }

        public Event? CommentedEvent { get; set; }
    }
}