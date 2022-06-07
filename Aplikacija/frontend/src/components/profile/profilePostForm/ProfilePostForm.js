import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import PostForm from "../../post/postForm/PostForm.js";

function ProfilePostForm({ feed, setFeed }) {
  const { t } = useTranslation(["profile"]);
  const [showPostForm, setShowPostForm] = useState(false);

  return (
    <>
      <div className="btn-add-post">
        <Button
          className="mt-3 float-end"
          onClick={() => {
            showPostForm ? setShowPostForm(false) : setShowPostForm(true);
          }}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="me-1" />
          {t("newPost")}
        </Button>
      </div>
      {showPostForm && <PostForm feed={feed} setFeed={setFeed} />}
    </>
  );
}

export default ProfilePostForm;
