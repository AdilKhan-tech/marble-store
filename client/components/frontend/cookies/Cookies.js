import React from "react";

function Cookies() {
  return (
    <main>
      <section className="cookies-section bg-light">
        <div className="">
          <img style={{ marginTop: "134px", position: "relative", width: "100%" }} src="./assets/images/cooki-box.jpg" alt="cake banner"/>
        </div>
        <div className="d-flex justify-content-start align-items-center ms-3 mt-3">
          <span className="new-badge rounded-5 d-flex justify-content-center text-white ms-1 fs-5">
            1
          </span>
          <h5 className="fs-18 color-brown m-0 ms-1">Select cookie type</h5>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex justify-content-start mb-5">
            <div className="d-flex">
              <div className="cookies-card border-0 rounded-4">
                <img className="mt-3 cookies-img" src="./assets/images/Regular-Cookie@300x.png" alt="Card image" style={{ marginInline: "50px" }}/>
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-3 fs-24 fw-bold">Original</h6>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="cookies-card border-0 rounded-4">
                <img className="mt-3 cookies-img" src="./assets/images/Big-Bite-Cookie@300x.png" alt="Card image" style={{ marginInline: "50px" }} />
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-3 fs-24 fw-bold">Big Bite</h6>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <div className="cookies-card border-0 rounded-4">
                <a href="./diy">
                  <img className="mt-3 cookies-img" src="./assets/images/DIY Cookie@300x.png" alt="img-fluid" style={{ marginInline: "50px" }}/>
                </a>
                <div className="card-body align-items-center">
                  <h6 className="text-center color-brown mt-3 fs-24 fw-bold">DIY</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="" style={{ marginInlineEnd: "100px" }}>
            <div><h3 className="fw-24 fw-bold">Summary</h3></div>
            <div className="summary-box p-3 mb-5 rounded-4">
              <div className="line-row mb-4">
                <span className="fs-18 color-brown fw-bold">Box type</span><span className="dots"></span><span className="color-brown">Original</span>
              </div>
              <div className="line-row mb-4">
              <span className="fs-18 color-brown fw-bold">Box size</span><span className="dots"></span>
              </div>
              <div className="line-row mb-4">
                <span className="fs-18 color-brown fw-bold">Subtotal</span><span className="dots"></span><span className="color-brown">0 SAR</span>
              </div>
              <button className="btn btn-secondary rounded-5 mt-3 w-100 p-1 fs-5">Add to cart</button>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center ms-3 mt-3">
          <span className="new-badge rounded-5 d-flex justify-content-center text-white ms-1 fs-5">2</span>
          <h5 className="fs-18 color-brown m-0 ms-1"> Select box size </h5>
        </div>
        <div className="d-flex justify-content-start gap-3" style={{ marginInline: "50px" }}>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/dozen_cookie_box.jpg" alt="Card image" style={{ width: "60%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Dozen Regular Cookie box</h4>
              <p className="text-center fs-15">12 pieces</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">70</p>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/half_dozen_cookie_box.jpg" alt="Card image" style={{ width: "60%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Half Dozen Regular Cookie box</h4>
              <p className="text-center fs-15">6 pieces</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 39</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center ms-3 mt-3">
          <span className="new-badge rounded-5 d-flex justify-content-center text-white ms-1 fs-5">3</span>
          <h5 className="fs-18 color-brown m-0 ms-1">Select up to 6 cookies</h5>
        </div>
        <div className="d-flex justify-content-start gap-3" style={{ marginInline: "50px" }}>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button" >
            <img className="mt-3 rounded-4" src="./assets/images/double2x.png" alt="Card image" style={{ width: "60%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Double Fudge</h4>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/mm2x.png" alt="Card image" style={{ width: "60%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">M&M'S</h4>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/original.png" alt="Card image" style={{ width: "70%" }}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Original</h4>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-start mt-5" style={{ marginInline: "50px" }}>
          <h5 className="mt-5">DIY Product</h5>
        </div>
        <div className="mt-5 d-flex overflow-auto pb-4 ms-3 gap-3">
          <div className="cakes-card card border-0 w-25 rounded-4 align-items-center">
            <img className="w-75 mt-3 rounded-4" src="./assets/images/HB-pint-250x250.png" alt="Card image"/>
            <div className="card-body align-items-center">
              <h6 className="text-center color-brown fs-24 fw-bold">Happiness Box Pint</h6>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 246</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit">Add to Cart</button>
            </div>
          </div>

          <div className="cakes-card card border-0 w-25 rounded-4 align-items-center">
            <img className="w-75 mt-3 rounded-4" src="./assets/images/HB-bigdipper-250x250.png" alt="Card image"/>
            <div className="card-body align-items-center">
              <h6 className="text-center color-brown fs-24 fw-blod">Happiness Box Big Dipper</h6>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 148</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit">Add to Cart</button>
            </div>
          </div>

          <div className="cakes-card card border-0 w-25 rounded-4 align-items-center">
            <img className="w-75 mt-3 rounded-4" src="./assets/images/DIY-pr-250x250.png" alt="Card image"/>
            <div className="card-body align-item-center">
              <h6 className="text-center color-brown fs-5 fw-bold">DIY Cookie Cake 16 Inch</h6>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 199</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit">Add to Cart</button>
            </div>
          </div>

          <div className="cakes-card card border-0 w-25 rounded-4 align-item-enter">
            <img className="w-75 mt-3 rounded-4" src="./assets/images/DIY-pr-250x250.png" alt="Card image"/>
            <div className="card-body align-items-center">
              <h6 className="text-center color-brown fs-5 fw-bold">DIY Cookie Cake 12 Inch</h6>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 149</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Cookies;
