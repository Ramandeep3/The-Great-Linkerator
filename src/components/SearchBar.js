import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";

const SearchBar = ({ links, setLinks, reset }) => {
  const [searchTerm, setSearchTerm] = useState("");
  let originalLinks = links.slice(0);

  const handleSearch = (event) => {
    let filteredLinks = links.filter((theLink) => {
      return theLink.link.toLowerCase().includes(searchTerm.toLowerCase()) ||
        theLink.tags.filter((tag) => {
          return tag.name.toLowerCase().includes(searchTerm.toLowerCase());
        }).length > 0
        ? theLink
        : "";
    });
    setLinks(filteredLinks);
  };

  const handleOnChange = (event) => {
    const keyword = event.target.value;
    setSearchTerm(keyword);
  };
  const handleReset = () => {
    console.log(originalLinks);
    reset();
  };
  return (
    <div className="searchbar">
      <TextField
        id="Search-Bar"
        label="Search for links"
        value={searchTerm}
        onChange={handleOnChange}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SearchBar;
