import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    axios.get("Post/Feed/0").then((res) => {
      setFeed(res.data);
    });
  }, []);

  //Test ✅ - ako se prikazuje feed ovde autorizacija radi
  return <div>{JSON.stringify(feed)}</div>;
}

export default HomePage;
