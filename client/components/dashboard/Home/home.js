import React from "react";
// import PieChart from "../stats/Piechart";
import Profitchart from "@/components/dashboard/profitchart/Profitchart";
import RangeChart from "@/components/dashboard/stats/RangeChart";

function Home() {
  return (
    <div className="dashboard-wrapper">
      {/* Header Stats */}
      <div className="row g-4 mb-4">
        {/* Welcome Card */}
        <div className="col-12">
          <div className="card border-0 shadow-sm dashboard-welcome-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h1 className="mb-2 fw-bold dashboard-title">Welcome back, Admin!</h1>
                  <p className="text-muted mb-0">Here's what's happening with your store today</p>
                </div>
                <div className="dashboard-date-badge">
                  <span className="fs-6 fw-medium">Today</span>
                  <span className="d-block fs-5 fw-bold">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm dashboard-stat-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <p className="text-muted mb-1 fw-medium">Total Orders</p>
                  <h2 className="mb-0 fw-bold text-primary">20,705</h2>
                  <div className="d-flex align-items-center mt-2">
                    <span className="badge bg-success-subtle text-success fs-7">
                      <i className="bi bi-arrow-up me-1"></i>4.75%
                    </span>
                    <span className="text-muted fs-7 ms-2">vs last week</span>
                  </div>
                </div>
                <div className="dashboard-icon-circle bg-primary-subtle">
                  <i className="bi bi-cart-check text-primary fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm dashboard-stat-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <p className="text-muted mb-1 fw-medium">Total Customers</p>
                  <h2 className="mb-0 fw-bold text-success">84,127</h2>
                  <div className="d-flex align-items-center mt-2">
                    <span className="badge bg-danger-subtle text-danger fs-7">
                      <i className="bi bi-arrow-down me-1"></i>1.25%
                    </span>
                    <span className="text-muted fs-7 ms-2">vs last month</span>
                  </div>
                </div>
                <div className="dashboard-icon-circle bg-success-subtle">
                  <i className="bi bi-people text-success fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm dashboard-stat-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <p className="text-muted mb-1 fw-medium">Total Revenue</p>
                  <h2 className="mb-0 fw-bold text-warning">$15,278</h2>
                  <div className="d-flex align-items-center mt-2">
                    <span className="badge bg-success-subtle text-success fs-7">
                      <i className="bi bi-arrow-up me-1"></i>3.15%
                    </span>
                    <span className="text-muted fs-7 ms-2">this month</span>
                  </div>
                </div>
                <div className="dashboard-icon-circle bg-warning-subtle">
                  <i className="bi bi-currency-dollar text-warning fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-3 col-md-6">
          <div className="card border-0 shadow-sm dashboard-stat-card">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  <p className="text-muted mb-1 fw-medium">Conversion Rate</p>
                  <h2 className="mb-0 fw-bold text-info">24.8%</h2>
                  <div className="d-flex align-items-center mt-2">
                    <span className="badge bg-success-subtle text-success fs-7">
                      <i className="bi bi-arrow-up me-1"></i>2.3%
                    </span>
                    <span className="text-muted fs-7 ms-2">vs last quarter</span>
                  </div>
                </div>
                <div className="dashboard-icon-circle bg-info-subtle">
                  <i className="bi bi-graph-up text-info fs-4"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row g-4 mb-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0 fw-bold">Sales Performance</h5>
                <div className="dropdown">
                  <button className="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    This Month
                  </button>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="#">This Week</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="card-body p-4">
              <RangeChart />
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Top Products</h5>
            </div>
            <div className="card-body p-4">
              <div className="dashboard-product-list">
                <div className="dashboard-product-item">
                  <div className="d-flex align-items-center">
                    <div className="dashboard-product-img bg-light rounded me-3">
                      <i className="bi bi-cake fs-5 text-primary"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium">Chocolate Cake</h6>
                      <p className="text-muted mb-0 small">1,245 sold</p>
                    </div>
                    <span className="badge bg-success-subtle text-success">+12%</span>
                  </div>
                </div>
                <div className="dashboard-product-item">
                  <div className="d-flex align-items-center">
                    <div className="dashboard-product-img bg-light rounded me-3">
                      <i className="bi bi-snow fs-5 text-info"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium">Ice Cream</h6>
                      <p className="text-muted mb-0 small">987 sold</p>
                    </div>
                    <span className="badge bg-success-subtle text-success">+8%</span>
                  </div>
                </div>
                <div className="dashboard-product-item">
                  <div className="d-flex align-items-center">
                    <div className="dashboard-product-img bg-light rounded me-3">
                      <i className="bi bi-cookie fs-5 text-warning"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium">Cookies</h6>
                      <p className="text-muted mb-0 small">756 sold</p>
                    </div>
                    <span className="badge bg-danger-subtle text-danger">-3%</span>
                  </div>
                </div>
                <div className="dashboard-product-item">
                  <div className="d-flex align-items-center">
                    <div className="dashboard-product-img bg-light rounded me-3">
                      <i className="bi bi-cup-straw fs-5 text-success"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium">Custom Cakes</h6>
                      <p className="text-muted mb-0 small">634 sold</p>
                    </div>
                    <span className="badge bg-success-subtle text-success">+15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Overview */}
      <div className="row g-4 mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Revenue Overview</h5>
            </div>
            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-md-3">
                  <div className="text-center p-3 bg-primary-subtle rounded">
                    <h3 className="fw-bold text-primary mb-1">9,586</h3>
                    <p className="text-muted mb-0">Total Sales</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 bg-success-subtle rounded">
                    <h3 className="fw-bold text-success mb-1">3,507</h3>
                    <p className="text-muted mb-0">Monthly Sales</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 bg-warning-subtle rounded">
                    <h3 className="fw-bold text-warning mb-1">357</h3>
                    <p className="text-muted mb-0">Today's Sales</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="text-center p-3 bg-info-subtle rounded">
                    <h3 className="fw-bold text-info mb-1">$24.8K</h3>
                    <p className="text-muted mb-0">Avg. Order Value</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-medium">Monthly Target</span>
                  <span className="fw-bold">80% Complete</span>
                </div>
                <div className="progress" style={{ height: '10px' }}>
                  <div className="progress-bar bg-gradient" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Recent Orders</h5>
            </div>
            <div className="card-body p-0">
              <div className="dashboard-orders-list">
                <div className="dashboard-order-item border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-medium">#ORD-7842</h6>
                      <p className="text-muted mb-0 small">Chocolate Cake - 2 items</p>
                    </div>
                    <div className="text-end">
                      <span className="fw-bold text-success">$124.99</span>
                      <span className="badge bg-success-subtle text-success ms-2">Delivered</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-order-item border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-medium">#ORD-7831</h6>
                      <p className="text-muted mb-0 small">Ice Cream Combo - 1 item</p>
                    </div>
                    <div className="text-end">
                      <span className="fw-bold text-success">$89.99</span>
                      <span className="badge bg-warning-subtle text-warning ms-2">Processing</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-order-item border-bottom p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-medium">#ORD-7812</h6>
                      <p className="text-muted mb-0 small">Custom Birthday Cake - 3 items</p>
                    </div>
                    <div className="text-end">
                      <span className="fw-bold text-success">$156.49</span>
                      <span className="badge bg-info-subtle text-info ms-2">Shipped</span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-order-item p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h6 className="mb-1 fw-medium">#ORD-7798</h6>
                      <p className="text-muted mb-0 small">Cookie Box - 1 item</p>
                    </div>
                    <div className="text-end">
                      <span className="fw-bold text-success">$67.50</span>
                      <span className="badge bg-success-subtle text-success ms-2">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">Customer Insights</h5>
            </div>
            <div className="card-body p-4">
              <div className="dashboard-insights">
                <div className="dashboard-insight-item mb-4">
                  <div className="d-flex align-items-center">
                    <div className="dashboard-insight-icon bg-primary-subtle text-primary me-3">
                      <i className="bi bi-star fs-5"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium">Customer Satisfaction</h6>
                      <p className="text-muted mb-0">4.8/5 rating from 2,458 reviews</p>
                    </div>
                  </div>
                </div>
                <div className="dashboard-insight-item mb-4">
                  <div className="d-flex align-items-center">
                    <div className="dashboard-insight-icon bg-success-subtle text-success me-3">
                      <i className="bi bi-repeat fs-5"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium">Repeat Customers</h6>
                      <p className="text-muted mb-0">68% of total customers</p>
                    </div>
                  </div>
                </div>
                <div className="dashboard-insight-item mb-4">
                  <div className="d-flex align-items-center">
                    <div className="dashboard-insight-icon bg-warning-subtle text-warning me-3">
                      <i className="bi bi-graph-up-arrow fs-5"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium">Growth Rate</h6>
                      <p className="text-muted mb-0">12% month-over-month increase</p>
                    </div>
                  </div>
                </div>
                <div className="dashboard-insight-item">
                  <div className="d-flex align-items-center">
                    <div className="dashboard-insight-icon bg-info-subtle text-info me-3">
                      <i className="bi bi-geo-alt fs-5"></i>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-medium">Top Locations</h6>
                      <p className="text-muted mb-0">New York, California, Texas</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Profitchart />
    </div>
  );
}

export default Home;