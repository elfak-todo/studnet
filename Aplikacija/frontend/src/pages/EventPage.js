import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import EventDetails from "../components/eventDetails/EventDetails";
import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound.js";

function EventPage() {
  const eventId = useParams().eventId;

  const { t } = useTranslation(["event"]);

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

    axios.get(`Reservation/Event/${eventId}/0`).then((res) => {});
  }, [eventId]);

  return event && event?.canceled ? (
    <EventDetails event={event} />
  ) : (
    <ResourceNotFound text={t("eventNotFound")} />
  );
}

export default EventPage;
