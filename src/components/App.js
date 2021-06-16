import React, { useState, useEffect } from "react";
import { Title } from "../components";
import { getSomething } from "../api";
import CreateLinkForm from "./CreateLinkForm";
import SearchBar from "./SearchBar";

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
      <SearchBar />
      <CreateLinkForm />

      {/* <h1>Hello, World!</h1> */}
      {/* <h2>{message}</h2> */}
    </div>
  );
};
export default App;
