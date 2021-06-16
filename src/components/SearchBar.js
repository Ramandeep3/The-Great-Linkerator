import React from "react";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import "./SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="SearchBar">
      <TextField
        id="Search-Bar"
        label="Search for links"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          //   <button>Search</button>
        }}
      />
    </div>
  );
};

export default SearchBar;
