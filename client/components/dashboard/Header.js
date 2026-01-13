"use client";
import React, { useState } from "react";

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="header mb-0 p-2" id="header">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="left-header-content">
              <h2 className="fs-20">Welcome back, Admin!</h2>
            </div>
          </div>
          <div className="col-md-6">
            <div className="mt-3 mt-md-0">
              <ul className="d-flex align-items-center justify-content-center justify-content-md-end ps-0 mb-0 list-unstyled gap-3 gap-md-4"> 
                <li className="language-item">
                  <div className="notifications language">
                    <button className="border-0 p-0 position-relative bg-transparent d-flex align-items-center"
                      type="button"  data-bs-toggle="dropdown" aria-label="Language Selector">
                      <i className="bi bi-translate fs-20"></i>
                      <i className="bi bi-chevron-down ms-1 small"></i>
                    </button>
                  </div>
                </li>

                <li>
                  <button className="p-0 bg-transparent border-0" onClick={toggleDarkMode}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'} fs-20`}></i></button>
                </li>

                <li>
                  <a className="border-0 text-dark p-0"><i className="bi bi-calendar fs-20"></i></a>
                </li>

                <div className="notifications language">
                  <button  className="border-0 p-0 position-relative bg-transparent">
                    <i className="bi bi-envelope fs-20"></i>
                    <span className="badge bg-primary position-absolute top-0 start-100 translate-middle rounded-5">5</span>
                  </button>
                </div>

                <div className="notifications language">
                  <button 
                    className="border-0 p-0 position-relative bg-transparent">
                    <i className="bi bi-bell fs-20"></i>
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-5">5</span>
                  </button>
                </div>

                <li className="">
                  <div className="dropdown">
                    <button  className="d-flex align-items-center border-0 bg-transparent p-0">
                      <div className="position-relative">
                        <i className="bi bi-person-circle rounded-5 img-fluid"/>
                        <span className="bg-success border border-2 border-white rounded-circle position-absolute end-0 bottom-0"
                          style={{ width: "10px", height: "10px" }}></span>
                      </div>
                      <i className="bi bi-chevron-down ms-1 text-muted"></i>
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;