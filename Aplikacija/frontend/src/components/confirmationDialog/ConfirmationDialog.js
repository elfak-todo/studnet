import { Button, CloseButton, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ConfirmationDialog({
  showConfirmation,
  setShowConfirmation,
  callback,
  text,
}) {
  const { t } = useTranslation(["info"]);
  return (
    <Modal
      centered
      show={showConfirmation}
      onHide={() => setShowConfirmation(false)}
    >
      <Modal.Header style={{ backgroundColor: "#4e54c8" }}>
        <Modal.Title style={{ color: "white" }}>
          {t(`${text}Heading`)}
        </Modal.Title>
        <CloseButton
          variant="white"
          onClick={() => setShowConfirmation(false)}
        />
      </Modal.Header>
      <Modal.Body>{t(text)}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
          {t("cancel")}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setShowConfirmation(false);
            callback();
          }}
        >
          {t("delete")}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationDialog;
