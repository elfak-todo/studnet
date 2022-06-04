import EventPost from "../components/eventPost/EventPost.js";
import Feed from "../components/feed/Feed.js";

function EventsPage() {
  return (
    <div>
      <Feed url="Event/Feed" FeedCard={EventPost} />
    </div>
  );
}

export default EventsPage;
