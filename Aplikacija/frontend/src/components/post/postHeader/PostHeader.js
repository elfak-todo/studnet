import { useTranslation } from "react-i18next";
import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { Image, Card, OverlayTrigger, Popover } from "react-bootstrap";

import { parseDate } from "../../../helpers/DateParser.js";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import anonymousPic from "../../../images/anonymous.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import StudentContext from "../../studentManager/StudentManager";

import "./PostHeader.style.css";
import ProfileHoverCard from "../../profile/profileHoverCard/ProfileHoverCard.js";

function PostHeader({
  author,
  post,
  feed,
  setFeed,
  setEdit,
  pinnedProp,
  verifiedProp,
}) {
  const { t, i18n } = useTranslation(["post"]);

  const { student } = useContext(StudentContext);

  const [popupShown, setPopupShown] = useState(false);
  const [pinned, setPinned] = useState(pinnedProp);
  const [verified, setVerified] = useState(verifiedProp);

  return (
    <div className="post-header">
      <OverlayTrigger
        rootClose
        show={popupShown}
        placement="right"
        overlay={
          !post.anonymous ? (
            <Popover
              onMouseEnter={(e) => setPopupShown(true)}
              onMouseLeave={(e) => setPopupShown(false)}
            >
              <ProfileHoverCard studentProp={author} />
            </Popover>
          ) : (
            <></>
          )
        }
      >
        <Image
          src={
            post.anonymous
              ? anonymousPic
              : author !== null && author.imagePath === "/"
              ? defaultPic
              : author.imagePath
          }
          alt="user-pic"
          className="post-profile-pic"
          roundedCircle
          onMouseEnter={(e) => setPopupShown(true)}
          onMouseLeave={(e) => setPopupShown(false)}
        />
      </OverlayTrigger>
      <div>
        <Card.Text className="post-header-name">
          {post.anonymous
            ? t("anonymous")
            : author.firstName + " " + author.lastName}
        </Card.Text>
        <Card.Text className="post-header-faculty">
          {author !== null && !post.anonymous && author.facultyName}
        </Card.Text>
        <Card.Text className="post-header-time">
          {parseDate(post.publicationTime, i18n.language)}
        </Card.Text>
      </div>
      {verified && (
        <FontAwesomeIcon icon={faCircleCheck} className="post-header-verify" />
      )}
      {pinned && (
        <FontAwesomeIcon icon={faThumbTack} className="post-header-pinned" />
      )}
      {student.role === 3 ||
      (student !== null && author !== null && student.id === author.id) ? (
        <SettingsDropdown
          postType="Post"
          post={post}
          author={author}
          feed={feed}
          setFeed={setFeed}
          verified={verified}
          setVerified={setVerified}
          pinned={pinned}
          setPinned={setPinned}
          setEdit={setEdit}
          className="settings-icon"
        />
      ) : null}
    </div>
  );
}

export default PostHeader;
