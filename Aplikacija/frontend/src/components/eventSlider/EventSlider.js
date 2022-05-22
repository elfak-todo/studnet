import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./EventSlider.style.css";
import { SETTINGS } from "./EventSliderSettings";
import React from "react";
import Slider from "react-slick";
import EventCard from "../eventCard/EventCard";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function EventSlider() {
  const { t } = useTranslation(["homePage"]);

  return (
    <Container className="p-3">
      <h3 className="ms-5">{t("eventsHeading")}</h3>
      <Slider {...SETTINGS}>
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </Slider>
    </Container>
  );
}

export default EventSlider;
