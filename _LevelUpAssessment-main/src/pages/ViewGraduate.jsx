import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";

import { getGraduate } from "../api";

import "../App.css";

const ViewGraduate = () => {
  let [path] = useState(window.location.pathname);
  let [grad, setGrad] = useState({});

  let id = path.split("/")[2];
  useEffect(() => {
    getGraduate(id).then((res) => {
      setGrad(res);
    });
  }, []);

  console.log(grad);

  return (
    <div className="create">
      <Navbar />

      <header>
        <aside>
          <h2>LEVEL UP 2024</h2>
          <h1>VIEW GRADUATE DETAILS </h1>
        </aside>
        <aside>
          <ul>
            <li style={{ background: "var(--red" }}></li>
            <li style={{ background: "var(--orange" }}></li>
            <li style={{ background: "var(--green" }}></li>
            <li style={{ background: "var(--blue" }}></li>
          </ul>
        </aside>
      </header>

      {grad ? (
        <main>
          <h1 className="name">
            {" "}
            <span style={{ fontWeight: "bold" }}>{grad.firstName}</span>{" "}
            {grad.lastName}
          </h1>

          <div className="credentials">
            <div className="first_row">
              <span>
                <p>Phone number</p>
                <h2>277 32342424</h2>
              </span>
              <span className="span">
                <p>EMAIL ADDRESS </p>
                <h2>{grad.emailAddress} </h2>
              </span>
              <span className="span">
                <p>AGE </p>
                <h2>{grad.age}</h2>
              </span>
            </div>
            <div>
              <span>
                <p>DATE CREATED</p>
                <h2>{grad.dateCreated}</h2>
              </span>
              <span className="span">
                <p>LAST EDITED </p>
                <h2>{grad.dateEdited}</h2>
              </span>
            </div>
          </div>
        </main>
      ) : (
        "No graduate with above id:  " + id
      )}
    </div>
  );
};

export default ViewGraduate;
