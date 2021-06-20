import React, { useState, useEffect } from "react";
import { Title } from "../components";
import { getLinks } from "../api";
import CreateLinkForm from "./CreateLinkForm"; // do not delete this
import SearchBar from "./SearchBar";
import CardLink from "./CardLink";
import "./App.css";

const App = () => {
  const [links, setLinks] = useState([]);
  const retrieveLinks = () => {
    getLinks()
      .then((link) => {
        setLinks(link);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    retrieveLinks();
  }, []);

  return (
    <div className="App">
      <div className="titleContainer">
        <Title />
      </div>
      <div className="searchContainer">
        <SearchBar links={links} setLinks={setLinks} reset={retrieveLinks} />
      </div>
      <div className="cardContainer">
        <CardLink links={links} setLinks={setLinks} reset={retrieveLinks} />
      </div>
    </div>
  );
};
export default App;
