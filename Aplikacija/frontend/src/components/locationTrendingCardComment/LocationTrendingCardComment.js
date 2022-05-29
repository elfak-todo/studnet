import React from "react";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";

function LocationTrendingCardComment({ grade }) {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={<Tooltip id="button-tooltip">{grade.commentText}</Tooltip>}
    >
      <div className="LocationTrendingCardGrade">
        <Image
          src={grade.gradedBy.imagePath}
          alt="a"
          width="40px"
          height="40px"
          roundedCircle
        />
        <p className="ms-2">
          "
          {grade.commentText?.length > 60
            ? grade.commentText?.substring(0, 61) + "..."
            : grade.commentText}
          " <b>{grade.value}/5</b>
        </p>
      </div>
    </OverlayTrigger>
  );
}

export default LocationTrendingCardComment;
