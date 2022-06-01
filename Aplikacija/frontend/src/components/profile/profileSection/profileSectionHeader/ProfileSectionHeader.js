import { useState } from "react";
import { Card, Image, Badge, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import elfak from "../../../../images/elfak.jpg";
import luka from "../../../../images/luka.jpg";
import EditCover from "../editProfile/EditProfile";
import "./ProfileSectionHeader.style.css";

function ProfileSectionHeader({student}) {
  const { t } = useTranslation(["profile", "misc"]);

  const [showEditCover, setShowEditCover] = useState(false);
  console.log(student);
  return (
    <Card className="shadow">
      <Card.Header className="profile-header">
        <Card.Img variant="top" src={elfak} className="cover-img" />
        <Card.ImgOverlay>
          <Button
            variant="primary"
            size="sm"
            className="float-end"
            onClick={() => setShowEditCover(true)}
          >
            {t("editProfile")}
          </Button>
        </Card.ImgOverlay>
        <Image
          fluid
          src={luka}
          alt="profile-pic"
          className="profile-img shadow"
          roundedCircle
        ></Image>
        <div className="badge-div"> <Card.Text className="role-text"> Parlament member </Card.Text></div>
      </Card.Header>
      <EditCover show={showEditCover} onHide={() => setShowEditCover(false)} />
      <Card.Body>
        <div className="header-desc">
          <h2 className="text-name"> Luka Kocić </h2>
          <h4 className="m-0"> Univerzitet u Nišu </h4>
          <Card.Text>Elektronski Fakultet</Card.Text>
          <div className="header-badges">
            <Badge> {t("misc:posts") + " 123"} </Badge>
            <Badge className="ms-1"> {t("misc:events") + " 23"} </Badge>
            <Badge className="ms-1"> {t("misc:locations") + " 1"} </Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProfileSectionHeader;
