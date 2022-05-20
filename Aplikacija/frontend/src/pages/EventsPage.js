import axios from "axios";
import { useEffect, useState } from "react";

function EventsPage() {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    axios.get("Event/Feed/0").then((res) => {
      setFeed(res.data);
    });
  }, []);

  return <div>{JSON.stringify(feed)}</div>;
}

export default EventsPage;
