import React, { useState, useEffect } from "react";
import "./Title.css";

import { getSomething } from "../api";

const Title = () => {
  return (
    <>
      <div className="Container">
        <h1>Linkerator!</h1>
      </div>
    </>
  );
};

export default Title;
