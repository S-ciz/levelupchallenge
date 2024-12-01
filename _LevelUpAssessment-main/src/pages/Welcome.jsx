import React from "react";

import "../App.css";
import Navbar from "../components/navbar";

import softserve from "../logos/softserve-logo.webp";
import leveUp from "../logos/time-to-level-up.webp";
import space from "../illustrations/cover.webp"
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div>
      <Navbar />
      <div className="welcome">
        <header className="softserve">
          <img alt="softserve" src={softserve} />
        </header>

        <section>
          <div className="text"> 
            <img src={leveUp}/>

           <Link to="/viewall">  <button>VIEW GRADUATES</button> </Link>

            <ul>
                <li style={{background: "var(--blue)"}}></li>
                <li style={{background: "var(--green)"}}></li>
                <li style={{background: "var(--orange)"}}></li>
                <li style={{background: "var(--red)"}}></li>
            </ul>
          </div>

          <div className="img"> 
          <img alt="space" src={space}/>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Welcome;
