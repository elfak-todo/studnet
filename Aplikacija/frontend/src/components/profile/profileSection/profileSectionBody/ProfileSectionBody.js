import { Card, Container } from "react-bootstrap";

import ProfileFeed from "../../profileFeed/ProfileFeed";

import "./ProfileSectionBody.style.css";

function ProfileSectionBody({ studentProp }) {
  return (
    <Container className="profile-section-body-cont">
      <Card className="shadow">
        <Card.Body>
          <ProfileFeed studentProp={studentProp} />
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProfileSectionBody;
