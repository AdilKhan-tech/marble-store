import React from "react";

function Occasions() {
  return (
    <main>
      <div className="bg-pink-lite">
        <div className="container">
          <h1 className="text-center occassion-text py-4">By Occassions</h1>
          <div className="d-flex overflow-auto pb-4 mt-4 ms-3">
            <div className="me-3">
              <img src="./assets/images/anniv.png" alt="Achievement" className="image-fluid"/>
              <p className="img-text">Achievement</p>
            </div>
            <div className="me-3">
              <img src="./assets/images/birthday.png" alt="Birthday" className="image-fluid"/>
              <p className="img-text">Birthday</p>
            </div>
            <div className="me-3">
              <img src="./assets/images/eidM.png" alt="Eid" className="image-fluid" />
              <p className="img-text">Congratulation</p>
            </div>
            <div className="me-3">
              <img src="./assets/images/getwell.png" alt="Get Well" className="image-fluid"/>
              <p className="img-text">Get Well Soon</p>
            </div>
            <div className="me-3">
              <img src="./assets/images/gradu.png" alt="Graduation" className="image-fluid"/>
              <p className="img-text">Graduation</p>
            </div>
          </div>
          <div className="d-flex overflow-auto pb-4 mt-4 ms-5">
            <div className="me-3 ms-5">
              <img src="./assets/images/welcome.png" alt="Holidays" className="image-fluid"/>
              <p className="img-text">Holidays</p>
            </div>
            <div className="me-3 ms-5">
              <img src="./assets/images/newborn.png" alt="New Born" className="image-fluid"/>
              <p className="img-text">New Born</p>
            </div>
            <div className="me-3 ms-5">
              <img src="./assets/images/sport.png" alt="Sports" className="image-fluid"/>
              <p className="img-text">Sports</p>
            </div>
            <div className="me-3 ms-5">
              <img src="./assets/images/wedding.png" alt="Wedding" className="image-fluid"/>
              <p className="img-text">Wedding</p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container text-center py-5 bg-light"
        style={{ backgroundImage: "url('./assets/images/Group.svg')",backgroundPosition: "right",
          backgroundRepeat: "no-repeat",backgroundPositionY: "12px",backgroundSize: "62px",}}>
        <h2 className="fw-bold fs-44 font-brandon-bold f-30ar">By Categories</h2>
        <div className="d-flex">
          <div className="product-card py-3 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold font-brandon-bold">Cakes</h4>
            <img className="mt-3" src="./assets/images/Mermaid-cake-1.webp" alt="image-fluid" style={{ width: "75%" }}/>
            <div className="card-body align-items-center"></div>
          </div>
          <div className="product-card py-3 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold font-brandon-bold">Tasty Creation</h4>
            <img className="mt-3" src="./assets/images/77.webp" alt="image-fluid" style={{ width: "75%" }}/>
            <div className="card-body align-items-center"></div>
          </div>
          <div className="product-card py-3 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold font-brandon-bold">Cookies</h4>
            <img className="mt-3" src="./assets/images/cookiespg1.png" alt="image-fluid" style={{ width: "75%" }}/>
            <div className="card-body align-items-center"></div>
          </div>
          <div className="product-card py-3 border-0 rounded-4">
            <h4 className="text-center fs-35 fw-bold font-brandon-bold">Marble Van</h4>
            <img className="mt-3" src="./assets/images/mvan.png" alt="image-fluid" style={{ width: "75%" }}/>
            <div className="card-body align-items-center"></div>
          </div>
        </div>
      </div>
      <div>
        <div className="row w-100 mx-auto align-items-center" style={{backgroundColor:"#ffc107d0"}}>
          <div className="col-md-5 px-40 pe-0 arpe">
            <div>
              <h2 className="font-brandon-black fs-72 text-brown more-gift-mob">More gift options</h2>
              <p className="fs-3 fw-medium text-brown py-4">Explore more ice cream creations & surprise your belovedwith personalized messages</p>
              <a href="#">
                <button className="btn btn-primary rounded-5 px-md-4 px-2 py-1 pt-2" type="submit">VIEW ICE CREAM COLLECTIONS</button>
              </a>
            </div>
          </div>
          <div className="col-md-7 p-0">
            <img src="./assets/images/ice2.webp" className="w-100" alt="cookies box"/>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Occasions;
