import React from "react";

function Landing() {
  return (
    <section className="section">
      <img src="./assets/images/Home Banner_arabic.png" alt="Cookies Images" className="img-fluid mx-auto d-block"/>
      <div className="ms-auto py-5 text-center bg-yellow">
        <p className="fs-4 fw-bold color-purple">Why You Should Order Online With Us?</p>
        <div className="">
        <div className="row mt-3">
          <div className="col-md-4 ms-2">
                <div className="d-flex align-items-center ms-5">
                    <img className="order-img image-fluid" src="./assets/images/order-cake.webp" alt="Order Cake"/>
                    <div className="">
                        <p className="m-0 fs-25 fw-bold color-brown">Personalized Cake</p>
                        <p className="m-0 text-start fw-medium color-brown">(Over 100 Designs)</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4 ms-2">
                <div className="d-flex align-items-center ms-5">
                    <img className="order-img image-fluid" src="./assets/images/order-hand.png" alt="Order Cake"/>
                    <div className="">
                        <p className="m-0 fs-25 fw-bold color-brown">Easy Ordering</p>
                        <p className="m-0 text-start fw-medium color-brown">(Within 2 Minutes)</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="d-flex align-items-center ms-5">
                    <img className="order-img image-fluid" src="./assets/images/order-box.png" alt="Order Cake"/>
                    <div className="">
                        <p className="m-0 fs-25 fw-bold color-brown">Fast Delivery</p>
                        <p className="m-0 text-start fw-medium color-brown">(Within 2 hours)</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
      </div>
      <div className="bg-light py-5">
        <h1 className="color-brown text-center mb-3 fs-38 fw-bold">Best-Sellers</h1>
        <div className="mt-3 d-flex overflow-auto pb-4 ms-5">
          <div><img src="./assets/images/arrow-left.png" alt="Left Arrow"/></div>
          <div className="card border-0">
            <img className="ms-4 mt-3" src="./assets/images/salah.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold"> HBD 7th Salah</h4>
              <p className="text-center fs-15">Cookie-hbd-022</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 173.8999</p>
              <button className="btn bg-primary rounded-5 px-3 py-0 ms-5 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0">
            <img className="ms-4 mt-3" src="./assets/images/turtle.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold">Turtle Cake</h4>
              <p className="text-center fs-15">ICC14-1</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 235</p>
              <button className="btn bg-primary rounded-5 px-3 py-0 ms-5 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0">
            <img className="ms-4 mt-3" src="./assets/images/cookie-cake.jpg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold">We dream and achieve cookie cake</h4>
              <p className="text-center fs-15">ND-001</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 173</p>
              <button className="btn bg-primary rounded-5 px-3 py-0 ms-5 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0">
            <img className="ms-4 mt-3" src="./assets/images/HBD-pink-white.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold">HBD pink white</h4>
              <p className="text-center fs-15">Cookie-hbd-099</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR-173.00</p>
              <button className="btn bg-primary rounded-5 px-3 py-0 ms-5 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          </div>
          <div className="mt-3 d-flex overflow-auto pb-4">
          <div className="card border-0">
            <img className="ms-4 mt-3" src="./assets/images/Bye-bye-single-life-Tarfa-1.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold">Congratulations</h4>
              <p className="text-center fs-15">Cookie-gen-011</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 173</p>
              <button className="btn bg-primary rounded-5 px-3 py-0 ms-5 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0">
            <img className="ms-4 mt-3" src="./assets/images/Cute-cake-HBD-Baby-1.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold">HBD Baby</h4>
              <p className="text-center fs-15">Cute-HBD-010</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
              <button className="btn bg-primary rounded-5 px-3 py-0 ms-5 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0">
            <img className="ms-4 mt-3" src="./assets/images/Cute-cake-congratulation-finally-pass.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold">Finally pass</h4>
              <p className="text-center fs-15">Cute-GRAD-001</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
              <button className="btn bg-primary rounded-5 px-3 py-0 ms-5 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0">
            <img className="ms-4 mt-3" src="./assets/images/Cute-cake-congratulation-finally-pass.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold">Finally pass</h4>
              <p className="text-center fs-15">Cute-GRAD-001</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
              <button className="btn bg-primary rounded-5 px-3 py-0 ms-5 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div><img src="./assets/images/arrow-right.png" alt="Right Arrow"/></div>
      </div>
      </div>
    </section>
  );
}

export default Landing;
