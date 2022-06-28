import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

import { SETTINGS } from "./HotSliderSettings";
import HotCard from "../hotCard/HotCard";

import "./HotSlider.style.css";
import { Spinner } from "react-bootstrap";

function HotSlider({ url, navigateUrl, title, placeholder }) {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    axios.get(url).then((res) => {
      setFeed(res.data);
    });
  }, [url]);

  const [sliderSettings, setSliderSettings] = useState(SETTINGS);

  useEffect(() => {
    if (feed) {
      setSliderSettings((s) => {
        const newSettings = {
          ...s,
          slidesToShow: Math.min(Math.max(feed.length, 1), 7),
        };
        newSettings.responsive[0].settings.slidesToShow = Math.min(
          Math.max(feed.length, 1),
          5
        );
        newSettings.responsive[1].settings.slidesToShow = Math.min(
          Math.max(feed.length, 1),
          4
        );
        newSettings.responsive[2].settings.slidesToShow = Math.min(
          Math.max(feed.length, 1),
          3
        );
        newSettings.responsive[3].settings.slidesToShow = Math.min(
          Math.max(feed.length, 1),
          2
        );
        return newSettings;
      });
    }
  }, [feed, setSliderSettings]);

  return (
    sliderSettings && (
      <div className="hot-cards-container">
        <h3 className="ms-3 mt-3">{title}</h3>
        {feed ? (
          feed.length > 0 ? (
            <Slider {...sliderSettings}>
              {feed.map((e) => (
                <HotCard key={e.id} element={e} navigateUrl={navigateUrl} />
              ))}
            </Slider>
          ) : (
            <div className="ms-3 my-5">{placeholder}</div>
          )
        ) : (
          <div className="my-5 py-5 text-center">
            <Spinner
              className="my-5"
              as="span"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    )
  );
}

export default HotSlider;
