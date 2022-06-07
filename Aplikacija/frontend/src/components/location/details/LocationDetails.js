import React from "react";
import Slider from "react-slick";
import locationTypes from "../../locationMarker/LocationTypes.js";
import { Badge, Image } from "react-bootstrap";

import "./LocationDetails.style.css";
import { useTranslation } from "react-i18next";
import { parseDate } from "../../../helpers/DateParser.js";
import AuthorCard from "../../authorCard/AuthorCard.js";

function LocationDetails({ location, author }) {
  const { t, i18n } = useTranslation(["locations, misc"]);

  return (
    <div>
      <div className="location-details-fields text-center my-4">
        <h4>
          <Badge>{t("locations:" + locationTypes[location.type].name)}</Badge>
          <Badge className="ms-1">{location.averageGrade.toFixed(1)} ★</Badge>
          <Badge className="ms-1">
            {location.verified && t("misc:verified")}
          </Badge>
        </h4>
      </div>
      <Slider
        autoplay
        autoplaySpeed={6000}
        dots
        slidesToScroll={1}
        slidesToShow={1}
        className="location-details-slider mx-auto"
      >
        {location.imageGallery.map((s) => (
          <Image src={s} alt="Slika događaja" key={s} />
        ))}
      </Slider>

      <h3 className="text-center mt-5">Opis</h3>
      <p className="location-details-description">{location.description}</p>
      <h3 className="text-center mt-5">Autor</h3>
      <AuthorCard author={author} className="mb-5" />
      <h6 className="text-center my-1">
        {parseDate(location.publicationTime, i18n.language)}
      </h6>
      <div className="my-5"></div>
    </div>
  );
}

export default LocationDetails;
