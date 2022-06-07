import { Container } from "react-bootstrap";

import ProfileSectionHeader from "./profileSectionHeader/ProfileSectionHeader";
import ProfileSectionBody from "./profileSectionBody/ProfileSectionBody";
import "./ProfileSection.style.css";

function ProfileSection({ student, setStudent }) {
  return (
    <Container className="profile-section-cont">
      <ProfileSectionHeader studentProp={student} setStudentProp={setStudent} />
      <ProfileSectionBody studentProp={student} />
    </Container>
  );
}

export default ProfileSection;
