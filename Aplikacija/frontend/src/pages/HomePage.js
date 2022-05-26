// import axios from "axios";
// import { useEffect, useState } from "react";
import EventSlider from "../components/eventSlider/EventSlider";
import Feed from "../components/feed/Feed";
//import Post from "../components/post/Post";

function HomePage() {
  // const [feed, setFeed] = useState(null);

  // useEffect(() => {
  //   axios.get("Post/Feed/0").then((res) => {
  //     setFeed(res.data);
  //   });
  // }, []);

  return (
    <div>
      <EventSlider />
      <Feed />
    </div>
  );
}

export default HomePage;
