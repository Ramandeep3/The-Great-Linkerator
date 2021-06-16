import React from "react";
import { useState, useEffect } from "react";


const CardLink = () => {
  // useEffect(() => {
  //   const getLinks = async () => {
  //     try {
  //       const { linkCard } = await responseUser.json();
  //       setUsername(username);
  //       const responseRoutines = await fetch(
  //         `${REACT_APP_FITNESS_TRACKER_API_URL}api/users/${username}/routines`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       const routines = await responseRoutines.json();
  //       console.log(routines);
  //       setRoutines([...routines]);
  //       setId(routines.id);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUserAndSetRoutines();
  // });

  try {
    const response = await fetch(`${REACT_APP_LINKERATOR_API_URL}/api/links`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      });
    const data = response.json()

  } catch (err) {
    console.log(err)
  }

  return (
    <div className="CardLink">
      <h1>Potential Card <i>image</i></h1>
      <ul className="infoSection">
        <li>Name:<span> </span></li>
        <li>Link:<span> </span></li>
        <li>Comment:<span> </span></li>
        <li>Date Created:<span> </span></li>
        <li>Clicked: <span> </span></li>
        <li>Tags:<span> </span></li>
      </ul>
    </div>
  );
};

export default CardLink;
