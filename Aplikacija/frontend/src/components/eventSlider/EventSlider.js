import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./EventSlider.style.css";
import axios from "axios";
import { SETTINGS } from "./EventSliderSettings";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import EventCard from "../eventCard/EventCard";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function EventSlider() {
  const { t } = useTranslation(["homePage"]);

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    axios.get("Event/Hot").then((res) => {
      setFeed(res.data);
    });
  }, []);

  return (
    <Container className="p-3">
      <h3 className="events-heading">{t("eventsHeading")}</h3>
      <Slider {...SETTINGS}>
        {feed.map((e) => (
          <EventCard key={e.ev.id} event={e.ev} />
        ))}
      </Slider>
    </Container>
  );
}

export default EventSlider;
