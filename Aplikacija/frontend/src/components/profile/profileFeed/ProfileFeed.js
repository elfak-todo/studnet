import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import { Tabs, Tab } from "react-bootstrap";

import Post from "../../post/Post.js";
import EventPost from "../../eventPost/EventPost.js"
import "./ProfileFeed.style.css";
import Feed from "../../feed/Feed.js";
import StudentContext from "../../studentManager/StudentManager.js";

import ProfilePostForm from "../profilePostForm/ProfilePostForm.js";
import LocationTrendingCard from "../../locationTrendingCard/LocationTrendingCard.js";

function ProfileFeed({ studentProp }) {
  const { t } = useTranslation(["profile", "misc"]);

  const { student } = useContext(StudentContext);

  const [openedTab, setOpenedTab] = useState("posts");

  const [url, setUrl] = useState();

  useEffect(() => {
    if (studentProp) {
      setUrl(`Student/${studentProp.id}`);
    }
  }, [studentProp]);

  return (
    <Tabs
      fill
      defaultActiveKey="posts"
      onSelect={(key) => {
        setOpenedTab(key);
      }}
    >
      <Tab
        eventKey="events"
        tabClassName="profile-feed-tab"
        title={t("misc:events")}
      >
        {openedTab === "events" && studentProp && url && (
          <Feed
            url={url + "/Events"}
            FeedCard={EventPost}
          />
        )}
      </Tab>
      <Tab
        className="mb-5"
        eventKey="posts"
        tabClassName="profile-feed-tab"
        title={t("misc:posts")}
      >
        {openedTab === "posts" && studentProp && url && (
          <Feed
            url={url + "/Posts"}
            FeedCard={Post}
            AddElementForm={
              student.id === studentProp?.id ? ProfilePostForm : undefined
            }
          />
        )}
      </Tab>
      <Tab
        eventKey="locations"
        tabClassName="profile-feed-tab"
        title={t("misc:locations")}
      >
        {openedTab === "locations" && studentProp && url && (
          <>
            <div className="my-3"></div>
            <Feed url={url + "/Locations"} FeedCard={LocationTrendingCard} />
          </>
        )}
      </Tab>
    </Tabs>
  );
}

export default ProfileFeed;
