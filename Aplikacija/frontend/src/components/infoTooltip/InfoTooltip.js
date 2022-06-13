import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import "./InfoTooltip.style.css"

function InfoTooltip({text}) {
  return (
    <OverlayTrigger
      placement="right"
      overlay={<Tooltip className="my-tooltip">{text}</Tooltip>}
    >
      <span>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </span>
    </OverlayTrigger>
  );
}

export default InfoTooltip;
