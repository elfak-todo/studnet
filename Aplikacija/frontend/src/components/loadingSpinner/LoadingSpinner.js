import React from "react";
import { Spinner } from "react-bootstrap";

function LoadingSpinner() {
  return (
    <Spinner
      as="span"
      animation="border"
      size="md"
      role="status"
      aria-hidden="true"
    />
  );
}

export default LoadingSpinner;
