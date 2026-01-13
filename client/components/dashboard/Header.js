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
                    <div className="dropdown-menu dropdown-menu-end p-2 border shadow mt-2">
                      <span className="fw-medium fs-16 text-secondary d-block p-2 border-bottom">Choose Language</span>
                      <div className="">
                        <a className="dropdown-item d-flex align-items-center py-2 px-3" href="#">
                          <img src="./assets/images/Dashboard/america.png" className="img-fluid rounded-circle me-2" alt="English" width="24" height="24"/>
                          <span className="ms-2 fs-16">English</span>
                        </a>
                        <a className="dropdown-item d-flex align-items-center py-2 px-3" href="#">
                          <img src="./assets/images/Dashboard/australia.png" className="img-fluid rounded-circle me-2" alt="Australia" width="24" height="24"/>
                          <span className="ms-2 fs-16">Australia</span>
                        </a>
                        <a className="dropdown-item d-flex align-items-center py-2 px-3" href="#">
                          <img src="./assets/images/Dashboard/flag.png" className="img-fluid rounded-circle me-2" alt="Spanish" width="24" height="24"/>
                          <span className="ms-2 fs-16">Spanish</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>

                <li>
                  <button className="p-0 bg-transparent border-0" onClick={toggleDarkMode}
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>
                    <i className={`bi ${isDarkMode ? 'bi-sun' : 'bi-moon'} fs-20`}></i></button>
                </li>

                <li>
                  <a className="border-0 text-dark p-0" href="#" aria-label="Calendar"><i className="bi bi-calendar fs-20"></i></a>
                </li>

                <div className="notifications language">
                  <button  className="border-0 p-0 position-relative bg-transparent" type="button" data-bs-toggle="dropdown" aria-label="Messages">
                    <i className="bi bi-envelope fs-20"></i>
                    <span className="badge bg-primary position-absolute top-0 start-100 translate-middle rounded-5">5</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end p-2 border shadow mt-2" style={{width: '320px', maxHeight: '420px', overflowY: 'auto'}}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-medium fs-16 text-secondary d-block p-2">Messages</span>
                      <span className="mt-2 text-primary d-block p-2 fs-14" role="button">Mark All As Read</span>
                    </div>
                    <div className="mt-2">
                      <a className="dropdown-item p-2 rounded-2 mb-2 d-flex align-items-start" href="#">
                        <img src="./assets/images/Dashboard/adil.png" className="img-fluid rounded-circle me-3" alt="Adil"/>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium fs-16">Adil</span>
                            <small className="text-muted fs-14">35 min ago</small>
                          </div>
                          <p className="text-secondary mb-0 fs-14 mt-1">Hey Adil Khan! How are you bro?</p>
                        </div>
                      </a>
                      <a className="dropdown-item p-2 rounded-2 mb-2 d-flex align-items-start" href="#">
                        <img src="./assets/images/Dashboard/islam.png" className="img-fluid rounded-circle me-3"/>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium fs-16">Islam</span>
                            <small className="text-muted fs-14">35 min ago</small>
                          </div>
                          <p className="text-secondary mb-0 fs-14 mt-1">Hey Adil Khan! How are you bro?</p>
                        </div>
                      </a>
                      <a className="dropdown-item p-2 rounded-2 mb-2 d-flex align-items-start" href="#">
                        <img src="./assets/images/Dashboard/waheed.png" className="img-fluid rounded-circle me-3" alt="Waheed"/>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium fs-16">Waheed</span>
                            <small className="text-muted fs-14">35 min ago</small>
                          </div>
                          <p className="text-secondary mb-0 fs-14 mt-1">Hey Adil Khan! How are you bro?</p>
                        </div>
                      </a>
                      <a className="dropdown-item p-2 rounded-2 mb-2 d-flex align-items-start" href="#">
                        <img src="./assets/images/Dashboard/nasir.png" className="img-fluid rounded-circle me-3" alt="Nasir"/>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium fs-16">Nasir</span>
                            <small className="text-muted fs-14">35 min ago</small>
                          </div>
                          <p className="text-secondary mb-0 fs-14 mt-1">Hey Adil Khan! How are you bro?</p>
                        </div>
                      </a>
                    </div>
                    <div className="text-center pt-2 border-top">
                      <a href="#" className="text-primary text-decoration-none fw-medium fs-16 d-block py-2">See All Messages</a>
                    </div>
                  </div>
                </div>

                <div className="notifications language">
                  <button 
                    className="border-0 p-0 position-relative bg-transparent" type="button" data-bs-toggle="dropdown" aria-label="Notifications">
                    <i className="bi bi-bell fs-20"></i>
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-5">5</span>
                  </button>
                  <div className="dropdown-menu dropdown-menu-end p-2 border shadow mt-2" style={{width: '320px', maxHeight: '420px', overflowY: 'auto'}}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="fw-medium fs-16 text-secondary d-block p-2">Notifications</span>
                      <span className="mt-2 text-primary d-block p-2 fs-14" role="button">Clear All</span>
                    </div>
                    <div className="mt-2">
                      <a className="dropdown-item p-2 rounded-2 mb-2 d-flex align-items-start" href="#">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          <i className="bi bi-chat-left-dots text-primary"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="">
                            <span className="fw-medium fs-16">You Have Request To Withdrawal</span>
                          </div>
                          <small className="text-muted fs-14">35 min ago</small>
                        </div>
                      </a>
                      <a className="dropdown-item p-2 rounded-2 mb-2 d-flex align-items-start" href="#">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          <i className="bi bi-person-plus text-primary"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium fs-16">A new user added to bakery</span>
                          </div>
                          <small className="text-muted fs-14">35 min ago</small>
                        </div>
                      </a>
                      <a className="dropdown-item p-2 rounded-2 mb-2 d-flex align-items-start" href="#">
                        <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{width: '40px', height: '40px'}}>
                          <i className="bi bi-bell text-primary"></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <span className="fw-medium fs-16">Marble is Owned by CodEnterprise</span>
                          </div>
                          <small className="text-muted fs-14">35 min ago</small>
                        </div>
                      </a>
                    </div>
                    <div className="text-center pt-2 border-top">
                      <a href="#" className="text-primary text-decoration-none fw-medium fs-16 d-block py-2">See All Notifications</a>
                    </div>
                  </div>
                </div>

                <li className="">
                  <div className="dropdown">
                    <button  className="d-flex align-items-center border-0 bg-transparent p-0" type="button"
                      data-bs-toggle="dropdown" aria-label="User Profile">
                      <div className="position-relative">
                        <img  src="./assets/images/Dashboard/adil.png" className="rounded-5 img-fluid"/>
                        <span className="bg-success border border-2 border-white rounded-circle position-absolute end-0 bottom-0"
                          style={{ width: "10px", height: "10px" }}></span>
                      </div>
                      <i className="bi bi-chevron-down ms-1 text-muted"></i>
                    </button>

                    <div className="dropdown-menu dropdown-menu-end mt-2 p-0">
                      <div className="d-flex align-items-center info p-3 border-bottom">
                        <img src="./assets/images/Dashboard/adil.png" className="rounded-5 img-fluid me-3"/>
                        <div className="">
                          <h6 className="fs-18 mb-0">Adil Khan</h6>
                          <span className="text-muted small">Admin</span>
                        </div>
                      </div>
                      <ul className="admin-link list-unstyled mb-0 py-2">
                        <li>
                          <a className="dropdown-item d-flex align-items-center py-2 px-3" href="#">
                            <i className="bi bi-person me-2"></i><span className="fs-14">My Profile</span></a>
                        </li>
                        <li>
                          <a className="dropdown-item d-flex align-items-center py-2 px-3" href="#">
                            <i className="bi bi-gear me-2"></i><span className="fs-14">Settings</span></a>
                        </li>
                        <li>
                          <a className="dropdown-item d-flex align-items-center py-2 px-3" href="#">
                            <i className="bi bi-info-circle me-2"></i><span className="fs-14">Support</span></a>
                        </li>
                        <li>
                          <a className="dropdown-item d-flex align-items-center py-2 px-3" href="#"><i className="bi bi-box-arrow-right me-2 fw-bold"></i>
                            <span className="fs-14">Logout</span>
                          </a>
                        </li>
                      </ul>
                    </div>
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