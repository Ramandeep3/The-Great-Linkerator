import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";

const LinkCreated = () => {
  return (
    <>
      <Alert variant="success">
        <Alert.Heading>Success</Alert.Heading>
        <p>You have successfully created a new link.</p>
      </Alert>
    </>
  );
};
