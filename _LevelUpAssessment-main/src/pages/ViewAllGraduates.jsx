import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Link } from "react-router-dom";
import { getGraduates , removeGraduate} from "../api";
import { useRef } from "react";

import "../App.css";

const ViewAllGraduates = () => {
  const [graduates, setGraduate] = useState([]);
  const [grad, setGrad] = useState({});
  const modalRef = useRef();
  const modal = useRef();
  const modalElement = modalRef.current;

  if (modalElement) {
    modalElement.addEventListener("click", (e) => {
      if (e.target.contains(modal.current)) {
       Cancel();
      }
    });
  }

  useEffect(() => {
    getGraduates().then((res) => {
      setGraduate(res);
    });
  }, []);

  function viewModal(item) {
    document.querySelector("body").style.overflowY = "hidden";
    modalElement.style.display = "grid";

    setGrad(item);
  }

  let displayList = graduates.map((item) => (
    <tr key={item.graduateId}>
      <td className="md:py-4 py-2 md:px-8 px-4">{item.firstName}</td>
      <td className="md:py-4 py-2 md:px-8 px-4 md:block hidden">
        {item.emailAddress}
      </td>
      <td id="actions" className="md:py-4 py-2 md:px-8 px-4">
        <Link to={`/customer/${item.graduateId}`}>
          <button style={{ border: "1px solid var(--orange" }}>
            {" "}
            VIEW MODE
          </button>
        </Link>
        <Link to={`/update/${item.graduateId}`}>
          <button style={{ border: "1px solid var(--green" }}>UPDATE</button>
        </Link>

        <button
          onClick={() => {
            viewModal(item);
          }}
          style={{ border: "1px solid var(--red" }}
        >
          DELETE
        </button>
      </td>
    </tr>
  ));

  function Cancel()
  {
    document.querySelector("body").style.overflowY = "scroll";
    modalElement.style.display = "none";
  }

  function Delete()
  {
      removeGraduate(grad.graduateId);

      alert("successfully removed " + grad.graduateId);
       window.location.reload();
  }
  return (
    <div id="view_all" className="create">
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

      <section className="md:px-12 px-4 mt-6">
        <table className="w-full border border-white md:rounded-t-xl rounded-t-lg overflow-hidden">
          <thead className="bg-white uppercase micro-5 text-3xl">
            <tr>
              <th className="md:rounded-s-xl rounded-s-lg md:py-2 py-1 md:px-8 px-4">
                <div className="relative flex justify-start items-center">
                  Full Name
                  <img
                    src="../assets/icons/rocket_black.webp"
                    className="absolute right-0 h-2/3 md:block hidden"
                  />
                </div>
              </th>
              <th className="md:py-2 py-1 md:px-8 px-4 md:block hidden">
                <div className="relative flex justify-start items-center">
                  Contact Details
                  <img
                    src="../assets/icons/rocket_black.webp"
                    className="absolute right-0 h-2/3"
                  />
                </div>
              </th>
              <th className="md:rounded-e-xl rounded-e-lg md:py-2 py-1 md:px-8 px-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-white">{displayList}</tbody>
        </table>
      </section>

      <div ref={modalRef} className="modal_container">
        <div ref={modal} className="modal">
          <p>DELETE GRADAUTE</p>
          <h1>DELETE</h1>

          {grad ? (
            <h2>
              {" "}
              <span style={{ fontWeight: "bold", paddingRight: "0.5rem" }}>
                {grad.firstName}
              </span>{" "}
              {grad.lastName}
            </h2>
          ) : (
            <h2></h2>
          )}
          <div className="buttons">
            <button onClick={Delete} style={{borderColor: 'var(--red)', color: "var(--red"}}>DELETE </button>
            <button onClick={Cancel} style={{borderColor: 'var(--green)', color: "var(--green"}}>CANCEL </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllGraduates;
