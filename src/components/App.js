import React, { useState, useEffect } from "react";
import { Home, Title } from "../components";
import { getLinks } from "../api";
import CreateLinkForm from "./CreateLinkForm";
import SearchBar from "./SearchBar";
import CardLink from "./CardLink";
import "./App.css"

const App = () => {
  const [m, setMessage] = useState("");
  const [grabbedLinks, setGrabbedLinks] = useState([]);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setCardData(getLinks())
  }, [setCardData]);

  return (
    <div className="App">
      <Title />
      <SearchBar />
      <CreateLinkForm />
      <div className="cardContainer">
        <CardLink cardData={cardData}/>
      </div>
      {/* <h1>Hello, World!</h1> */}
      {/* <h2>{message}</h2> */}
    </div>
  );
};
export default App;
