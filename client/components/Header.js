import React from "react";

function Header() {
  return (
    <header>
      <section className="bg-sky header" id="header">
        <div className="container py-1 ps-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
            </div>
            <div>
              <a href="./about" className="text-decoration-none text-white ms-4">About Us</a>
              <a href="./contact" className="text-decoration-none text-white ms-4">Contact</a>
              <a href="./contact" className="text-decoration-none text-white ms-4">FAQ</a>
              <a href="#" className="text-decoration-none text-white ms-4" data-bs-toggle="dropdown">
                English <i className="bi bi-chevron-down ms-2"></i>
                </a>
                <ul className="dropdown-menu">
                <li className="dropdown-item">English</li>
                <li className="dropdown-item">Arabic</li>
                </ul>

            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-md-2">
            <a href="./Landing">
              <img src="./assets/images/Logo.png" className="img-fluid ms-3" alt="Logo"/>
            </a>
            </div>
            <div className="col-md-8 text-center">
              <nav className="navbar navbar-expand-lg py-0">
                <div className="container-fluid">
                  <div>
                    <ul className="navbar-nav mx-auto">
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./Landing" role="button">HOME</a></li>
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./occasions" role="button">OCCASIONS</a></li>
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./cakes" role="button">CAKES</a></li>
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./icecreams" role="button">ICE CREAMS</a></li>
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./cookies" role="button">COOKIES</a></li>
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./diy" role="button">DIY</a></li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div className="col-2 text-end">
              <div className="d-flex justify-content-end align-items-center">
                <div className="d-flex justify-content-end align-items-center mt-3" role="button">
                <a className="text-decoration-none d-flex justify-content-end align-items-center"
                  data-bs-toggle="modal" data-bs-target="#myModal" role="button">
                  <img src="./assets/images/user.png" alt="user" />
                  <p className="fs-18 text-white m-0 ms-1">Login</p>
                </a>

                </div>
                <div className="d-flex justify-content-end align-items-center ms-3 mt-3" role="button">
                  <img src="./assets/images/cart.png" alt="cart" />
                  <p className="fs-18 text-white m-0 ms-1">Cart<span className="badge bg-primary rounded-5 ms-1">0</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="modal" id="myModal">
         <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">

              <div className="modal-header border-0 d-flex justify-content-center">
              <img src="./assets/images/Logo-login.png" className="img-fluid" alt="Logo" style={{width: "150px"}}/>
              <button
                type="button"
                className="btn-close end-0 me-3 mb-5"
                data-bs-dismiss="modal">
              </button>
            </div>
            <p className="text-center fw-bold">Let's get started</p>
             <div className="mb-3 d-flex p-0 justify-content-center gap-4 bg-sky w-75 rounded-5 mx-auto">
                <button className="btn btn-primary fs-18 d-flex btn-lg" type="button">
                    <span className="">Log in</span>
                </button>
                <button className="btn btn-primary fs-18 d-flex btn-lg" type="button">
                    <span className="">Sign up</span>
                </button>
            </div>
            <div className="d-flex justify-content-between gap-0 ">
            <select className="form-select form-select-lg mb-3 w-25 mx-auto fs-18 rounded-5">
                <option>+922</option>
            </select>
            <input type="tel" className="form-control form-control-lg mb-3 w-75 mx-auto fs-18 rounded-5" placeholder="Enter Your Phone Number" />
            </div>
                <button type="button" className="btn btn-lg btn-primary mx-auto rounded-5 w-75">Continue</button>

            </div>
          </div>
        </div>
        </section>
    </header>
  );
}

export default Header;
