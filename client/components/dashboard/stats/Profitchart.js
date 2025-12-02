import React from "react";
import ApexChart from "@/components/dashboard/stats/ApexChart";
import LineChart from "@/components/dashboard/stats/LineChart";

function Profitchart() {
  return (
    <>
      <section>
        <div className="row g-3">
          <div className="col-lg-6">
            <div className="card p-4 shadow-sm rounded-4">
              <LineChart />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card p-4 shadow-sm rounded-4">
              <ApexChart />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card rounded-4 position-relative z-1 p-3">
              <h3 className="fs-16">Best Seller Of The Month</h3>
              <h3 className="fs-16 text-primary">Michael Marquez!</h3>
              <h2 className="lh-1 fs-20">$3.5K<span className="fs-16 text-body">(Sales)</span></h2>
              <a href="#" className="fw-medium fs-16 text-primary" style={{ marginTop: "84px" }}>Details View</a>
              <img src="./assets/images/Dashboard/male.png" className="position-absolute bottom-0 end-0 pe-3" alt="man"/>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card rounded-4 position-relative z-1 p-3">
              <div className="d-flex">
                <div className="flex-grow-1">
                  <h3 className="fs-16">New Customers This Month</h3>
                  <h2 className="lh-1">2,537</h2>
                </div>
                <div>
                  <span className="d-flex align-items-center px-2 py-1 bg-success bg-opacity-10 border border-success">
                    <img src="./assets/images/Dashboard/moving-arrow.png" />
                    <span className="text-success ms-1">2.75%</span>
                  </span>
                </div>
              </div>

              <div style={{marginTop: "55px"}}>
                <span className="fs-16 text-body d-block mb-10">Join Today</span>
                <ul className="p-0 mb-0 list-unstyled d-flex last-child-none global-right-list">
                  <li className="nav-link">
                    <img src="assets/images/Dashboard/adil.png" className="border border-3 border-white rounded-circle customer-img" alt="user12"
                    />
                  </li>
                  <li className="nav-link">
                    <img src="assets/images/Dashboard/adil.png" className="border border-3 border-white rounded-circle customer-img" alt="user13"/>
                  </li>
                  <li className="nav-link">
                    <img src="assets/images/Dashboard/adil.png" className="border border-3 border-white rounded-circle customer-img" alt="user14"/>
                  </li>
                  <li className="nav-link">
                    <img src="assets/images/Dashboard/adil.png" className="border border-3 border-white rounded-circle customer-img" alt="user15"/>
                  </li>
                  <li className="nav-link">
                    <img src="assets/images/Dashboard/adil.png" className="border border-3 border-white rounded-circle customer-img" alt="user16"/>
                  </li>
                  <li className="border border-3 border-white rounded-circle bg-primary text-center" style={{marginRight: "-20px", width: "52px", height: "52px", lineHeight: "49px"}}>
                    <span className="text-white fs-16 fw-medium">27</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profitchart;
