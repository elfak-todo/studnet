import "./EventPostHeader.style.css";

import { useContext, useState } from "react";
import axios from "axios";

import defaultPic from "../../../images/defaultProfilePic.jpg";
import SettingsDropdown from "../../settingsDropdown/SettingsDropdown";
import StudentContext from "../../studentManager/StudentManager";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faThumbTack } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { Image, Card } from "react-bootstrap";

function EventPostHeader({ author, event, feed, setFeed, setEdit }) {
  

  const { student } = useContext(StudentContext);

  const [pinned, setPinned] = useState(event.pinned);
  const [verified, setVerified] = useState(event.verified);

  const handleDelete = () => {
    axios
      .delete("Event/Delete/" + event.id)
      .then(() => {
        setFeed(feed.filter((e) => e.event.id !== event.id));
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handlePinn = () => {
    axios
      .put("Post/SetPinned/" + event.id + "/" + !pinned)
      .then((res) => {
        setPinned(res.data.pinned);
        setFeed((prevState) => {
          return prevState.map((e) => {
            if (e.event.id === event.id) {
              e.event.pinned = !pinned;
              return e;
            } else return e;
          });
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleVerify = () => {
    axios
      .put("Post/SetVerified/" + event.id + "/" + !verified)
      .then((res) => {
        setVerified(res.data.verified);
        setFeed((prevState) => {
          return prevState.map((e) => {
            if (e.event.id === event.id) {
              e.event.verified = !verified;
              return e;
            } else return e;
          });
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const handleSelectedAction = (keyEvent) => {
    switch (keyEvent) {
      case "delete":
        handleDelete();
        break;
      case "verify":
        handleVerify();
        break;
      case "pinn":
        handlePinn();
        break;
      case "edit":
        setEdit(true);
        break;
      default:
        break;
    }
  };


  const { t, i18n } = useTranslation(["event"]);

  
  return (
    <div className="event-header">
      {event.pinned && (
        <FontAwesomeIcon icon={faThumbTack} className="event-header-pinned" />
      )}
      <Image
        src={
          (author !== null && author.imagePath === "/") ||
          author === null ||
          author.imagePath === "/"
            ? defaultPic
            : author.imagePath
        }
        alt="user-pic"
        className="event-profile-pic"
        roundedCircle
      />
      <div>
        <Card.Text className="event-header-name">
          {author.firstName + " " + author.lastName}
        </Card.Text>
        <Card.Text className="event-header-faculty">
          {author !== null && author.facultyName}
        </Card.Text>
      </div>
      {event.verified && (
        <FontAwesomeIcon icon={faCircleCheck} className="event-header-verify" />
      )}
      {student.role === 3 ||
      (student !== null && author !== null && student.id === author.id) ? (
        <SettingsDropdown
          selectedAction={handleSelectedAction}
          verified={verified}
          pinned={pinned}
          className="settings-icon"
        />
      ) : null}
    </div>
  );
}

export default EventPostHeader;
