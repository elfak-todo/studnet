using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    [Table("Comment")]
    public class Comment
    {
        #region Props

        [Key]
        public int ID { get; set; }

        [MaxLength(1024)]
        public string Text { get; set; } = String.Empty;

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
                else
                    return 0;
            }
        }
        public DateTime PublicationTime { get; set; }

        #endregion Props

        #region Relations

        [JsonIgnore]
        public Student? Author { get; set; }
        public int? AuthorId { get; set; }

        [JsonIgnore]
        public List<Student>? LikedBy { get; set; }

        [JsonIgnore]
        public Post? CommentedPost { get; set; }
        public int? CommentedPostId { get; set; }

        [JsonIgnore]
        public Event? CommentedEvent { get; set; }
        public int? CommentedEventId { get; set; }

        #endregion Relations
    }
}