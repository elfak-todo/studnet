using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Post")]
    public class Post
    {
        #region Props

        [Key]
        public int ID { get; set; }

        public bool Verified { get; set; } = false;

        public bool Pinned { get; set; } = false;

        public bool Edited { get; set; } = false;

        public bool Anonymous { get; set; } = false;

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

        [NotMapped]
        public int CommentCount
        {
            get
            {
                if (Comments != null)
                {
                    return Comments.Count();
                }
                return 0;
            }
        }

        public DateTime PublicationTime { get; set; }

        [MaxLength(2048)]
        public string Text { get; set; } = String.Empty;

        #endregion Props

        #region Relations

        [JsonIgnore]
        public Student? Author { get; set; }

        [JsonIgnore]
        public List<Comment>? Comments { get; set; }

        [JsonIgnore]
        public List<Student>? LikedBy { get; set; }

        #endregion Relations
    }
}