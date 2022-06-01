import React from "react";
import Slider from "react-slick";
import locationTypes from "../../locationMarker/LocationTypes.js";
import { Image } from "react-bootstrap";

import defaultPic from "../../../images/defaultProfilePic.jpg";
import "./LocationDetails.style.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function LocationDetailsDetails({ location }) {
  const { t } = useTranslation(["locations"]);
  const navigate = useNavigate();

  return (
    <div>
      <div className="location-details-review">
        <Slider
          autoplay
          autoplaySpeed={6000}
          dots
          slidesToScroll={1}
          slidesToShow={1}
          className="location-details-slider"
        >
          {location.details.imageGallery.map((s) => (
            <Image src={s} alt="Slika događaja" key={s} />
          ))}
        </Slider>
        <div className="location-details-fields">
          <h3>{t(locationTypes[location.details.type].name)}</h3>
        </div>
      </div>
      <h3 className="text-center mt-5">Opis</h3>
      <p className="location-details-description">
        {location.details.description}
      </p>
      <h3 className="text-center mt-5">Autor</h3>
      <div
        className="mx-auto author-card"
        onClick={(e) => navigate(`/student/${location.author.id}`)}
      >
        <Image
          src={
            !location.author || location.author.imagePath === "/"
              ? defaultPic
              : location.author.imagePath
          }
          alt="Slika korisnika"
          className="avatar"
          roundedCircle
        />
        <p>{`${location.author.firstName} ${location.author.lastName}`}</p>
        <p>{location.author.facultyName}</p>
      </div>
    </div>
  );
}

export default LocationDetailsDetails;
