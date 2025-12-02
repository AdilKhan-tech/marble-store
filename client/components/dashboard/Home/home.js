import React from "react";
import PieChart from "../stats/Piechart";
import Profitchart from "../stats/Profitchart";
import RangeChart from "@/components/dashboard/stats/RangeChart";

function Home() {
  return (
    <section className="p-3 home">
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm rounded-4 h-100">
            <RangeChart />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-4 shadow-sm rounded-4 h-100">
            <div className="d-flex">
              <div className="flex-grow-1">
                <h3 className="fs-18">Total Orders</h3>
                <h2 className="lh-1">20,705</h2>
              </div>
              <div>
                <div className="bg-primary rounded-circle d-flex justify-content-center align-items-center" style={{ width: 70, height: 70 }} >
                  <img src="./assets/images/Dashboard/shopping-bag.png" className="img-fluid rounded-5"/>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">4.75% Increase in orders last week</small>
              <span className="d-flex align-items-center px-2 py-1 bg-success bg-opacity-10 border border-success">
                <img src="./assets/images/Dashboard/moving-arrow.png" />
                <span className="text-success ms-1">4.75%</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-lg-6">
          <div className="card p-4 shadow-sm rounded-4 h-100">
            <div className="d-flex">
              <div className="flex-grow-1">
                <h3 className="fs-18">Total Customers</h3>
                <h2 className="lh-1">84,127</h2>
              </div>
              <div>
                <div className="bg-success rounded-circle d-flex justify-content-center align-items-center" style={{ width: 70, height: 70 }}>
                  <img src="./assets/images/Dashboard/heart.png" className="img-fluid rounded-5"/>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">Total visitors decreased by 1.25%</small>
              <span className="d-flex align-items-center px-2 py-1 bg-danger bg-opacity-10 border border-danger">
                <img src="./assets/images/Dashboard/moving-arrow.png" />
                <span className="text-danger ms-1">1.25%</span></span>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card p-4 shadow-sm rounded-4 h-100">
            <div className="d-flex">
              <div className="flex-grow-1">
                <h3 className="fs-18">Total Revenue</h3>
                <h2>$15,278</h2>
              </div>
              <div>
                <div className="bg-warning rounded-circle d-flex justify-content-center align-items-center" style={{ width: 70, height: 70 }}>
                  <img src="./assets/images/Dashboard/dollar.png" className="img-fluid"/>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <small className="text-muted">Revenue increases this month</small>
              <span className="d-flex align-items-center px-2 py-1 bg-success bg-opacity-10 border border-success">
                <img src="./assets/images/Dashboard/moving-arrow.png" />
                <span className="text-success ms-1">3.15%</span></span>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-1">
        <div className="col-lg-12">
          <div className="card bg-primary text-white p-4 rounded-4 shadow-sm">
            <h3>Sales Overview</h3>
            <div className="d-flex justify-content-between mt-3">
              <div>
                <span>Total Sales</span><h2>9,586</h2>
              </div>
              <div>
                <span>Monthly Sales</span><h2>3,507</h2>
              </div>
              <div>
                <span>Today's Sales</span><h2>357</h2>
              </div>
            </div>
            <div className="progress mt-3" style={{ height: "4px" }}>
              <div className="progress-bar bg-white" style={{ width: "80%" }}></div>
            </div>
            <span className="d-block mt-2">20% Increase in last month</span>
          </div>
        </div>
      </div>
      <Profitchart />
      {/* <PieChart /> */}
    </section>
  );
}

export default Home;
