"use client";
import React, { useEffect, useState } from "react";

const MyAccount = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const sidebarLinks = document.querySelectorAll('.list-group-item-action');
    
    const showSection = (sectionId) => {
      document.querySelectorAll('#profile, #security, #notifications, #payments, #orders, #settings, #help')
        .forEach(section => section.classList.add('d-none'));
      
      const selectedSection = document.getElementById(sectionId.replace('#', ''));
      if (selectedSection) selectedSection.classList.remove('d-none');
      
      sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === sectionId) link.classList.add('active');
      });
    };
    
    showSection('#profile');
    
    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(link.getAttribute('href'));
      });
    });
    
    return () => {
      sidebarLinks.forEach(link => {
        link.removeEventListener('click', () => {});
      });
    };
  }, []);


  return (
    <div className="container my-5" style={{ marginTop: "100px" }}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="shadow-lg border-0">
            <div className="card-header bg-gradient text-white text-center py-4" style={{background: "linear-gradient(to right, #6a11cb, #2575fc)"}}>
              <h2 className="mb-0 fs-1 fw-bold">My Account</h2>
              <p className="mb-0 opacity-75">Manage your personal information and preferences</p>
            </div>
            
            <div className="card-body p-0">
              <div className="row g-0">
                {/* Left Sidebar */}
                <div className="col-md-4 border-end">
                  <div className="p-4 text-center">
                    <div className="position-relative d-inline-block mb-3">
                      <img 
                        src="/assets/images/qrcode.png" 
                        className="rounded-circle border border-3 border-primary" 
                        alt="User Avatar" 
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                      <div className="position-absolute bottom-0 end-0 bg-success rounded-circle p-1 border border-2 border-white">
                        <div className="bg-success rounded-circle" style={{width: '15px', height: '15px'}}></div>
                      </div>
                    </div>
                    <h5 className="mt-3 fw-bold">John Doe</h5>
                    <p className="text-muted mb-1">Premium Member</p>
                    <div className="d-grid gap-2 mt-3">
                      <button className="btn btn-outline-primary btn-sm rounded-pill">
                        <i className="bi bi-camera"></i> Change Photo
                      </button>
                    </div>
                  </div>
                  
                  <div className="list-group list-group-flush mt-3">
                    <a href="#profile" className="list-group-item list-group-item-action active py-3">
                      <i className="bi bi-person me-2"></i> Profile Information
                    </a>
                    <a href="#security" className="list-group-item list-group-item-action py-3">
                      <i className="bi bi-shield-lock me-2"></i> Security
                    </a>
                    <a href="#notifications" className="list-group-item list-group-item-action py-3">
                      <i className="bi bi-bell me-2"></i> Notifications
                    </a>
                    <a href="#payments" className="list-group-item list-group-item-action py-3">
                      <i className="bi bi-credit-card me-2"></i> Payment Methods
                    </a>
                    <a href="#orders" className="list-group-item list-group-item-action py-3">
                      <i className="bi bi-box-seam me-2"></i> Order History
                    </a>
                    <a href="#settings" className="list-group-item list-group-item-action py-3">
                      <i className="bi bi-gear me-2"></i> Settings
                    </a>
                    <a href="#help" className="list-group-item list-group-item-action py-3">
                      <i className="bi bi-question-circle me-2"></i> Help Center
                    </a>
                  </div>
                </div>
                
                {/* Main Content */}
                <div className="col-md-8">
                  <div id="profile" className="p-4">
                    <h3 className="mb-4 fw-bold">Profile Information</h3>
                    
                    <div className="row mb-4">
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" id="firstName" placeholder="John" value="John" readOnly />
                          <label htmlFor="firstName">First Name</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input type="text" className="form-control" id="lastName" placeholder="Doe" value="Doe" readOnly />
                          <label htmlFor="lastName">Last Name</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="form-floating mb-3">
                      <input type="email" className="form-control" id="email" placeholder="john@example.com" value="john.doe@example.com" readOnly />
                      <label htmlFor="email">Email Address</label>
                    </div>
                    
                    <div className="form-floating mb-3">
                      <input type="tel" className="form-control" id="phone" placeholder="(123) 456-7890" value="(123) 456-7890" readOnly />
                      <label htmlFor="phone">Phone Number</label>
                    </div>
                    
                    <div className="form-floating mb-4">
                      <input type="text" className="form-control" id="address" placeholder="123 Main St" value="123 Main Street, New York, NY 10001" readOnly />
                      <label htmlFor="address">Address</label>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <input type="date" className="form-control" id="dob" value="1990-01-01" readOnly />
                          <label htmlFor="dob">Date of Birth</label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating mb-3">
                          <select className="form-select" id="gender" disabled>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <label htmlFor="gender">Gender</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="d-flex justify-content-between mt-5">
                      <button className="btn btn-outline-secondary btn-lg px-4">
                        Cancel
                      </button>
                      <button className="btn btn-primary btn-lg px-4">
                        <i className="bi bi-pencil me-2"></i> Edit Profile
                      </button>
                    </div>
                  </div>
                  
                  <div id="security" className="p-4 d-none">
                    <h3 className="mb-4 fw-bold">Account Security</h3>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <div className="card h-100 border-start border-primary border-3">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <i className="bi bi-shield-lock text-primary" style={{fontSize: '2rem'}}></i>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h5 className="card-title mb-1">Password</h5>
                                <p className="card-text text-muted small mb-0">Last changed 3 months ago</p>
                              </div>
                            </div>
                            <button className="btn btn-outline-primary btn-sm mt-2">Change Password</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-6">
                        <div className="card h-100 border-start border-success border-3">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                              <div className="flex-shrink-0">
                                <i className="bi bi-phone-vibrate text-success" style={{fontSize: '2rem'}}></i>
                              </div>
                              <div className="flex-grow-1 ms-3">
                                <h5 className="card-title mb-1">Two-Factor Auth</h5>
                                <p className="card-text text-muted small mb-0">Enabled for extra security</p>
                              </div>
                            </div>
                            <button className="btn btn-outline-success btn-sm mt-2">Manage Settings</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h5>Login Activity</h5>
                      <div className="table-responsive">
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Date & Time</th>
                              <th>Device</th>
                              <th>Location</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Oct 12, 2023 10:30 AM</td>
                              <td>Chrome on Windows</td>
                              <td>New York, USA</td>
                              <td><span className="badge bg-success">Active</span></td>
                            </tr>
                            <tr>
                              <td>Oct 10, 2023 3:45 PM</td>
                              <td>iPhone Safari</td>
                              <td>California, USA</td>
                              <td><span className="badge bg-secondary">Completed</span></td>
                            </tr>
                            <tr>
                              <td>Oct 5, 2023 8:15 AM</td>
                              <td>Android Chrome</td>
                              <td>Texas, USA</td>
                              <td><span className="badge bg-secondary">Completed</span></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  
                  <div id="notifications" className="p-4 d-none">
                    <h3 className="mb-4 fw-bold">Notification Preferences</h3>
                    
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5>Email Notifications</h5>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="emailMarketing" defaultChecked />
                          <label className="form-check-label" htmlFor="emailMarketing">Marketing emails</label>
                        </div>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="emailOrders" defaultChecked />
                          <label className="form-check-label" htmlFor="emailOrders">Order updates</label>
                        </div>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="emailSecurity" defaultChecked />
                          <label className="form-check-label" htmlFor="emailSecurity">Security alerts</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5>SMS Notifications</h5>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="smsOrders" defaultChecked />
                          <label className="form-check-label" htmlFor="smsOrders">Order updates</label>
                        </div>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="smsSecurity" />
                          <label className="form-check-label" htmlFor="smsSecurity">Security alerts</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card">
                      <div className="card-body">
                        <h5>Push Notifications</h5>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="pushGeneral" defaultChecked />
                          <label className="form-check-label" htmlFor="pushGeneral">General notifications</label>
                        </div>
                        <div className="form-check form-switch mb-2">
                          <input className="form-check-input" type="checkbox" id="pushPromo" />
                          <label className="form-check-label" htmlFor="pushPromo">Promotional offers</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div id="payments" className="p-4 d-none">
                    <h3 className="mb-4 fw-bold">Payment Methods</h3>
                    
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Active Payment Methods</h5>
                        <button className="btn btn-primary btn-sm">Add New</button>
                      </div>
                      
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <i className="bi bi-credit-card" style={{fontSize: '2rem', color: '#007bff'}}></i>
                                  <h6 className="mt-2">Visa ending in 4235</h6>
                                  <p className="text-muted small mb-0">Expires 12/2027</p>
                                </div>
                                <div>
                                  <button className="btn btn-outline-secondary btn-sm">Edit</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-md-6 mb-3">
                          <div className="card">
                            <div className="card-body">
                              <div className="d-flex justify-content-between">
                                <div>
                                  <i className="bi bi-credit-card" style={{fontSize: '2rem', color: '#007bff'}}></i>
                                  <h6 className="mt-2">Mastercard ending in 6789</h6>
                                  <p className="text-muted small mb-0">Expires 08/2026</p>
                                </div>
                                <div>
                                  <button className="btn btn-outline-secondary btn-sm">Edit</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h5>Default Payment Method</h5>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="defaultPayment" id="payment1" defaultChecked />
                        <label className="form-check-label" htmlFor="payment1">
                          Visa ending in 4235
                        </label>
                      </div>
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="defaultPayment" id="payment2" />
                        <label className="form-check-label" htmlFor="payment2">
                          Mastercard ending in 6789
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div id="orders" className="p-4 d-none">
                    <h3 className="mb-4 fw-bold">Order History</h3>
                    
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#ORD-7842</td>
                            <td>Oct 15, 2023</td>
                            <td>2 Items</td>
                            <td>$124.99</td>
                            <td><span className="badge bg-success">Delivered</span></td>
                            <td><button className="btn btn-outline-primary btn-sm">View</button></td>
                          </tr>
                          <tr>
                            <td>#ORD-7831</td>
                            <td>Oct 5, 2023</td>
                            <td>1 Item</td>
                            <td>$89.99</td>
                            <td><span className="badge bg-success">Delivered</span></td>
                            <td><button className="btn btn-outline-primary btn-sm">View</button></td>
                          </tr>
                          <tr>
                            <td>#ORD-7812</td>
                            <td>Sep 28, 2023</td>
                            <td>3 Items</td>
                            <td>$156.49</td>
                            <td><span className="badge bg-warning">Processing</span></td>
                            <td><button className="btn btn-outline-primary btn-sm">View</button></td>
                          </tr>
                          <tr>
                            <td>#ORD-7798</td>
                            <td>Sep 15, 2023</td>
                            <td>1 Item</td>
                            <td>$67.50</td>
                            <td><span className="badge bg-success">Delivered</span></td>
                            <td><button className="btn btn-outline-primary btn-sm">View</button></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <nav aria-label="Order history pagination">
                      <ul className="pagination justify-content-center">
                        <li className="page-item disabled">
                          <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                        </li>
                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                          <a className="page-link" href="#">Next</a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  
                  <div id="settings" className="p-4 d-none">
                    <h3 className="mb-4 fw-bold">Account Settings</h3>
                    
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5>Language & Region</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <select 
                              className="form-select" 
                              id="languageSelect" 
                              value={language} 
                              onChange={(e) => setLanguage(e.target.value)}
                            >
                              <option value="en">English (US)</option>
                              <option value="es">Spanish</option>
                              <option value="fr">French</option>
                              <option value="de">German</option>
                              <option value="ar">Arabic</option>
                            </select>

                          </div>
                          <div className="col-md-6">
                            <div className="form-floating mb-3">
                              <select className="form-select" id="regionSelect">
                                <option value="us" selected>United States</option>
                                <option value="ca">Canada</option>
                                <option value="uk">United Kingdom</option>
                                <option value="au">Australia</option>
                                <option value="ae">United Arab Emirates</option>
                              </select>
                              <label htmlFor="regionSelect">Region</label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card mb-4">
                      <div className="card-body">
                        <h5>Currency</h5>
                        <div className="form-floating mb-3">
                          <select className="form-select" id="currencySelect">
                            <option value="usd" selected>USD - US Dollar ($)</option>
                            <option value="eur">EUR - Euro (€)</option>
                            <option value="gbp">GBP - British Pound (£)</option>
                            <option value="aed">AED - UAE Dirham (د.إ)</option>
                          </select>
                          <label htmlFor="currencySelect">Preferred Currency</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card">
                      <div className="card-body">
                        <h5>Danger Zone</h5>
                        <p className="text-muted">Permanently delete your account and all associated data</p>
                        <button className="btn btn-outline-danger">Delete Account</button>
                      </div>
                    </div>
                  </div>
                  
                  <div id="help" className="p-4 d-none">
                    <h3 className="mb-4 fw-bold">Help Center</h3>
                    
                    <div className="row mb-4">
                      <div className="col-md-4 mb-3">
                        <div className="card h-100 text-center">
                          <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <i className="bi bi-envelope-open" style={{fontSize: '2.5rem', color: '#007bff'}}></i>
                            <h5 className="mt-3">Contact Us</h5>
                            <p className="text-muted">Get in touch with our support team</p>
                            <button className="btn btn-outline-primary mt-auto">Send Message</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="card h-100 text-center">
                          <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <i className="bi bi-question-circle" style={{fontSize: '2.5rem', color: '#28a745'}}></i>
                            <h5 className="mt-3">FAQs</h5>
                            <p className="text-muted">Find answers to common questions</p>
                            <button className="btn btn-outline-success mt-auto">Browse FAQs</button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-md-4 mb-3">
                        <div className="card h-100 text-center">
                          <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <i className="bi bi-chat-dots" style={{fontSize: '2.5rem', color: '#ffc107'}}></i>
                            <h5 className="mt-3">Live Chat</h5>
                            <p className="text-muted">Chat with our support agents</p>
                            <button className="btn btn-outline-warning mt-auto">Start Chat</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card">
                      <div className="card-body">
                        <h5>Popular Topics</h5>
                        <div className="row">
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li><a href="#" className="text-decoration-none">How to update my payment method</a></li>
                              <li><a href="#" className="text-decoration-none">Managing my order history</a></li>
                              <li><a href="#" className="text-decoration-none">Account security settings</a></li>
                            </ul>
                          </div>
                          <div className="col-md-6">
                            <ul className="list-unstyled">
                              <li><a href="#" className="text-decoration-none">Return and refund policy</a></li>
                              <li><a href="#" className="text-decoration-none">Delivery options and fees</a></li>
                              <li><a href="#" className="text-decoration-none">Using promo codes</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;