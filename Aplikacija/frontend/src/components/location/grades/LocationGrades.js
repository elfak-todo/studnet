import React from "react";
import { useTranslation } from "react-i18next";

import Feed from "../../feed/Feed";
import GradeCard from "../../gradeCard/GradeCard";
import GradeForm from "../../gradeForm/GradeForm";

function LocationGrades({ location, setLocation }) {
  const { t } = useTranslation(["locations"]);

  return (
    location && (
      <>
        <div className="text-center my-4">
          <h4>
            {t("averageGrade") +
              (location.gradeCount > 0 ? location.averageGrade.toFixed(1) : 0)}
          </h4>
          <h5>{t("gradeCount") + location.gradeCount}</h5>
        </div>
        <Feed
          url={`Grade/${location.id}`}
          FeedCard={GradeCard}
          AddElementForm={GradeForm}
          metadata={{ location, setLocation }}
        />
      </>
    )
  );
}

export default LocationGrades;
