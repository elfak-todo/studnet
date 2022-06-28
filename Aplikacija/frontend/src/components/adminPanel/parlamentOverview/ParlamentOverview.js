import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";

import noPic from "../../../images/no-image.jpg";
import ProfileFeed from "../../profile/profileFeed/ProfileFeed";
import "./ParlamentOverview.style.css";

function ParlamentOverview() {
  const [parlament, setParlament] = useState(null);

  useEffect(() => {
    axios
      .get(`Parlament/0`)
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
              parlament?.location?.imagePath === ""
                ? noPic
                : parlament?.location?.imagePath
            }
            alt="par-pic"
            className="par-mod-pic"
          />
        </div>
        <h1>{parlament?.name}</h1>
        <h3>{parlament?.location?.name}</h3>
      </div>
      <ProfileFeed parlamentFeed={true} />
    </Container>
  );
}

export default ParlamentOverview;
