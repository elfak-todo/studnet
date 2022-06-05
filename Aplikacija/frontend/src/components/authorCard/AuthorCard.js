import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./AuthorCard.style.css";
import defaultPic from "../../images/defaultProfilePic.jpg";

function AuthorCard({ author }) {
  const navigate = useNavigate();

  return (
    author && (
      <div
        className="mx-auto author-card"
        onClick={(e) => navigate(`/student/${author.id}`)}
      >
        <Image
          src={
            !author || author.imagePath === "/" ? defaultPic : author.imagePath
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
    )
  );
}

export default AuthorCard;
