import { useTranslation } from "react-i18next";
import { FloatingLabel, Form } from "react-bootstrap";

function EventSelectType({ selectedType, setSelectedType, isInvalid, setInvalid }) {
  const { t } = useTranslation(["event"]);

  return (
    <FloatingLabel className="mb-2" label={t("eventType")}>
      <Form.Select
        isInvalid={isInvalid}
        value={selectedType}
        onChange={(e) => {
          setSelectedType(e.target.value);
          setInvalid(false);
        }}
      >
        {[
          "chooseEvType",
          "party",
          "fieldTrip",
          "sportEvent",
          "concert",
          "musicFestival",
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
