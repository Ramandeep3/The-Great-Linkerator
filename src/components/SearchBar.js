import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./SearchBar.css";
import CreateLinkForm from "./CreateLinkForm";

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
    reset();
  };

  const handleSort = () => {
    let linksCounter = [...links].sort(function (a, b) {
      return parseInt(b.count) - parseInt(a.count);
    });

    setLinks(linksCounter);
  };

  return (
    <div className="searchbar">
      <Form inline>
        <Form.Control
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={searchTerm}
          onChange={handleOnChange}
        />
        <Button
          bsClass="custom-btn"
          className="search-button"
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button className="reset-button" onClick={handleReset}>
          Reset
        </Button>
        <Button className="popular-button" onClick={handleSort}>
          Popular Links
        </Button>
        <CreateLinkForm />
      </Form>
    </div>
  );
};

export default SearchBar;
