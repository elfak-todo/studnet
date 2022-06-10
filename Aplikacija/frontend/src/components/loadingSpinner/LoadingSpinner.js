import React from "react";
import { Spinner } from "react-bootstrap";

import "./LoadingSpinner.style.css";

function LoadingSpinner() {
  return (
    <div className="loading-spinner-container">
      <Spinner
        as="span"
        animation="border"
        size="md"
        role="status"
        aria-hidden="true"
      />
    </div>
  );
}

export default LoadingSpinner;
