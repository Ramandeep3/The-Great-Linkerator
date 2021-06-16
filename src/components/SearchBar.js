import React from "react";
import { TextField, Button } from "@material-ui/core";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="searchbar">
      <TextField
        id="Search-Bar"
        label="Search for links"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          // <button>Search</button>;
        }}
      />
    </div>
  );
};

export default SearchBar;
