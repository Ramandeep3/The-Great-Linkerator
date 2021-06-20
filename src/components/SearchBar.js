import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CreateLinkForm from "./CreateLinkForm";
import MaterialIcon from "material-icons-react";
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import "./SearchBar.css";

const SearchBar = ({ links, setLinks, reset }) => {
  const [searchTerm, setSearchTerm] = useState("");
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
    <div className="inputContainer">
      <Form inline>
        <div className="searchbar">
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
          <DoubleArrowIcon />
          </Button>
        </div>
        <div className="filterBtns Container">
          <Button className="reset-buttonZ" onClick={handleReset}>
            <MaterialIcon icon="restart_alt" size={40} color="black" />

          
          </Button>
          <Button className="popular-buttonZ" onClick={handleSort}>
            Trending <TrendingUpIcon fontSize='large' transform='translate' color="rgb(106 209 175 / 86%)" />
          </Button>
          <CreateLinkForm />
        </div>
      </Form>
    </div>
  );
};

export default SearchBar;