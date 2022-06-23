import HotSlider from "../components/hotSlider/HotSlider";
import Feed from "../components/feed/Feed";

import Post from "../components/post/Post";
import PostForm from "../components/post/postForm/PostForm";
import { useTranslation } from "react-i18next";

function HomePage() {
  const { t } = useTranslation(["misc"]);

  return (
    <div>
      <HotSlider
        url="Event/Hot"
        navigateUrl="/event/"
        title={t("trendingEvents")}
      />
      <HotSlider
        url="Location/Trending/0"
        navigateUrl="/location/"
        title={t("trendingLocations")}
      />
      <h3 className="text-center m-5">{t("posts")}</h3>
      <Feed url="Post/Feed" FeedCard={Post} AddElementForm={PostForm} />
    </div>
  );
}

export default HomePage;
