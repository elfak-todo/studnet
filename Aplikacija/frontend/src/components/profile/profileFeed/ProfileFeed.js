import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";

import { Tabs, Tab } from "react-bootstrap";

import Post from "../../post/Post.js";
import "./ProfileFeed.style.css";
import Feed from "../../feed/Feed.js";
import StudentContext from "../../studentManager/StudentManager.js";

import ProfilePostForm from "../profilePostForm/ProfilePostForm.js";
import LocationTrendingCard from "../../locationTrendingCard/LocationTrendingCard.js";

function ProfileFeed({ studentProp }) {
  const { t } = useTranslation(["profile", "misc"]);

  const { student } = useContext(StudentContext);

  const [url, setUrl] = useState();

  useEffect(() => {
    if (studentProp) {
      setUrl(`Student/${studentProp.id}/Posts`);
    }
  }, [studentProp]);

  return (
    <Tabs fill defaultActiveKey="posts">
      <Tab
        eventKey="events"
        tabClassName="profile-feed-tab"
        title={t("misc:events")}
      >
        <div>DOGAĐAJI</div>
      </Tab>
      <Tab
        className="mb-5"
        eventKey="posts"
        tabClassName="profile-feed-tab"
        title={t("misc:posts")}
      >
        {studentProp && (
          <Feed
            url={url}
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
        {studentProp && (
          <Feed
            url={`Student/${studentProp.id}/Locations`}
            FeedCard={LocationTrendingCard}
            AddElementForm={
              student.id === studentProp?.id ? ProfilePostForm : undefined
            }
          />
        )}
      </Tab>
    </Tabs>
  );
}

export default ProfileFeed;
