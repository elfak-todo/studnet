import { Container } from "react-bootstrap";

import ProfileSectionHeader from "./profileSectionHeader/ProfileSectionHeader";
import "./ProfileSection.style.css";

function ProfileSection({student}) {
  return (
    <Container>
      <ProfileSectionHeader student={student} />
    </Container>
  );
}

export default ProfileSection;
