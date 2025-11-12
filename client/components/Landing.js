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
      <div className="">
        <h1 className="color-brown text-center mt-4">Best-Sellers</h1>
        <div className="mt-3 d-flex overflow-auto pb-4">
          <div className="card border-0" style={{width:"300px"}}>
            <img className="ms-4 mt-3" src="./assets/images/salah.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center"> HBD 7th Salah</h4>
              <p className="text-center">Cookie-hbd-022</p>
              <p className="text-center text-blue">SR 173.8999</p>
            </div>
          </div>
          <div className="card border-0" style={{width:"300px"}}>
            <img className="ms-4 mt-3" src="./assets/images/turtle.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center">Turtle Cake</h4>
              <p className="text-center">ICC14-1</p>
              <p className="text-center text-blue">SR 235</p>
            </div>
          </div>
          <div className="card border-0" style={{width:"300px"}}>
            <img className="ms-4 mt-3" src="./assets/images/cookie-cake.jpg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center">We dream and achieve cookie cake</h4>
              <p className="text-center">ND-001</p>
              <p className="text-center text-blue">SR 173</p>
            </div>
          </div>
          <div className="card border-0" style={{width:"300px"}}>
            <img className="ms-4 mt-3" src="./assets/images/HBD-pink-white.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center">HBD pink white</h4>
              <p className="text-center">Cookie-hbd-099</p>
              <p className="text-center text-blue">SR-173.00</p>
            </div>
          </div>
          <div className="card border-0" style={{width:"300px"}}>
            <img className="ms-4 mt-3" src="./assets/images/Bye-bye-single-life-Tarfa-1.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center">Congratulations</h4>
              <p className="text-center">Cookie-gen-011</p>
              <p className="text-center text-blue">SR 173</p>
            </div>
          </div>
          <div className="card border-0" style={{width:"300px"}}>
            <img className="ms-4 mt-3" src="./assets/images/Cute-cake-HBD-Baby-1.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center">HBD Baby</h4>
              <p className="text-center">Cute-HBD-010</p>
              <p className="text-center text-blue">SR 62</p>
            </div>
          </div>
          <div className="card border-0" style={{width:"300px"}}>
            <img className="ms-4 mt-3" src="./assets/images/Cute-cake-congratulation-finally-pass.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center">Finally pass</h4>
              <p className="text-center">Cute-GRAD-001</p>
              <p className="text-center text-blue">SR 62</p>
            </div>
          </div>
      </div>
      </div>
    </section>
  );
}

export default Landing;
