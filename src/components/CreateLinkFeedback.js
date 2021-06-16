import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";
import { createNewLinks } from "../api";

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

const LinkFailed = () => {
  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>Unable to create</Alert.Heading>
        <p>
          You were unable to created a new link. Check existing links first.
        </p>
      </Alert>
    </>
  );
};

const NewLinkFeedback = () => {
  const LinkFunction = createNewLinks().value;
  const LinkData = LinkFunction.data;
  console.log(LinkFunction, LinkData, LinkData.message, "HELLO!!");
  if (LinkData.message === "Link successfully created!") {
    return <LinkCreated />;
  } else {
    return <LinkFailed />;
  }
};

export default NewLinkFeedback;
