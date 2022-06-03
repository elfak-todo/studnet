import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs, Tab, Button } from "react-bootstrap";

import StudentContext from "../../studentManager/StudentManager";
import PostForm from "../../post/postForm/PostForm.js";
import "./ProfileFeed.style.css";

function ProfileFeed({ studentProp }) {
  const { t } = useTranslation(["profile", "misc"]);

  const { student } = useContext(StudentContext);

  const [showPostForm, setShowPostForm] = useState(false);

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
        <div className="btn-add-post">
          {student.id === studentProp?.id && (
            <Button
              className="mt-2 float-end"
              onClick={() => {
                showPostForm ? setShowPostForm(false) : setShowPostForm(true);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
              {t("newPost")}
            </Button>
          )}
        </div>
        {showPostForm && <PostForm />}
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
