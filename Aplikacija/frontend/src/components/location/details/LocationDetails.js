import React from "react";
import Slider from "react-slick";
import locationTypes from "../../locationMarker/LocationTypes.js";
import { Image } from "react-bootstrap";

import "./LocationDetails.style.css";
import { useTranslation } from "react-i18next";
import { parseDate } from "../../../helpers/DateParser.js";
import AuthorCard from "../../authorCard/AuthorCard.js";

function LocationDetails({ location }) {
  const { t, i18n } = useTranslation(["locations"]);

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
      <h5>{parseDate(location.details.publicationTime, i18n.language)}</h5>
      <AuthorCard author={location.author} className="mb-5" />
    </div>
  );
}

export default LocationDetails;
