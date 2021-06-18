import React from "react";
import "./CardLink.css";
import { linksWithTags } from "../api";
import img from "../../src/assests/grid-globe-link.png";

const CardLink = ({ links, setLinks }) => {
  const handleTags = async (tagName) => {
    try {
      const tagReturn = await linksWithTags(tagName);
      setLinks(tagReturn);
    } catch (err) {
      console.err(err);
    }
  };
  return links.map((link, index) => {
    return (
      <div className="CardLink" key={index}>
        {/* <h1>Potential Card <i>image</i></h1> */}
        <img src={img} alt="stock image" id="card-title-img" />
        <div className="infoSection">
          <p>{link.name}</p>
          <p>
            Link:
            <a
              href="true"
              onClick={() => {
                window.open(link.link);
              }}
            >
              {link.link}
            </a>
          </p>
          <p>Comment: {link.comment} </p>
          <p>
            Date Created:<span> {link.dateshared} </span>
          </p>
          <p>
            Clicked: <span> {link.count} </span>
          </p>
          <p>
            Tags:
            {link.tags.map((tags, index) => {
              return (
                <div key={index}>
                  <button
                    className="tags"
                    onClick={() => {
                      handleTags(tags.name);
                    }}
                  >
                    {tags.name}
                  </button>
                </div>
              );
            })}
          </p>
        </div>
      </div>
    );
  });
};

export default CardLink;
