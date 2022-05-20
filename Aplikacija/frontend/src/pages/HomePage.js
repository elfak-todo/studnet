import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    axios.get("Post/Feed/0").then((res) => {
      setFeed(res.data);
    });
  }, []);

  return <div>{JSON.stringify(feed)}</div>;
}

export default HomePage;
