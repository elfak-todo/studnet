import React, { useState } from "react";
import { Image, OverlayTrigger, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./AuthorCard.style.css";
import defaultPic from "../../images/defaultProfilePic.jpg";
import ProfileHoverCard from "../profile/profileHoverCard/ProfileHoverCard";

function AuthorCard({ author, hoverEnabled = true, clickable = true }) {
  const navigate = useNavigate();

  const [popupShown, setPopupShown] = useState(false);

  const onCardClicked = (e) => {
    if (clickable) {
      navigate(`/student/${author.id}`);
    }
  };

  return (
    author && (
      <OverlayTrigger
        rootClose
        show={hoverEnabled && popupShown}
        placement="right"
        overlay={
          <Popover
            onMouseEnter={(e) => setPopupShown(true)}
            onMouseLeave={(e) => setPopupShown(false)}
          >
            <ProfileHoverCard studentProp={author} />
          </Popover>
        }
      >
        <div
          className="mx-auto author-card"
          onMouseEnter={(e) => setPopupShown(true)}
          onMouseLeave={(e) => setPopupShown(false)}
          style={{ cursor: clickable ? "pointer" : "unset" }}
          onClick={onCardClicked}
        >
          <Image
            src={
              !author || author.imagePath === "/"
                ? defaultPic
                : author.imagePath
            }
            alt="Slika korisnika"
            className="author-card-image"
            roundedCircle
          />
          <div>
            <p className="author-card-name">{`${author.firstName} ${author.lastName}`}</p>
            <p>{author.facultyName}</p>
          </div>
        </div>
      </OverlayTrigger>
    )
  );
}

export default AuthorCard;
