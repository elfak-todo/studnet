import EventForm from "../components/eventPost/eventForm/EventForm.js";
import EventPost from "../components/eventPost/EventPost.js";
import Feed from "../components/feed/Feed.js";

function EventsPage() {
  return (
    <div>
      <Feed url="Event/Feed" FeedCard={EventPost} AddElementForm={EventForm} />
    </div>
  );
}

export default EventsPage;
