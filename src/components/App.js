import React, { useState, useEffect } from "react";
import { Title } from "../components";
import { getSomething } from "../api";

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
      <Title/>
     <SearchBar/>
   
      
    </div>
  );
};

export default App;
