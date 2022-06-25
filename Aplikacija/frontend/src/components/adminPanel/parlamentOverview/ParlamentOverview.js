import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Image, Button } from "react-bootstrap";

import noPic from "../../../images/no-image.jpg";
import ProfileFeed from "../../profile/profileFeed/ProfileFeed";
import "./ParlamentOverview.style.css";

function ParlamentOverview() {
  const [parlament, setParlament] = useState(null);

  useEffect(() => {
    axios
      .get(`Parlament`)
      .then((res) => {
        setParlament(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container fluid className="par-mod-cont mx-auto px-0">
      <div className="par-mod-items-div">
        <div className="par-mod-pic-div">
          <Image
            src={
              parlament?.facultyImagePath === ""
                ? noPic
                : parlament?.facultyImagePath
            }
            alt="par-pic"
            className="par-mod-pic"
          />
        </div>
        <div className="d-flex align-items-center">
          <h1>{parlament?.parlamentName}</h1>
          <div className="mb-1 ms-2">
            <Button size="sm">
              <FontAwesomeIcon icon={faPen} />
            </Button>
          </div>
        </div>
        <h3>{parlament?.uniName}</h3>
        <h4>{parlament?.facName}</h4>
      </div>
      <ProfileFeed parlamentFeed={true} />
    </Container>
  );
}

export default ParlamentOverview;
