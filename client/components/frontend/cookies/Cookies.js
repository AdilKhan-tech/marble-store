import React from "react";

function Cookies() {
  return (
    <main>
      <section className="cookies-section">
        <div className="">
          <img style={{ marginTop: "134px", position: "relative", width: "100%" }} src="./assets/images/cooki-box.jpg" alt="cake banner" />
        </div>
        <div className="d-flex justify-content-start align-items-center ms-3 mt-3">
          <span className="new-badge rounded-5 d-flex justify-content-center text-white ms-1 fs-5">1</span>
          <h5 className="fs-18 color-brown m-0 ms-1">Select cookie type</h5>
        </div>
        <div className="d-flex justify-content-between">
        <div className="d-flex justify-content-start mb-5">
        <div className="d-flex">
            <div className="cookies-card border-0 rounded-4">
              <img className="mt-3 cookies-img" src="./assets/images/Regular-Cookie@300x.png" alt="Card image" style={{marginInline:"50px"}}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-3 fs-24 fw-bold">Original</h6>
              </div>
            </div>
        </div>
        <div className="d-flex">
            <div className="cookies-card border-0 rounded-4">
              <img className="mt-3 cookies-img" src="./assets/images/Big-Bite-Cookie@300x.png" alt="Card image" style={{marginInline:"50px"}}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-3 fs-24 fw-bold">Original</h6>
              </div>
            </div>
        </div>
        <div className="d-flex">
            <div className="cookies-card border-0 rounded-4">
              <img className="mt-3 cookies-img" src="./assets/images/DIY Cookie@300x.png" alt="img-fluid" style={{marginInline:"50px"}}/>
              <div className="card-body align-items-center">
                <h6 className="text-center color-brown mt-3 fs-24 fw-bold">Original</h6>
              </div>
            </div>
        </div>
        </div>
        <div className="" style={{marginInlineEnd:"150px"}}>
            <div>
                <h3 className="fw-24 fw-bold">Summary</h3>
            </div>
            <div className="bg-brown-light p-3">
                <p>box <span className=""></span></p>
            </div>
        </div>
        </div>
      </section>
    </main>
  );
}

export default Cookies;
