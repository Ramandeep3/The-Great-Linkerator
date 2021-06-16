import React, { useState, useEffect } from "react";
import { Title, CreateLinkForm, SearchBar } from "../components";
import { getSomething } from "../api";

const App = () => {
  const [m, setMessage] = useState("");
  const [grabbedLinks, setGrabbedLinks] = useState([]);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setCardData(getLinks());
  }, [setCardData]);

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
