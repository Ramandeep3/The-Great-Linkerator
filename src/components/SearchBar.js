
import React from "react"
import { TextField } from "@material-ui/core";
import{useState} from "react";
const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="SeachBar">

      <TextField id="Search-Bar" label="Serch for links"
      value={searchTerm}
      onChange={(event)=>{
          setSearchTerm(event.target.value);
        //   <button>Search</button>
      }}
      />
    </div>
  );
};

export default SearchBar;