"use client"
import React from "react";
import { useEffect, useState } from 'react';
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import getApiKeyByDomain from "@/configs/getApiKey";

function Header() {

  const searchParams = useSearchParams();
  const apiKey = getApiKeyByDomain();

  const [phoneNnumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    if (!phoneNnumber || !password) {
        setErrors(["Please fill in all fields"]);
        setLoading(false);
        return;
    }
    try {
          const result = await signIn("credentials", {
            phone_number: phoneNnumber,
            password,
            apiKey,
            redirect: false,
          });
     
          if (result?.error) {
            setErrors(
              result.error === "CredentialsSignin"
                ? "Invalid phone number or password"
                : "Login failed. Please try again."
            );
          } else {
            // router.push(callbackUrl);
            window.location.href = callbackUrl
          }
        } catch (err) {
            setErrors("An unexpected error occurred. Please try again.");
          console.error("Login error:", err);
        } finally {
            setLoading(false);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      setLoading(false);
    }
  }, [errors]);

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
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" data-bs-toggle="modal" data-bs-target="#occassionModal" role="button">OCCASIONS</a></li>
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./cakes" role="button">CAKES</a></li>
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./icecreams" role="button">ICE CREAMS</a></li>
                      <li className="nav-item"><a className="nav-link mt-3 fs-18" href="./cookies" role="button">Cookies</a></li>
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
                  <p className="fs-15 text-white m-0 ms-1">Login</p>
                </a>

                </div>
                <div className="d-flex justify-content-end align-items-center ms-3 mt-3" role="button">
                  <img src="./assets/images/cart.png" alt="cart" />
                  <p className="fs-15 text-white m-0 ms-1">Cart<span className="badge bg-primary rounded-5 ms-1">0</span></p>
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
                <img src="./assets/images/Logo-login.png" className="img-fluid" alt="Logo" style={{width: "150px", marginInlineStart:"160px"}}/>
                <button type="button" className="btn-close end-0 me-3 mb-5" data-bs-dismiss="modal"></button>
              </div>
              <p className="text-center fw-bold">Let's get started</p>
              <div className="mb-3 d-flex btn-group p-0 justify-content-center gap-4 bg-outline-primary w-75 rounded-5 mx-auto">
                  <div className="bg-blue m-1 mx-auto rounded-5 w-75 text-center p-3" role="button" data-bs-toggle="modal" data-bs-target="#myModal">
                      <span className="text-white fw-bold">Log in</span>
                  </div>
                  <div className="bg-blue m-1 mx-auto rounded-5 w-75 text-center p-3" role="button" data-bs-toggle="modal" data-bs-target="#signinModal">
                      <span className="text-white fw-bold" >Sign up</span>
                  </div>
              </div>
              <div className="d-flex justify-content-between gap-0 mt-3">
                <input 
                  type="tel" 
                  className="form-control form-control-lg mb-2 w-75 mx-auto fs-18 rounded-5" 
                  placeholder="Enter Your Phone Number"
                  value={phoneNnumber}
                  onChange={(e) => setPhoneNumber(e.target.value)} 
                />
              </div>
              <input 
                type="password" 
                className="form-control form-control-lg mb-3 w-75 mx-auto fs-18 rounded-5" 
                placeholder="Enter Your Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="bg-blue mt-3 mx-auto rounded-5 w-75 text-center p-3 text-white fw-bold"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section>
      <div className="modal" id="signinModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="occassion-content modal-content">

            <div className="modal-header border-0 d-flex justify-content-center">
            <img src="./assets/images/Logo-login.png" className="img-fluid" alt="Logo" style={{width: "150px", marginInlineStart:"160px"}}/>
            <button type="button" className="btn-close end-0 me-3 mb-5" data-bs-dismiss="modal"></button>
          </div>
          <p className="text-center fw-bold">Let's get started</p>
            <div className="mb-3 d-flex btn-group p-0 justify-content-center gap-4 bg-outline-primary w-75 rounded-5 mx-auto">
              <div className="bg-blue m-1 mx-auto rounded-5 w-75 text-center p-3" role="button" data-bs-toggle="modal" data-bs-target="#myModal">
                  <span className="text-white fw-bold">Log in</span>
              </div>
              <div className="bg-blue m-1 mx-auto rounded-5 w-75 text-center p-3" role="button" data-bs-toggle="modal" data-bs-target="#signinModal">
                  <span className="text-white fw-bold" >Sign up</span>
              </div>
          </div>
          <input type="text" className="form-control form-control-lg w-75 mx-auto fs-18 rounded-5 mt-3" placeholder="Enter Your Name" />
          <div className="d-flex justify-content-between gap-0 mt-2">
          <input type="tel" className="form-control form-control-lg mb-2 w-75 mx-auto fs-18 rounded-5" placeholder="Enter Your Phone Number" />
          </div>
          <input type="password" className="form-control form-control-lg mb-3 w-75 mx-auto fs-18 rounded-5" placeholder="Enter Your Password" />
              <div role="button" className="bg-blue mt-3 mx-auto rounded-5 w-75 text-center p-3 text-white fw-bold">Continue</div>

          </div>
        </div>
      </div>
      </section>
      <section>
      <div className="modal" id="occassionModal">
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-1">
              <div className="modal-header border-0 d-flex justify-content-center">
            <h1 className="color-brown fw-bold mt-4" style={{marginInlineStart:"290px"}}>Occasions</h1>
            <button type="button" className="btn-close end-0 me-3 mb-3" data-bs-dismiss="modal"></button>
          </div>
          <p className="text-center fw-bold color-brown">Choose your special case</p>
          <div className="d-flex justify-content-between gap-0">
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/anniv.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Achievement</h6>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/birthday.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Birthday</h6>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/eidM.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Congratulation</h6>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/getwell.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Get well Soon</h6>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/gradu.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Graduation</h6>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/welcome.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Holidays</h6>
              </div>
            </div>
          </div>
          </div>
          <div className="d-flex mt-4 gap-3">
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/welcome.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Holidays</h6>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/welcome.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Holidays</h6>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="occassion-card border-0 rounded-4">
              <img className="mt-3 occassion-img" src="./assets/images/welcome.png" alt="Card image" style={{ marginInline: "40px" }}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-2 fs-24 fw-bold">Holidays</h6>
              </div>
            </div>
          </div>
          </div>
          <div>
            <hr />
            <div className="d-flex justify-content-between mb-3">
              <div role="button" className="mx-2 p-2 rounded-3 bg-purple-two fw-bold text-dark">Clear Section</div>
              <div role="button" className="mx-2 p-2 rounded-5 bg-blue fw-bold bg-purple-two text-white">Apply</div>
            </div>
          </div>
          </div>
        </div>
      </div>
      </section>
    </header>
  );
}

export default Header;
