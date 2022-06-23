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
    <Modal show={showConfirmation} size="md" centered backdrop="static">
      <Modal.Header style={{ backgroundColor: "#4e54c8" }}>
        <Modal.Title style={{ color: "white" }}>
          {t(`${text}Heading`)}
        </Modal.Title>
        <CloseButton
          variant="white"
          onClick={() => setShowConfirmation(false)}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="text-center">{t(text)}</p>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex">
          <Button
            onClick={() => {
              callback();
              setShowConfirmation(false);
            }}
          >
            {t("delete")}
          </Button>
          <Button
            className="ms-2"
            variant="outline-primary"
            onClick={() => {
              setShowConfirmation(false);
            }}
          >
            {t("cancel")}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationDialog;
