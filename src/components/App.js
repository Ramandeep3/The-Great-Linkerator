<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Title,SearchBar} from "../components";
import {
  getSomething
} from '../api';
=======
import React, { useState, useEffect } from "react";
import { Title } from "../components";
import { getSomething } from "../api";
>>>>>>> upstream/master

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
<<<<<<< HEAD
      <Title/>
     <SearchBar/>
   
      
=======
      <Title />
      {/* <h1>Hello, World!</h1> */}
      {/* <h2>{message}</h2> */}
>>>>>>> upstream/master
    </div>
  );
};

export default App;
