import { useTranslation } from "react-i18next";
import { useContext } from "react";

import { Tabs, Tab } from "react-bootstrap";

import Post from "../../post/Post.js";
import "./ProfileFeed.style.css";
import Feed from "../../feed/Feed.js";
import StudentContext from "../../studentManager/StudentManager.js";

import ProfilePostForm from "../profilePostForm/ProfilePostForm.js";

function ProfileFeed({ studentProp }) {
  const { t } = useTranslation(["profile", "misc"]);

  const { student } = useContext(StudentContext);

  return (
    <Tabs fill defaultActiveKey="posts">
      <Tab
        eventKey="events"
        tabClassName="profile-feed-tab"
        title={t("misc:events")}
      ></Tab>
      <Tab
        className="mb-5"
        eventKey="posts"
        tabClassName="profile-feed-tab"
        title={t("misc:posts")}
      >
        {studentProp && (
          <Feed
            url={`Student/${studentProp.id}/Posts`}
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
        <p> Lokacije </p>
      </Tab>
    </Tabs>
  );
}

export default ProfileFeed;
