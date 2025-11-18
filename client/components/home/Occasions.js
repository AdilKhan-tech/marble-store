import React from "react";
import Moregift from "./Moregift";

function Occasions() {
  return (
    <main>
      <div className="bg-pink">
        <div className="container">
          <h1 className="text-center occassion-text py-4">By Occassions</h1>
          <div className="d-flex overflow-auto pb-4 mt-4 ms-3">
            <div className="me-3">
            <a href="#"><img src="./assets/images/anniv.png" alt="Achievement" className="image-fluid"/></a>
              <p className="img-text">Achievement</p>
            </div>
            <div className="me-3">
              <a href="#"><img src="./assets/images/birthday.png" alt="Birthday" className="image-fluid"/></a>
              <p className="img-text">Birthday</p>
            </div>
            <div className="me-3">
              <a href="#"><img src="./assets/images/eidM.png" alt="Eid" className="image-fluid" /></a>
              <p className="img-text">Congratulation</p>
            </div>
            <div className="me-3">
              <a href="#"><img src="./assets/images/getwell.png" alt="Get Well" className="image-fluid"/></a>
              <p className="img-text">Get Well Soon</p>
            </div>
            <div className="me-3">
              <a href="#"><img src="./assets/images/gradu.png" alt="Graduation" className="image-fluid"/></a>
              <p className="img-text">Graduation</p>
            </div>
          </div>
          <div className="d-flex overflow-auto pb-4 mt-4 ms-5">
            <div className="me-3 ms-5">
              <a href="#"><img src="./assets/images/welcome.png" alt="Holidays" className="image-fluid"/></a>
              <p className="img-text">Holidays</p>
            </div>
            <div className="me-3 ms-5">
              <a href="#"><img src="./assets/images/newborn.png" alt="New Born" className="image-fluid"/></a>
              <p className="img-text">New Born</p>
            </div>
            <div className="me-3 ms-5">
              <a href="#"><img src="./assets/images/sport.png" alt="Sports" className="image-fluid"/></a>
              <p className="img-text">Sports</p>
            </div>
            <div className="me-3 ms-5">
              <a href="#"><img src="./assets/images/wedding.png" alt="Wedding" className="image-fluid"/></a>
              <p className="img-text">Wedding</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container text-center py-5 bg-light"
        style={{ backgroundImage: "url('./assets/images/Group.svg')",backgroundPosition: "right",
          backgroundRepeat: "no-repeat",backgroundPositionY: "12px",backgroundSize: "62px",}}>
        <h2 className="fw-bold fs-44">By Categories</h2>
        <div className="d-flex">
          <div className="product-card py-5 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold">Cakes</h4>
            <a href="#">
            <img className="mt-3" src="./assets/images/Mermaid-cake-1.webp" alt="image-fluid" style={{ width: "75%" }}/>
            </a>
          </div>
          <div className="product-card py-5 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold">Tasty Creation</h4>
            <a href="#">
            <img className="mt-3" src="./assets/images/77.webp" alt="image-fluid" style={{ width: "75%" }}/>
            </a>
          </div>
          <div className="product-card py-5 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold">Cookies</h4>
            <a href="#">
            <img className="mt-3" src="./assets/images/cookiespg1.png" alt="image-fluid" style={{ width: "75%" }}/>
            </a>
          </div>
          <div className="product-card py-5 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold">Marble Van</h4>
            <a href="#">
            <img className="mt-3" src="./assets/images/mvan.png" alt="image-fluid" style={{ width: "75%" }}/>
            </a>
          </div>
        </div>
      </div>

      <Moregift />
    </main>
  );
}

export default Occasions;
