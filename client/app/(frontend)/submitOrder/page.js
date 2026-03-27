"use client";
import React from "react";

export default function Checkout() {
  return (
    <div
      className="container py-4"
      style={{ background: "#f6f8fb", minHeight: "100vh", marginTop: "130px" }}
    >
      <div className="row g-4 container mx-auto">
        {/* LEFT COLUMN */}
        <div className="col-lg-8">
          <h4 className="mb-3 fw-bold fs-1 color-brown">
            Checkout
          </h4>

          {/* Gift Option Row */}
          <div className="mb-4 mt-5">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="giftOption"
                style={{ cursor: "pointer" }}
              />
              <label
                className="form-check-label"
                htmlFor="giftOption"
                style={{ fontWeight: "500" }}
              >
                Do you want to gift this product?
              </label>
            </div>
          </div>

          {/* Receiving Toggle */}
          <div className="mb-4 d-flex align-items-center gap-3">
            <span className="fw-medium fs-3">Receiving</span>
            <div className="btn-group ms-auto" role="group">
              <button
                className="btn btn-sm px-4"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid #dee2e6",
                  color: "#6c757d",
                }}
              >
                Delivery
              </button>
              <button
                className="btn btn-sm px-4"
                style={{
                  backgroundColor: "#0dcaf0",
                  border: "1px solid #0dcaf0",
                  color: "#fff",
                  fontWeight: "500",
                }}
              >
                Pickup
              </button>
            </div>
          </div>

          {/* Pickup Details */}
          <div className="border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h6 className="mb-0 fw-bold">Pickup details</h6>
                <span
                  style={{
                    color: "#dc3545",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  Edit
                </span>
              </div>
              <hr style={{ borderTop: "2px dotted #ccc", margin: "12px 0" }} />
              <div style={{ fontSize: "14px" }}>
                <p className="mb-2">
                  <strong>Address</strong> — Prince Sultan Rd, Ar Rawdah, Jeddah
                  23433
                </p>
                <p className="mb-2">
                  <strong>City</strong> — -
                </p>
                <p className="mb-2">
                  <strong>Branch</strong> — -
                </p>
                <p className="mb-2">
                  <strong>Time Slot</strong> — -
                </p>
                <p className="mb-0">
                  <strong>Date</strong> — -
                </p>
              </div>
            </div>
          </div>

          {/* Recipient's Data */}
          <h6 className="fw-bold mb-1 mt-5">Recipient's data</h6>
          <div className="border-0 shadow-sm rounded-4 mb-4">
            <div className="card-body p-4">
              <div className="mb-3">
                <label className="form-label fw-semibold mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="Zad Modern"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #dee2e6",
                  }}
                />
              </div>
              <div>
                <label className="form-label fw-semibold mb-1">Phone *</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue="+966 536741445"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #dee2e6",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Discount */}
          <h6 className="fw-bold mb-1 mt-5">Discount</h6>
          <div className="border-0 shadow-sm rounded-4">
            <div className="card-body p-4">
            <h6 className="fw-bold mb-2">Enter your promo code</h6>
              <div className="d-flex gap-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your promo code"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid #dee2e6",
                  }}
                />
                <button
                  className="btn px-4"
                  style={{
                    backgroundColor: "#0dcaf0",
                    color: "#fff",
                    fontWeight: "500",
                    border: "none",
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-lg-4">
          {/* Summary */}
          <div
            className="border-0 rounded-4 mb-4"
            style={{ backgroundColor: "#f5e9e2" }}
          >
            <div className="card-body p-4">
              <h6 className="fw-bold mb-3">Summary</h6>

              <div className="d-flex justify-content-between mb-2">
                <span style={{ color: "#555" }}>
                  We dream and achieve cookie cake ✨ 1
                </span>
                <span className="fw-bold">173.00 SR</span>
              </div>

              <hr className="my-2" />

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span className="fw-bold">173.00 SR</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Total:</span>
                <span className="fw-bold">173.00 SR</span>
              </div>

              <hr className="my-3" />

              {/* Payment Methods */}
              <div className="mt-3">
                <div className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="bankTransfer"
                    defaultChecked
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="bankTransfer"
                    style={{ fontWeight: "500" }}
                  >
                    Direct bank transfer
                  </label>
                </div>
                <small
                  className="text-muted d-block mb-3"
                  style={{ fontSize: "12px", marginLeft: "24px" }}
                >
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared in our account.
                </small>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cashOnDelivery"
                    style={{ cursor: "pointer" }}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="cashOnDelivery"
                    style={{ fontWeight: "500" }}
                  >
                    Cash on delivery
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                className="btn w-100 mt-4 py-2 text-white fw-bold"
                style={{
                  backgroundColor: "#e2557a",
                  border: "none",
                  borderRadius: "8px",
                }}
              >
                Place order
              </button>
            </div>
          </div>

          {/* Privacy Policy */}
          <div
            className="border-0 rounded-4"
            style={{ backgroundColor: "#d9f0f2" }}
          >
            <div className="card-body p-3">
              <small className="text-muted" style={{ fontSize: "12px" }}>
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .form-control:focus {
          box-shadow: none;
          border-color: #0dcaf0;
        }
        .btn:hover {
          opacity: 0.9;
        }
        . {
          transition: transform 0.2s ease;
        }
        @media (max-width: 768px) {
          .container {
            margin-top: 100px !important;
          }
        }
      `}</style>
    </div>
  );
}
