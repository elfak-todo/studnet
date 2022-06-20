import { Modal, CloseButton, Image } from "react-bootstrap";

import "./ImagePreview.style.css"

function ImagePreview({ showFullImage, setShowFullImage, img }) {
  return (
    <Modal
      show={showFullImage}
      size="lg"
      onHide={() => setShowFullImage(false)}
    >
      <Modal.Header>
        <CloseButton onClick={() => setShowFullImage(false)} />
      </Modal.Header>
      <Modal.Body>
        <Image src={img} alt="Img" className="full-img" />
      </Modal.Body>
    </Modal>
  );
}

export default ImagePreview;
