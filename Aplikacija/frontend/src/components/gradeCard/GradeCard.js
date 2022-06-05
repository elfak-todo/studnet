import React from "react";
import { Card } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Rating } from "react-simple-star-rating";
import AuthorCard from "../authorCard/AuthorCard";

import "./GradeCard.style.css";
import { parseDate } from "../../helpers/DateParser";

function GradeCard({ feedEl, innerRef }) {
  const { i18n } = useTranslation(["locations"]);

  return (
    feedEl && (
      <Card className="grade-card my-2 shadow-sm" ref={innerRef}>
        <Card.Body className="grade-card-body">
          <AuthorCard author={feedEl.gradedBy} />
          <p className="grade-card-comment">{feedEl.commentText}</p>
          <Rating
            readonly={true}
            initialValue={feedEl.value}
            size={36}
            className="me-3"
          />
        </Card.Body>
        <Card.Footer>
          <p className="m-0 text-end">
            {parseDate(feedEl.publicationTime, i18n.language)}
          </p>
        </Card.Footer>
      </Card>
    )
  );
}

export default GradeCard;
