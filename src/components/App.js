import React, { useState, useEffect } from "react";
import { Home, Title } from "../components";
import { getSomething } from "../api";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom" ;
import "./App.css";

const App = () => {
  const [message, setMessage] = useState("");
  const [grabbedLinks, setGrabbedLinks] = useState([]);

  useEffect(() => {
    getLinks()
      .then((link) => {
        setMessage(response.message);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  });

  return (
    <div className="App">
      <Home />
      {/* <Title /> */}

      {/* <h1>Hello, World!</h1> */}
      {/* <h2>{message}</h2> */}
    </div>
  );
};

export default App;
