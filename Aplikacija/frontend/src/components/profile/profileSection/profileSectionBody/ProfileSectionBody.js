import { Card, Container } from "react-bootstrap";

import ProfileFeed from "../../profileFeed/ProfileFeed";

import "./ProfileSectionBody.style.css";

function ProfileSectionBody({ studentProp }) {
  return (
    <Container className="profile-section-body-cont px-0">
      <Card className="shadow-sm px-0">
        <ProfileFeed studentProp={studentProp} />
      </Card>
    </Container>
  );
}

export default ProfileSectionBody;
