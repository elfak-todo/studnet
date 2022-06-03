using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public enum EventTypes
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

        [MaxLength(128)]
        public string Title { get; set; } = String.Empty;

        [MaxLength(2048)]
        public string Description { get; set; } = String.Empty;

        public EventTypes Type { get; set; }

        public DateTime PublicationTime { get; set; }

        public DateTime TimeOfEvent { get; set; }

        public DateTime? EndTime { get; set; }

        [MaxLength(128)]
        public string? LocationName { get; set; }

        public string ImagePath { get; set; } = String.Empty;

        public bool PaidEvent { get; set; } = false;

        [Range(0, 5000)]
        public int NumberOfTickets { get; set; } = 0;

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
                if (Reservations !=null)
                {
                    return (float)TicketsReserved/(float)NumberOfTickets;
                }
                return 0;
            }
        }
        [Range(0, 10000)]
        public float TicketPrice { get; set; } = 0;

        #endregion Props

        #region Relations

        public Location? Location { get; set; }
        public int? LocationId { get; set; }

        public Student? Organiser { get; set; }
        public int? OrganiserId { get; set; }

        public Parlament? OrganisingParlament { get; set; }
        public int? OrganisingParlamentId { get; set; }

        public University? University { get; set; }
        public int? UniversityId { get; set; }

        public List<Comment>? Comments { get; set; }

        public List<Student>? LikedBy { get; set; }

        public List<Reservation>? Reservations { get; set; }

        #endregion Relations
    }
}