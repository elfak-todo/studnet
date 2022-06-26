import { Button, CloseButton, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

function ConfirmationDialog({
  shown,
  setConfDialog,
  callback,
  text,
  confirmBtnText,
}) {
  const { t } = useTranslation(["info"]);

  return (
    <Modal centered show={shown} onHide={() => setConfDialog({ shown: false })}>
      <Modal.Header style={{ backgroundColor: "#4e54c8" }}>
        <Modal.Title style={{ color: "white" }}>
          {t("confirmAction")}
        </Modal.Title>
        <CloseButton
          variant="white"
          onClick={() => setConfDialog({ shown: false })}
        />
      </Modal.Header>
      <Modal.Body>{t(text)}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setConfDialog({ shown: false })}
        >
          {t("cancel")}
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            setConfDialog({ shown: false });
            callback();
          }}
        >
          {t(confirmBtnText)}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationDialog;
