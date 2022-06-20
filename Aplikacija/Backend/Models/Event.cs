using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models
{
    public enum EventType
    {
        Party = 0,
        Field_trip,
        Sporting_event,
        Festival,
        Job_fair,
        Theatre_play,
        Art_Display,
        New_Years
    }

    [Table("Event")]
    public class Event
    {
        #region Props

        [Key]
        public int ID { get; set; }

        public bool Verified { get; set; } = false;

        public bool Pinned { get; set; } = false;

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

        [MaxLength(128)]
        public string Title { get; set; } = String.Empty;

        [MaxLength(2048)]
        public string Description { get; set; } = String.Empty;

        public EventType Type { get; set; }

        public DateTime PublicationTime { get; set; }

        public DateTime TimeOfEvent { get; set; }

        public DateTime? EndTime { get; set; }

        // [MaxLength(128)]
        // public string? LocationName { get; set; }

        public string ImagePath { get; set; } = String.Empty;

        public bool PaidEvent { get; set; } = false;

        [Range(0, 5000)]
        public int NumberOfTickets { get; set; } = 0;

        public bool Canceled { get; set; } = false;

        [NotMapped]
        public int TicketsReserved
        {
            get
            {
                if (Reservations != null)
                {
                    return Reservations.Select(p => p.NumberOfTickets)
                            .Aggregate(0, (total, ticketNum) => total += ticketNum);
                }
                return 0;
            }
        }
        [NotMapped]
        public float SpaceTaken
        {
            get
            {
                if (Reservations != null && NumberOfTickets > 0)
                {
                    return (float)TicketsReserved / (float)NumberOfTickets;
                }
                return 0;
            }
        }
        [Range(0, 10000)]
        public float TicketPrice { get; set; } = 0;

        #endregion Props

        #region Relations

        [JsonIgnore]
        public Location? Location { get; set; }
        public int? LocationId { get; set; }

        [JsonIgnore]
        public Student? Organiser { get; set; }
        public int? OrganiserId { get; set; }

        [JsonIgnore]
        public Parlament? OrganisingParlament { get; set; }
        public int? OrganisingParlamentId { get; set; }

        [JsonIgnore]
        public University? University { get; set; }
        public int? UniversityId { get; set; }

        [JsonIgnore]
        public List<Comment>? Comments { get; set; }

        [JsonIgnore]
        public List<Student>? LikedBy { get; set; }

        [JsonIgnore]
        public List<Reservation>? Reservations { get; set; }

        #endregion Relations
    }
}