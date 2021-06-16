import React, { useState, useEffect } from "react";
import { Home, Title } from "../components";
import axios from "axios";
import { getLinks } from "../api";
import CreateLinkForm from "./CreateLinkForm";
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

  // useEffect(() => {
  //   setCardData(getLinks());
  // }, [setCardData]);

  return (
    <div className="App">
      <Title />
      <div className="NavBar">
        <SearchBar links={links} setLinks={setLinks} reset={retrieveLinks} />
        <CreateLinkForm />
      </div>

      <div className="cardContainer">
        <CardLink links={links} setLinks={setLinks} />
      </div>
      {/* <h1>Hello, World!</h1> */}
      {/* <h2>{message}</h2> */}
    </div>
  );
};
export default App;
