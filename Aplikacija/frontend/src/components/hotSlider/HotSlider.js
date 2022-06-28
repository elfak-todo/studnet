import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { SETTINGS } from "./HotSliderSettings";
import HotCard from "../hotCard/HotCard";

import "./HotSlider.style.css";

function HotSlider({ url, navigateUrl, title }) {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    axios.get(url).then((res) => {
      setFeed(res.data);
    });
  }, [url]);

  return (
    <div className="hot-cards-container">
      <h3 className="ms-3 mt-3">{title}</h3>
      <Slider {...SETTINGS}>
        {feed.map((e) => (
          <HotCard key={e.id} element={e} navigateUrl={navigateUrl} />
        ))}
      </Slider>
    </div>
  );
}

export default HotSlider;
