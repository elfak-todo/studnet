import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound.js";

function ParlamentPage() {
  const parlamentId = useParams().parlamentId;
  const { t } = useTranslation(["parlament"]);

  const [parlament, setParlament] = useState(undefined);

  useEffect(() => {
    axios
      .get(`Parlament/${parlamentId}`)
      .then((res) => {
        setParlament(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setParlament(null);
        }
      });
  }, [parlamentId]);

  return parlament !== null ? (
    <div>Parlament {parlamentId}</div>
  ) : (
    <ResourceNotFound text={t("parlamentNotFound")} />
  );
}

export default ParlamentPage;
