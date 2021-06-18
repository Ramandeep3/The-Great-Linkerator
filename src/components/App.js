import React, { useState, useEffect } from "react";
import { Home, Title } from "../components";
import { getLinks } from "../api";
import CreateLinkForm from "./CreateLinkForm"; // do not delete this
import SearchBar from "./SearchBar";
import CardLink from "./CardLink";
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [cardData, setCardData] = useState([]);
  const [links, setLinks] = useState([]);
  const retrieveLinks = () => {
    getLinks()
      .then((link) => {
        setLinks(link);
      })
      .catch((error) => {
        // something something errors
      });
  };
  useEffect(() => {
    retrieveLinks();
  }, []);

  return (
    <div className="App">
      <Title />
      <SearchBar links={links} setLinks={setLinks} reset={retrieveLinks} />

      <div className="cardContainer">
        <CardLink links={links} setLinks={setLinks} />
      </div>
    </div>
  );
};
export default App;
