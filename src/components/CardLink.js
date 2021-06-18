import React from "react";
import "./CardLink.css";
import img from "../../src/assests/grid-globe-link.png";

const CardLink = ({ links, setLinks }) => {
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
            <span>
              {" "}
              {link.tags.map((tag) => (
                <span key={tag.id}>{" " + tag.name}</span>
              ))}
            </span>
          </p>
        </div>
      </div>
    );
  });
};

export default CardLink;
