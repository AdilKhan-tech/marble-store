"use client";
import React, { useState } from "react";
import { Button, Form, Row, Col, Card, Nav } from "react-bootstrap";

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

  // Sample locations data
  const nearbyLocations = [
    "Dahaban", "Ash Shamiyya", "Alif", "Bahra", "Khumrah", 
    "Almahamed", "Alshaya", "Alshaya", "Alshaya", "Alshaya",
    "Alshayya", "Alshayya", "Alshayya", "Alshayya"
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
    // Just show a simple alert
    alert("Settings saved successfully! (Static Demo)");
  };

  const handleLocationClick = (location) => {
    setFormData(prev => ({ 
      ...prev, 
      address: location,
      name_english: location 
    }));
  };

  return (
    <div className="marble-dashboard">
      {/* Header with Marble Dashboard branding */}
      <div className="bg-white border-bottom px-4 py-3 mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4">
            <h5 className="fw-bold text-primary mb-0">MARBLE</h5>
            <nav className="d-flex gap-3">
              <a href="#" className="text-decoration-none text-secondary small">Marble Dashboard</a>
              <a href="#" className="text-decoration-none text-secondary small">Marble Store</a>
              <a href="#" className="text-decoration-none text-secondary small">localhost:8082/mx</a>
              <a href="#" className="text-decoration-none text-secondary small">Saudi Regions Cheat</a>
              <a href="#" className="text-decoration-none text-secondary small">Bootstrap Cookie</a>
              <a href="#" className="text-decoration-none text-secondary small">Ikmal HR</a>
            </nav>
          </div>
          <div className="text-muted small">
            http://localhost/marble/product/saudi-regions-challenge-cake/
          </div>
        </div>
      </div>

      <div className="container-fluid px-4">
        <Row>
          {/* Left Column - Form */}
          <Col lg={4}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body>
                <h6 className="fw-semibold mb-3">Select the receiving type</h6>
                <div className="d-flex gap-4 mb-4">
                  <Form.Check
                    type="radio"
                    label="Delivery"
                    name="receiving_type"
                    value="delivery"
                    checked={formData.receiving_type === "delivery"}
                    onChange={handleChange}
                    className="fw-normal"
                  />
                  <Form.Check
                    type="radio"
                    label="Pickup"
                    name="receiving_type"
                    value="pickup"
                    checked={formData.receiving_type === "pickup"}
                    onChange={handleChange}
                    className="fw-normal"
                  />
                </div>

                <Form.Check
                  type="checkbox"
                  label="Send for someone"
                  name="send_for_someone"
                  checked={formData.send_for_someone}
                  onChange={handleChange}
                  className="mb-4"
                />

                <Form.Group className="mb-4">
                  <Form.Label className="small fw-semibold text-secondary">Address line</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                    placeholder="Enter address"
                    className="rounded-3"
                  />
                </Form.Group>

                <h6 className="fw-semibold mb-3">Choose date and time slot</h6>
                <Row className="g-2 mb-4">
                  <Col md={6}>
                    <Form.Control
                      type="date"
                      name="selected_date"
                      value={formData.selected_date}
                      onChange={handleChange}
                      className="rounded-3"
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Select
                      name="selected_time"
                      value={formData.selected_time}
                      onChange={handleChange}
                      className="rounded-3"
                    >
                      <option value="">Select Time</option>
                      {timeSlots.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </Form.Select>
                  </Col>
                </Row>

                <Button 
                  variant="primary" 
                  className="w-100 mb-4 rounded-3 py-2"
                  onClick={handleSaveSettings}
                >
                  Save My Settings
                </Button>

                {showServiceError && (
                  <div className="alert alert-warning small py-2">
                    Sorry, we do not offer service in this area.
                  </div>
                )}
              </Card.Body>
            </Card>

            {/* Static Preview Fields */}
            <Card className="border-0 shadow-sm">
              <Card.Body>
                <h6 className="fw-semibold mb-3">Location Details (Static)</h6>
                <div className="mb-2">
                  <small className="text-secondary d-block">Name English:</small>
                  <span>{formData.name_english}</span>
                </div>
                <div className="mb-2">
                  <small className="text-secondary d-block">Name Arabic:</small>
                  <span>{formData.name_arabic}</span>
                </div>
                <div className="mb-2">
                  <small className="text-secondary d-block">Radius:</small>
                  <span>{formData.allowed_radius} meters</span>
                </div>
                <div>
                  <small className="text-secondary d-block">Coordinates:</small>
                  <span>{formData.latitude}, {formData.longitude}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Middle Column - Map */}
          <Col lg={5}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Header className="bg-white border-0 pt-3">
                <Nav variant="tabs" defaultActiveKey="map" className="border-0">
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="map" 
                      onClick={() => setMapType("map")}
                      className={`border-0 ${mapType === "map" ? "fw-bold border-bottom border-primary" : "text-secondary"}`}
                    >
                      Map
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link 
                      eventKey="satellite" 
                      onClick={() => setMapType("satellite")}
                      className={`border-0 ${mapType === "satellite" ? "fw-bold border-bottom border-primary" : "text-secondary"}`}
                    >
                      Satellite
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body className="p-0">
                {/* Static Map Image */}
                <div style={{ height: "400px", background: "#e9ecef", position: "relative" }}>
                  <img 
                    src={mapType === "map" 
                      ? "https://via.placeholder.com/800x400/0d6efd/ffffff?text=Map+View"
                      : "https://via.placeholder.com/800x400/198754/ffffff?text=Satellite+View"
                    }
                    alt="Map"
                    className="w-100 h-100"
                    style={{ objectFit: "cover" }}
                  />
                  {/* Map Pin */}
                  <div className="position-absolute top-50 start-50 translate-middle">
                    <i className="bi bi-geo-alt-fill text-danger" style={{ fontSize: "32px" }}></i>
                  </div>
                </div>
                
                {/* City and Address Info */}
                <div className="p-3 border-top">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <h6 className="fw-semibold mb-0">{selectedCity}</h6>
                    <span className="text-secondary">جدة</span>
                  </div>
                  <p className="small text-secondary mb-0">
                    <i className="bi bi-geo-alt me-2"></i>
                    {formData.address}
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Locations */}
          <Col lg={3}>
            <Card className="border-0 shadow-sm" style={{ height: "calc(100% - 1.5rem)" }}>
              <Card.Header className="bg-white border-0 pt-3">
                <h6 className="fw-semibold mb-0">Locations</h6>
              </Card.Header>
              <Card.Body className="p-0">
                <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                  {nearbyLocations.map((location, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 border-bottom hover-bg-light"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleLocationClick(location)}
                    >
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="small">{location}</span>
                        <span className="text-secondary small">{55 + index}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <style jsx>{`
        .hover-bg-light:hover {
          background-color: #f8f9fa;
        }
        .border-bottom.border-primary {
          border-bottom: 2px solid #0d6efd !important;
        }
        .marble-dashboard {
          background-color: #f8f9fa;
          min-height: 100vh;
          padding-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default AddLocation;