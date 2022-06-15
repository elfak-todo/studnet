import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EventDetails from "../components/eventDetails/EventDetails";

function EventPage() {
  const eventId = useParams().eventId;

  const [event, setEvent] = useState(undefined);

  useEffect(() => {
    axios
      .get(`Event/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setEvent(null);
        }
      });

    axios.get(`Reservation/Event/${eventId}/0`).then((res) => {
    });
  }, [eventId]);

  return event && <EventDetails event={event} />;
}

export default EventPage;
