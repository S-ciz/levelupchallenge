import React from "react";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { getGraduate, putGraduate } from "../api";

import "../App.css";

const UpdateGraduate = () => {
  let [grad, setGrad] = useState({});
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEMail] = useState("");
  const [birth, setBirth] = useState("");
  const [id] = useState(window.location.pathname.split("/")[2]);

  useEffect(() => {
    getGraduate(id).then((res) => {
      setGrad(res);
    });
  }, []);

  function updateForm(e) {
    //prevent defaults
    e.preventDefault();

    let valid =
      name.length > 0 ||
      surname.length > 0 ||
      phone.length > 0 ||
      email.length > 0 ||
      birth.length > 0;
    if (valid) {

      let d = new Date();
      let strDate = "";
      let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
      strDate += d.getFullYear() + "-" + d.getMonth() + "-" + date;

      let objGrad = {
        "firstName": name,
        "lastName": surname,
        "emailAddress": email,
        "dateOfBirth": birth,
        "dateEdited": strDate
      }
      //check which values are there

      for(let item in objGrad)
      { 
        if( objGrad[item] != "") 
        {
           grad[item] = objGrad[item];
        }

      }
    
     let res =  putGraduate(grad.graduateId, grad);
     console.log(res.ok)
     

      alert("Successfully updated gradaute");

      //clear all fields
      setName("");
      setSurname("");
      setEMail("");
      setBirth("");
      setPhone("");

    } else {
      window.alert("No changes made!");
    }

  
  }

  return (
    <div className="create">
      <Navbar />

      <header>
        <aside>
          <h2>LEVEL UP 2024</h2>
          <h1>UPDATE GRADUATE </h1>
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

      <form onSubmit={updateForm} id="update">
        <div>
          <label htmlFor="Name">
            Name{" "}
            <span style={{ color: "var(--white)" }}> ({grad.firstName} ) </span>
          </label>

          <input
            value={name}
            onInput={(e) => setName(e.target.value)}
            type="text"
          />
          <label htmlFor="Name">
            Phone number{" "}
            <span style={{ color: "var(--white)" }}> ({grad.firstName} ) </span>
          </label>
          <input
            value={phone}
            onInput={(e) => setPhone(e.target.value)}
            type="text"
          />
          <label htmlFor="Name">
            Date of birth{" "}
            <span style={{ color: "var(--white)" }}>
              {" "}
              ({grad.dateOfBirth} ){" "}
            </span>
          </label>
          <input
            value={birth}
            onInput={(e) => setBirth(e.target.value)}
            type="text"
          />
        </div>

        <div>
          <label htmlFor="Name">
            Surname{" "}
            <span style={{ color: "var(--white)" }}> ({grad.lastName} ) </span>
          </label>
          <input
            value={surname}
            onInput={(e) => setSurname(e.target.value)}
            type="text"
          />

          <label htmlFor="Name">
            Email Address{" "}
            <span style={{ color: "var(--white)" }}>
              {" "}
              ({grad.emailAddress} ){" "}
            </span>{" "}
          </label>
          <input
            value={email}
            onInput={(e) => {
              setEMail(e.target.value);
            }}
            type="text"
          />

          <button>UPDATE GRADUATE</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateGraduate;
