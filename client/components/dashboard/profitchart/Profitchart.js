import React from "react";
import ApexChart from "@/components/dashboard/stats/ApexChart";
import LineChart from "@/components/dashboard/stats/LineChart";
import Piechart from "@/components/dashboard/stats/Piechart";

function Profitchart() {
    const businessUnits = [
    {
      id: 1,
      customer: "Finance",
      created: "10/10/2025",
      total: "$9,095",
      profit: "$1,254",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Finance",
      created: "10/10/2025",
      total: "$9,095",
      profit: "$1,254",
      status: "Rejected",
    },
    {
      id: 3,
      customer: "Finance",
      created: "10/10/2025",
      total: "$9,095",
      profit: "$1,254",
      status: "Confirmed",
    },
  ];
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

    <section className="section mt-3">
      <div className="card-body px-0 pt-0 card rounded-2 p-0">

        <div className="datatable-wrapper">
          <div className="data-table p-2">
          <div className="d-flex justify-content-between">
            <div>
              <p className="fs-20">Recent Orders</p>
            </div>
            <div>
            <div className="d-flex">
              <div className="notifications language">
                    <button className="border-0 p-0 position-relative bg-transparent d-flex align-items-center"
                      type="button"  data-bs-toggle="dropdown" aria-label="Language Selector">
                      <p className="mt-2 fs-14">Show All</p>
                      <i className="bi bi-chevron-down ms-1 small me-3 text-success"></i>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end p-2 border shadow mt-2">
                      <div className="">
                          <p className="fs-16">Shipped</p>
                          <p className="fs-16">Confirmed</p>
                          <p className="fs-16">Pending</p>
                          <p className="fs-16">Rejected</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mb-3 border border-secondary-80 shadow-sm rounded-3">
                    <i className="bi bi-search position-absolute ms-3 text-dark"></i>
                    <input  type="search" className="form-control ps-5 bg-light border-0 shadow-sm" 
                      placeholder="Search here..."/>
                  </div>
                  </div>
            </div>
          </div>
            
            <table className="table datatable-table structure">
              <thead>
                <tr>
                  <th className="bg-light fw-20">Order ID</th>
                  <th className="bg-light fw-20">Customer</th>
                  <th className="bg-light fw-20">Created</th>
                  <th className="bg-light fw-20">Total</th>
                  <th className="bg-light fw-20">Profit</th>
                  <th className="bg-light fw-20">Status</th>
                  <th className="bg-light fw-20">Action</th>
                </tr>
              </thead>

              <tbody>
                {businessUnits.map((item) => (
                  <tr key={item.id}>

                    <td className="text-secondary fs-16">{item.id}</td>
                    <td><img src="assets/images/Dashboard/adil.png" className="border border-3 border-white rounded-circle customer-img" alt="user12"
                    /><span>Adil Khan</span></td>
                    <td className="text-secondary fs-16">{item.created}</td>
                    <td className="text-secondary fs-16">{item.total}</td>
                    <td className="text-secondary fs-16">{item.profit}</td>
                    <td className=""><span className="bg-danger bg-opacity-10 rounded-2 border border-danger fs-16">{item.status}</span></td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-light p-2">
                          <i className="bi bi-eye text-primary"></i>
                        </button>
                        <button className="btn btn-sm btn-light p-2">
                          <i className="bi bi-trash3 text-danger"></i>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>
    </section>

    <section>
        <div className="row g-3">
          <div className="col-lg-6">
            <div className="card p-4 shadow-sm rounded-4" style={{height:"450px"}}>
            <div className="d-flex justify-content-between">
            <div>
              <p>Order Summary</p>
            </div>
            <div className="notifications language">
              <button className="border-0 p-0 position-relative bg-transparent d-flex align-items-center"
                type="button"  data-bs-toggle="dropdown" aria-label="Language Selector">
                <p className="mt-2 fs-14">This Day</p>
                <i className="bi bi-chevron-down ms-1 small me-3 text-success"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end p-2 border shadow mt-2">
                <div className="">
                    <p className="fs-16">This Day</p>
                    <p className="fs-16">This Week</p>
                    <p className="fs-16">This Month</p>
                    <p className="fs-16">This Year</p>
                </div>
              </div>
            </div>
            </div>
            <div className="d-flex gap-3 justify-content-between mt-3 mb-3">
              <h4 className="fs-18">Completed<span className="fs-16 ms-2">60%</span></h4>
              <h4 className="fs-18">Order<span className="fs-16 ms-2">30%</span></h4>
              <h4 className="fs-18">Pending<span className="fs-16 ms-2">10%</span></h4>
            </div>
            <div className="d-flex justify-content-center">
              <Piechart />
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card p-4 shadow-sm rounded-4">
             <div className="d-flex justify-content-between">
              <div>
                <p>Top Sellers</p>
              </div>
             </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profitchart;
