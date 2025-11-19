import React from "react";
import Moregift from "../home/Moregift";

function Icecreams() {
  return (
    <section>
      <div>
        <img src="./assets/images/ice-cak-bnner.jpg" alt="Cookies Images" className="img-fluid mx-auto d-block" style={{ marginTop: "134px", position: "relative" }}
        />
      </div>
      <div className="d-flex justify-content-between mt-5 mb-5">
        <div className="btn btn-outline-dark rounded-5 ms-4 mt-2" data-bs-toggle="dropdown">
          Portion Size <i className="bi bi-chevron-down ms-2"></i></div>
        <ul className="dropdown-menu p-3">
        <div className="d-flex gap-3">
          <li className="portion-size rounded-2"><img src="./assets/images/bucket-big-dipper.png" className="portion-img"/><span className="fw-bold color-brown">Big Dipper</span></li>
          <li className="portion-size rounded-2"><img src="./assets/images/bucket-big-dipper.png" className="portion-img"/><span className="fw-bold color-brown">position</span></li>
          <li className="portion-size rounded-2"><img src="./assets/images/bucket-big-dipper.png" className="portion-img"/><span className="fw-bold color-brown">Regular</span></li>
          </div>
          <hr />
          <div className="d-flex ms-3 gap-5">
            <div className="">Clear Section</div>
            <button className="btn btn-warning rounded-5" >Apply</button>
          </div>
        </ul>
        <div>
            <p className="fs-18 me-5 mt-2" role="button"><i className="bi bi-funnel"></i>Reset Filter</p>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-center gap-4 mb-5">
        <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3" src="./assets/images/Birthday-Party_5.png" alt="Card image" style={{width:"75%",}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Birthday party</h4>
              <p className="text-center fs-15">TC02</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 24</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/44.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Hazelnut French coffee</h4>
              <p className="text-center fs-15">TC01</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 24</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/11.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Peanut butter rocky road</h4>
              <p className="text-center fs-15">TC04</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 24</p>
              <button className="btn rounded-5 px-3 ms-5 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
          <a href="#">
            <img className="mt-3" src="./assets/images/custom-icecream-img.png" alt="Card image" style={{width:"100%"}}/>
          </a>
          </div>
           <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3" src="./assets/images/55.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body">
              <h4 className="text-center color-brown fs-5 fw-bold">Nutella matilda’s cake</h4>
              <p className="text-center fs-15">TC14</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 24</p>
              <button className="btn rounded-5 px-3 py-0 fs-5 ms-3" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 rounded-4 align-items-center mx-1" role="button">
            <img className="mt-3" src="./assets/images/77.webp" alt="Card image" style={{width:"75%",}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Cookie Dough Drizzle</h4>
              <p className="text-center fs-15">TC13</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 24</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/66.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Nutella Overdose</h4>
              <p className="text-center fs-15">TC11</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 24</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3 rounded-4" src="./assets/images/33.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Salted pretzel caramel</h4>
              <p className="text-center fs-15">TC10</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 24</p>
              <button className="btn rounded-5 px-3 ms-5 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="card border-0 align-items-center rounded-4 mx-1" role="button">
            <img className="mt-3" src="./assets/images/22.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Lotus and berries</h4>
              <p className="text-center fs-15">TC15</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 24</p>
              <button className="btn rounded-5 px-3 py-0 fs-5 ms-2" type="submit"> Add to cart </button>
            </div>
          </div>
      </div>

      <Moregift />
    </section>
  );
}

export default Icecreams;