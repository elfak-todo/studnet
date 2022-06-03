import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Container } from "react-bootstrap";

import { SETTINGS } from "./EventSliderSettings";
import EventCard from "../eventCard/EventCard";

import "./EventSlider.style.css";

function EventSlider() {

  const [feed, setFeed] = useState([]);

  useEffect(() => {
    axios.get("Event/Hot").then((res) => {
      setFeed(res.data);
    }).catch(err=>{
      console.log(err.response.data);
    })
  }, []);

  return (
    <Container fluid className="p-3">
      <Slider {...SETTINGS}>
        {feed.map((e) => (
          <EventCard key={e.ev.id} event={e.ev} />
        ))}
      </Slider>
    </Container>
  );
}

export default EventSlider;
