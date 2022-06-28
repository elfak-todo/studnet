import { useContext, useState } from "react";
import { Card, Image, Badge, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import {
  faClipboard,
  faCalendar,
  faMap,
} from "@fortawesome/free-regular-svg-icons";

import noPic from "../../../../images/no-image.jpg";
import defaultPic from "../../../../images/defaultProfilePic.jpg";
import EditProfile from "../../editProfile/EditProfile";
import StudentContext from "../../../studentManager/StudentManager";
import StudentSettings from "../../../studentSettings/StudentSettings";

import "./ProfileSectionHeader.style.css";

function ProfileSectionHeader({ studentProp, setStudentProp }) {
  const { t } = useTranslation(["profile", "misc", "register"]);

  const { student } = useContext(StudentContext);

  const [showEditCover, setShowEditCover] = useState(false);

  const displayRole = () => {
    switch (studentProp?.role) {
      case 0:
        return "Student";
      case 1:
        return t("misc:parlamentMember");
      case 2:
        return t("misc:universityAdmin");
      case 3:
        return t("misc:admin");
      default:
        return null;
    }
  };
  return (
    <Card className="shadow-sm">
      <Card.Header className="profile-header">
        <Card.Img
          variant="top"
          src={
            studentProp?.facultyImagePath === "/" ||
            studentProp?.facultyImagePath === "" ||
            studentProp?.facultyImagePath === null
              ? noPic
              : studentProp?.facultyImagePath
          }
          className="cover-img"
        />
        <Card.ImgOverlay>
          {student?.id === studentProp?.id && (
            <Button
              variant="primary"
              size="sm"
              className="float-end"
              onClick={() => setShowEditCover(true)}
            >
              <FontAwesomeIcon icon={faPen} className="me-1" />
              {t("editProfile")}
            </Button>
          )}
        </Card.ImgOverlay>
        <Image
          fluid
          src={
            studentProp?.imagePath === "/" ? defaultPic : studentProp?.imagePath
          }
          alt={"profile-pic"}
          className="profile-img shadow"
          roundedCircle
        ></Image>
        <div className="badge-div">
          <Card.Text className="role-text">
            {studentProp?.isExchange
              ? `${displayRole()} ${t("register:onExchange")}`
              : displayRole()}
          </Card.Text>
        </div>
      </Card.Header>
      <EditProfile
        profile={studentProp}
        setProfile={setStudentProp}
        showEditCover={showEditCover}
        setShowEditCover={setShowEditCover}
      />
      <Card.Body>
        <div className="float-end">
          <StudentSettings
            studentProp={studentProp}
            setStudentProp={setStudentProp}
          />
        </div>
        <div>
          <div className="header-desc">
            <h2 className="text-name">
              {`${studentProp?.firstName} ${studentProp?.lastName}`}
            </h2>
            <h4 className="m-0"> {studentProp?.universityName} </h4>
            <Card.Text> {studentProp?.facultyName} </Card.Text>
            <div className="header-badges">
              <Badge className="p-2">
                <FontAwesomeIcon icon={faClipboard} className="me-1" />
                {`${t("misc:posts")} ${studentProp?.postCount}`}
              </Badge>
              <Badge className="ms-1 p-2">
                <FontAwesomeIcon icon={faCalendar} className="me-1" />
                {`${t("misc:events")} ${studentProp?.eventCount}`}
              </Badge>
              <Badge className="ms-1 p-2">
                <FontAwesomeIcon icon={faMap} className="me-1" />
                {`${t("misc:locations")} ${studentProp?.locationCount}`}
              </Badge>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileSectionHeader;
