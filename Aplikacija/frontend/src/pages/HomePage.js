import EventSlider from "../components/eventSlider/EventSlider";
import Feed from "../components/feed/Feed";

import Post from "../components/post/Post";
import PostForm from "../components/post/postForm/PostForm";

function HomePage() {
  return (
    <div>
      <EventSlider />
      <Feed url="Post/Feed" FeedCard={Post} AddElementForm={PostForm} />
    </div>
  );
}

export default HomePage;
