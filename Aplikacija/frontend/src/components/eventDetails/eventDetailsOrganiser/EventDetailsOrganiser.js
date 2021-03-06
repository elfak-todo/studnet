import { useState } from "react";
import { Card, Image, OverlayTrigger, Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import defaultPic from "../../../images/defaultProfilePic.jpg";
import ProfileHoverCard from "../../profile/profileHoverCard/ProfileHoverCard";
import "./EventDetailsOrganiser.style.css";

function EventDetailsOrganiser({ event, author }) {
  const { t } = useTranslation(["event"]);

  const [popupShown, setPopupShown] = useState(false);

  return (
    <Card className="mb-3 shadow" style={{ width: "40rem" }}>
      {event.organisingParlamentId !== null && event.verified && (
        <div className="org-parlament-div">
          <h4 className="m-0"> {t("orgByPar")}</h4>
          <p className="mb-1 org-parlament-text">{`${author.facultyName}, ${author.parlamentName}`}</p>
        </div>
      )}
      <div className="organiser-div">
        <h4> {t("organiser")} </h4>
        <OverlayTrigger
          rootClose
          show={popupShown}
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
          <Image
            src={author.imagePath === "/" ? defaultPic : author.imagePath}
            alt="organiser-img"
            roundedCircle
            className="organiser-img"
            onMouseEnter={(e) => setPopupShown(true)}
            onMouseLeave={(e) => setPopupShown(false)}
          />
        </OverlayTrigger>
        <h4 className="m-0"> {`${author.firstName} ${author.lastName}`} </h4>
        <p> {author.facultyName} </p>
      </div>
    </Card>
  );
}

export default EventDetailsOrganiser;
