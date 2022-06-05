import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AuthorCard from "../authorCard/AuthorCard";

import "./GradeCard.style.css";

function GradeCard({ feedEl }) {
  console.log(feedEl);
  return (
    feedEl && (
      <Card className="grade-card my-2">
        <Card.Body className="grade-card-body">
          <AuthorCard author={feedEl.gradedBy} />
          <p className="grade-card-comment">{feedEl.commentText}</p>
          <Rating readonly={true} initialValue={feedEl.value} />
        </Card.Body>
      </Card>
    )
  );
}

export default GradeCard;
