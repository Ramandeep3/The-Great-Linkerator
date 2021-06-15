import React, { useState, useEffect } from "react";
import { Title } from "../components";
import { getSomething } from "../api";
import CreateLinkForm from "./CreateLinkForm";
import Button from "react-bootstrap/Button";

const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getSomething()
      .then((response) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <Title />
      <CreateLinkForm />

      {/* <h1>Hello, World!</h1> */}
      {/* <h2>{message}</h2> */}
    </div>
  );
};
export default App;
