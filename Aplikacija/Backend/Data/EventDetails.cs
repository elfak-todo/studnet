using Backend.Models;

namespace Backend.Data
{
    public class EventDetails
    {
        public bool pinned { get; set; }
        public bool verified { get; set; }
        public string title { get; set; } = String.Empty;
        public string description { get; set; } = String.Empty;
        public EventType type { get; set; }
        public DateTime timeOfEvent { get; set; }
        public DateTime endTime { get; set; }
        public int locationId { get; set; }
        public bool paidEvent { get; set; }
        public int numberOfTickets { get; set; }
        public float ticketPrice { get; set; }
    }
}