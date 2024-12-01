import React, { useState } from "react";
import Navbar from "../components/navbar";

import "../App.css";

import { postGraduate } from "../api";

const CreateGraduate = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date_of_birth, setBirth] = useState("");

  function validateDate(strDate) {
    let age = calcAge(strDate);
    if (age <= 0) {
      alert("Invalid year of birth");
      return "";
    }

    return date_of_birth;
  }

  function calcAge(strDate) {
    let year = parseInt(strDate.split("-")[0]);
    let currDate = new Date();
    let currYear = currDate.getFullYear();
    return currYear - year;
  }
  function submitForm(e) {
    //prevent default action
    e.preventDefault();

    setBirth(validateDate(date_of_birth));

    let valid =
      name.length > 0 &&
      phone.length == 10 &&
      surname.length > 0 &&
      phone.length > 0 &&
      email.length > 0 &&
      date_of_birth.length > 0;

    let d = new Date();
    let strDate = "";
    let date = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    strDate += d.getFullYear() + "-" + d.getMonth() + "-" + date;

    if (valid) {
      let grad = {
        firstName: name,
        lastName: surname,
        userName: "username",
        emailAddress: email,
        dateOfBirth: date_of_birth,
        age: calcAge(date_of_birth),
        cell: phone,
        dateCreated: strDate,
        dateEdited: strDate,
        isDeleted: false,
      };

      postGraduate(grad);

      window.alert("successfully added graduate");
      console.log(date_of_birth);
    } else {
      window.alert("Please fill out all fields");
    }
  }

  return (
    <div className="create">
      <Navbar />

      <header>
        <aside>
          <h2>LEVEL UP 2024</h2>
          <h1>CREATE GRADUATE </h1>
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
      <form onSubmit={submitForm} id="create">
        <div>
          <label htmlFor="Name">Name</label>
          <input onInput={(e) => setName(e.target.value)} type="text" />
          <label htmlFor="phone">Phone number</label>
          <input onInput={(e) => setPhone(e.target.value)} type="number" />
          <label htmlFor="date">Date of birth</label>
          <input onInput={(e) => setBirth(e.target.value)} type="date" />
        </div>

        <div>
          <label htmlFor="surname">Surname</label>
          <input onInput={(e) => setSurname(e.target.value)} type="text" />

          <label htmlFor="email">Email Address</label>
          <input onInput={(e) => setEmail(e.target.value)} type="email" />

          <button>ADD NEW GRADUATE</button>
        </div>
      </form>
    </div>
  );
};

export default CreateGraduate;
