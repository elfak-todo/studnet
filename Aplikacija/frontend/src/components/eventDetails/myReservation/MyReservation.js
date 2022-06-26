import axios from "axios";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import "./MyReservation.style.css";
import ConfirmationDialog from "../../confirmationDialog/ConfirmationDialog";

function MyReservation({
  reservation,
  setReservation,
  showMyReservation,
  setDisabledInput,
  ticketNumRef,
  setEdit,
  numTicket,
  setTicketsReserved,
  setProgress,
}) {
  const { t, i18n } = useTranslation(["event"]);

  const [confDialog, setConfDialog] = useState({ shown: false });

  const handleEdit = () => {
    setDisabledInput(false);
    ticketNumRef.current.value = reservation.numberOfTickets;
    setEdit(true);
  };

  const handleCancel = () => {
    axios
      .patch(`Reservation/${reservation.id}/Cancel`)
      .then((res) => {
        setTicketsReserved(
          (prev) => (prev -= Number(reservation.numberOfTickets))
        );
        setProgress(res.data.spaceTaken);
        setReservation(res.data.reservation);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mess = (tickets) => {
    if (i18n.language === "en") {
      if (tickets === 1)
        return `You have reserved ${tickets} ticket for this event.`;
      else return `You have reserved ${tickets} tickets for this event.`;
    } else {
      switch (tickets) {
        case 1:
          return `Rezervirali ste ${tickets} kartu za ovaj događaj.`;
        case 2:
        case 3:
        case 4:
          return `Rezervirali ste ${tickets} karte za ovaj događaj.`;
        default:
          return `Rezervirali ste ${tickets} karata za ovaj događaj.`;
      }
    }
  };

  return (
    <>
      <Alert
        show={showMyReservation}
        variant="primary"
        transition
        className="m-2"
      >
        <Alert.Heading>
          {t("myRes")}
          {!reservation?.canceled && (
            <FontAwesomeIcon
              icon={faPen}
              className="float-end edit-icon"
              onClick={handleEdit}
            />
          )}
        </Alert.Heading>
        {reservation?.canceled ? t("yourResIsCanceled") : mess(numTicket)}
        <hr />
        <div className="d-flex justify-content-center">
          {!reservation?.canceled && (
            <Button
              variant="outline-primary"
              onClick={() =>
                setConfDialog({
                  shown: true,
                  callback: handleCancel,
                  text: "cancelResConf",
                  btnText: "confirm",
                })
              }
            >
              {t("cancelRes")}
            </Button>
          )}
        </div>
      </Alert>
      {confDialog.shown && (
        <ConfirmationDialog
          setConfDialog={setConfDialog}
          shown={confDialog.shown}
          callback={confDialog.callback}
          text={confDialog.text}
          confirmBtnText={confDialog.btnText}
        />
      )}
    </>
  );
}

export default MyReservation;
