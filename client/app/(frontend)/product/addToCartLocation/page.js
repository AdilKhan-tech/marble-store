"use client";
import React, { useState } from "react";
import { Button, Form, Row, Col, Card, Nav, Badge, InputGroup } from "react-bootstrap";

const AddLocation = ({ closePopup }) => {
  const [formData, setFormData] = useState({
    name_english: "Downtown Dubai",
    name_arabic: "داون تاون دبي",
    address: "MV99+2W3, Dhoke Sadumar, Islamabad, Pakistan",
    latitude: "33.6844",
    longitude: "73.0479",
    allowed_radius: "200.00",
    receiving_type: "delivery",
    send_for_someone: false,
    selected_date: "2026-03-02",
    selected_time: "02:00 PM",
  });

  const [mapType, setMapType] = useState("map");
  const [selectedCity, setSelectedCity] = useState("Jeddah");
  const [showServiceError, setShowServiceError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Sample locations data with distances
  const nearbyLocations = [
    { name: "Dahaban", distance: "2.5 km", available: true },
    { name: "Ash Shamiyya", distance: "3.8 km", available: true },
    { name: "Alif", distance: "5.2 km", available: true },
    { name: "Bahra", distance: "6.1 km", available: false },
    { name: "Khumrah", distance: "7.3 km", available: true },
    { name: "Almahamed", distance: "8.0 km", available: true },
    { name: "Alshaya", distance: "9.4 km", available: true },
    { name: "Alshayya", distance: "10.2 km", available: false },
    { name: "North Ridge", distance: "11.5 km", available: true },
    { name: "South Park", distance: "12.8 km", available: true },
  ];

  // Time slots
  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveSettings = () => {
    setShowServiceError(false);
    alert("✓ Location settings saved successfully!");
  };

  const handleLocationClick = (location) => {
    setFormData(prev => ({ 
      ...prev, 
      address: location.name,
      name_english: location.name 
    }));
  };

  const filteredLocations = nearbyLocations.filter(loc =>
    loc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="location-manager">
      {/* Bootstrap Icons CDN */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
      
      {/* Header */}
      <div className="header-section bg-white border-bottom sticky-top" style={{ top: "134px", zIndex: 1020 }}>
        <div className="container-fluid px-4 py-3">
          <div className="align-items-center row">
            <div className="col">
              <h4 className="mb-0 fw-bold"><i className="bi bi-geo-alt-fill text-primary me-2"></i>Add New Location</h4>
              <p className="text-secondary mb-0 small">Configure location details and delivery settings</p>
            </div>
            <div className="col-auto">
              <Button variant="outline-secondary" size="sm" onClick={closePopup} className="rounded-circle">
                <i className="bi bi-x-lg"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4" style={{marginTop:"134px"}}>
        <div className="g-4 row">
          {/* Left Column - Form */}
          <div className="col-lg-4">
            <div className="border-0 shadow-sm h-100">
              <div className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                    <i className="bi bi-geo-alt text-primary"></i>
                  </div>
                  <h6 className="fw-semibold mb-0">Delivery Settings</h6>
                </div>

                {/* Receiving Type */}
                <div className="mb-4">
                  <p className="fw-semibold form-label text-secondary small mb-2">
                    Receiving Type
                  </p>
                  <div className="d-flex gap-3">
                    <Button
                      variant={formData.receiving_type === "delivery" ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, receiving_type: "delivery" }))}
                      className="px-4"
                    >
                      <i className="bi bi-truck me-2"></i>
                      Delivery
                    </Button>
                    <Button
                      variant={formData.receiving_type === "pickup" ? "primary" : "outline-primary"}
                      size="sm"
                      onClick={() => setFormData(prev => ({ ...prev, receiving_type: "pickup" }))}
                      className="px-4"
                    >
                      <i className="bi bi-shop me-2"></i>
                      Pickup
                    </Button>
                  </div>
                </div>

                {/* Send for Someone */}
                <div className="mb-4 form-group">
                  <Form.Check
                    type="switch"
                    id="send-for-someone"
                    label={
                      <span className="fw-semibold">
                        Send for someone else
                        <span className="text-secondary small ms-2">(Gift delivery)</span>
                      </span>
                    }
                    name="send_for_someone"
                    checked={formData.send_for_someone}
                    onChange={handleChange}
                  />
                </div>

                {/* Address Line */}
                <div className="mb-4 form-group">
                  <Form.Label className="fw-semibold text-secondary small">
                    Complete Address
                  </Form.Label>
                  <InputGroup>
                    <InputGroup.Text className="bg-light border-end-0">
                      <i className="bi bi-geo-alt"></i>
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      name="address"
                      placeholder="Enter complete address"
                      className="border-start-0"
                    />
                  </InputGroup>
                </div>

                {/* Date and Time */}
                <div className="mb-4">
                  <Form.Label className="fw-semibold text-secondary small mb-2">
                    Schedule Delivery
                  </Form.Label>
                  <Row className="g-2">
                    <Col md={6}>
                      <InputGroup size="sm">
                        <InputGroup.Text className="bg-light">
                          <i className="bi bi-calendar"></i>
                        </InputGroup.Text>
                        <Form.Control
                          type="date"
                          name="selected_date"
                          value={formData.selected_date}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </Col>
                    <Col md={6}>
                      <InputGroup size="sm">
                        <InputGroup.Text className="bg-light">
                          <i className="bi bi-clock"></i>
                        </InputGroup.Text>
                        <Form.Select
                          name="selected_time"
                          value={formData.selected_time}
                          onChange={handleChange}
                        >
                          {timeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </Form.Select>
                      </InputGroup>
                    </Col>
                  </Row>
                </div>

                {/* Save Button */}
                <Button 
                  variant="primary" 
                  className="w-100 mb-4 py-2 fw-semibold"
                  onClick={handleSaveSettings}
                >
                  <i className="bi bi-check-circle me-2"></i>
                  Save Location Settings
                </Button>

                {/* Service Error Alert */}
                {showServiceError && (
                  <div className="alert alert-warning d-flex align-items-center py-2" role="alert">
                    <i className="bi bi-exclamation-triangle me-2"></i>
                    <small>Sorry, we don't offer service in this area yet.</small>
                  </div>
                )}

                {/* Location Preview */}
                <div className="bg-light rounded-3 p-3 mt-3">
                  <h6 className="fw-semibold mb-3 small"><i className="bi bi-info-circle me-2"></i>Location Preview</h6>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-secondary small">English:</span>
                    <span className="fw-semibold small">{formData.name_english}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-secondary small">Arabic:</span>
                    <span className="fw-semibold small" dir="rtl">{formData.name_arabic}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-secondary small">Radius:</span>
                    <span className="fw-semibold small">{formData.allowed_radius} meters</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-secondary small">Coordinates:</span>
                    <span className="fw-semibold small">{formData.latitude}, {formData.longitude}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Map */}
          <div className="col-lg-5">
            <div className="border-0 shadow-sm">
              <div className="bg-white border-0 p-3">
                <div className="d-flex align-items-center justify-content-between">
                  <Nav variant="tabs" defaultActiveKey="map" className="border-0">
                    <Nav.Item>
                      <Nav.Link 
                        eventKey="map" 
                        onClick={() => setMapType("map")}
                        className={`border-0 px-3 ${mapType === "map" ? "active fw-semibold" : "text-secondary"}`}
                      >
                        <i className="bi bi-map me-2"></i>
                        Map
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link 
                        eventKey="satellite" 
                        onClick={() => setMapType("satellite")}
                        className={`border-0 px-3 ${mapType === "satellite" ? "active fw-semibold" : "text-secondary"}`}
                      >
                        <i className="bi bi-satellite me-2"></i>
                        Satellite
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Badge bg="light" text="dark" className="px-3 py-2">
                    <i className="bi bi-geo-alt-fill text-danger me-1"></i>
                    Live Location
                  </Badge>
                </div>
              </div>
              <div className="p-0">
                {/* Map Container */}
                <div style={{ height: "450px", background: "#e9ecef", position: "relative" }}>
                  <img 
                    src={mapType === "map" 
                      ? "https://via.placeholder.com/800x450/0d6efd/ffffff?text=Interactive+Map+View"
                      : "https://via.placeholder.com/800x450/198754/ffffff?text=Satellite+Imagery"
                    }
                    alt="Map"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  
                  {/* Map Overlay Controls */}
                  <div className="position-absolute top-0 end-0 m-3">
                    <Button variant="light" size="sm" className="shadow-sm rounded-circle mb-2">
                      <i className="bi bi-plus-circle"></i>
                    </Button>
                  </div>
                  
                  {/* Map Pin */}
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <div className="pin-drop">
                      <i className="bi bi-geo-alt-fill text-danger" style={{ fontSize: "42px" }}></i>
                    </div>
                  </div>
                </div>
                
                {/* Location Info Bar */}
                <div className="p-3 border-top bg-white">
                  <Row className="align-items-center">
                    <Col>
                      <div className="d-flex align-items-center">
                        <div className="bg-primary bg-opacity-10 p-2 rounded-circle me-2">
                          <i className="bi bi-geo-alt text-primary"></i>
                        </div>
                        <div>
                          <div className="d-flex align-items-center gap-2">
                            <h6 className="fw-semibold mb-0">{selectedCity}</h6>
                            <span className="badge bg-light text-dark">جدة</span>
                          </div>
                          <p className="small text-secondary mb-0">{formData.address}</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs="auto">
                      <Button variant="outline-primary" size="sm">
                        Directions
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Locations List */}
          <div className="col-lg-3">
            <div className="border-0 shadow-sm h-100">
              <div className="bg-white border-0 p-3">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="fw-semibold mb-0">Nearby Locations</h6>
                  <Badge bg="secondary" className="rounded-pill">
                    {filteredLocations.length} available
                  </Badge>
                </div>
                <InputGroup size="sm">
                  <InputGroup.Text className="bg-light border-end-0">
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search locations..."
                    className="border-start-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </div>
              <div className="p-0">
                <div style={{ maxHeight: "500px", overflowY: "auto" }} className="locations-list">
                  {filteredLocations.map((location, index) => (
                    <div
                      key={index}
                      className={`location-item p-3 border-bottom ${location.available ? 'available' : 'unavailable'}`}
                      onClick={() => location.available && handleLocationClick(location)}
                      style={{ 
                        cursor: location.available ? 'pointer' : 'not-allowed',
                        opacity: location.available ? 1 : 0.6
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="d-flex align-items-center mb-1">
                            <i className="bi bi-geo-alt text-secondary me-2"></i>
                            <span className="fw-semibold">{location.name}</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <small className="text-secondary">{location.distance}</small>
                            {!location.available && (
                              <Badge bg="warning" text="dark" className="ms-2 small">Coming Soon</Badge>
                            )}
                          </div>
                        </div>
                        {location.available ? (
                          <i className="bi bi-arrow-right text-primary"></i>
                        ) : (
                          <i className="bi bi-x-circle text-secondary"></i>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Card.Footer className="bg-white border-0 p-3">
                <Button variant="link" className="text-decoration-none p-0">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add New Location
                </Button>
              </Card.Footer>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .location-manager {
          background: linear-gradient(135deg, #f5f7fa 0%, #f8f9fc 100%);
          min-height: 100vh;
        }

        .location-item {
          transition: all 0.2s ease;
        }

        .location-item.available:hover {
          background-color: #f0f7ff;
          transform: translateX(4px);
        }

        .location-item.unavailable {
          background-color: #f8f9fa;
        }

        .nav-tabs .nav-link {
          color: #6c757d;
          transition: all 0.2s;
        }

        .nav-tabs .nav-link:hover {
          color: #0d6efd;
          background: transparent;
        }

        .nav-tabs .nav-link.active {
          color: #0d6efd;
          background: transparent;
          border-bottom: 2px solid #0d6efd;
        }

        .pin-drop {
          animation: drop 0.4s ease;
        }

        @keyframes drop {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .form-control:focus, .form-select:focus {
          box-shadow: none;
          border-color: #0d6efd;
        }

        .btn-outline-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 8px rgba(13, 110, 253, 0.2);
        }

        .btn-primary {
          transition: all 0.2s;
        }

        .btn-primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AddLocation;