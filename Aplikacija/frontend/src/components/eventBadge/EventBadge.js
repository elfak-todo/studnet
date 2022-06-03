import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./EventBadge.style.css";



function EventBadge({event}) {
    return(
        <Badge
            className="event-type">
            {event && t(EventTypes[event.type].name)}
        </Badge>
    );
          
}

export default EventBadge;