import { useTranslation } from "react-i18next";
import { FloatingLabel, Form } from "react-bootstrap";

function EventSelectType() {
  const { t } = useTranslation(["event"]);

  return (
    <FloatingLabel className="mb-2" label={t("eventType")}>
      <Form.Select>
        {[
          "chooseEvType",
          "party",
          "fieldTrip",
          "sportEvent",
          "concert",
          "job",
          "play",
          "art",
          "newYears",
        ].map((opt, i) => (
          <option key={i} value={i}>
            {t(opt)}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {t("chooseEvType")}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
}

export default EventSelectType;
