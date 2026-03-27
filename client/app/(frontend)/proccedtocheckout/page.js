"use client";
import React from "react";
export default function Cart() {
  return (
    <div className="container py-4" style={{ marginTop: "140px" }}>
      {/* TOP BAR */}
      <div
        className="top-alert border border-secondary rounded-3 bg-light d-flex justify-content-between align-items-center px-3 py-2 mb-4"
        style={{ fontSize: "14px" }}>
        <span>“Saudi Regions Challenge Cake” has been added to your cart.</span>
        <a href="#">Continue shopping</a>
      </div>

      <h1 className="fw-bold mb-4 color-brown">My Cart</h1>

      {/* COUPON */}
      <div className="d-flex gap-2 mb-4">
        <input
          className="form-control coupon"
          placeholder="Coupon code"
          style={{ width: "270px" }}/>
        <button
          className="btn py-1 px-3 rounded-5 text-white fw-bold"
          style={{ background: "#e85d88" }}>
          Apply coupon
        </button>
        <button
          className="btn btn-teal py-1 px-2 rounded-5 text-white fw-bold"
          style={{ background: "#2aa7b3" }}>
          Update cart
        </button>
      </div>

      <div className="row container mx-auto">
        {/* LEFT */}
        <div className="col-lg-8">
          <div className="cart-box p-3 mb-3 bg-white rounded-5 border border-light">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-3">
                <img
                  src="/assets/images/graduation-prod-250x250.png"
                  className="cake-img"
                  style={{
                    width: "170px",
                    height: "170px",
                    borderRadius: "12px",
                  }}/>

                <span className="fw-semibold">
                  Saudi Regions Challenge Cake
                </span>

                <div className="qty d-flex align-items-center border border-white bg-white rounded-5 px-2 py-1">
                  <button style={{width: "32px",height: "32px",borderRadius: "50%",}}>-</button>
                  <span>1</span>
                  <button style={{width: "32px",height: "32px",borderRadius: "50%",}}>+</button>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <span className="price fw-bold">194.00 SR</span>
                <i className="bi bi-trash fs-4 delete ms-5"></i>
              </div>
            </div>

            <div className="dashed mt-3"></div>
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-pink-outline rounded-5">
              Empty cart
            </button>
            <button
              className="btn btn-teal fw-bold text-white rounded-5"
              style={{ background: "#2aa7b3" }}>
              Continue shopping
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-lg-4">
          <div className="summary rounded-5 p-4">
            <h6 className="mb-3 fw-bold">Summary</h6>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-normal">Subtotal</span>
              <span>194.00 SR</span>
            </div>

            <div className="line"></div>

            <div className="d-flex justify-content-between mt-2">
              <span className="fw-bold">Total</span>
              <b>194.00 SR</b>
            </div>

            <button
              className="btn rounded-5 text-white fw-bold w-100 mt-4"
              style={{ background: "#e85d88" }}>
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>

      {/* ADDONS */}
      <div className="addons rounded-5 bg-light mt-5 p-4">
        <h2 className="fw-bold mb-4">Add ons Items</h2>

        <div className="row text-center">
          <div className="col-md-3">
            <img
              src="/assets/images/HBD-21-cupcake-220x220.png"
              className="addon-img w-75 rounded-4 border border-light"/>
            <h5 className="fw-bold">Candles</h5>
            <p className="text-teal">SR 11</p>
            <button
              className="btn rounded-5 text-white fw-bold w-100"
              style={{ background: "#e85d88" }}>
              Add to cart
            </button>
          </div>

          <div className="col-md-3">
            <img
              src="/assets/images/HBD-7th-Salah-220x220.webp"
              className="addon-img w-75 rounded-4 border border-light"/>
            <h5 className="fw-bold">DIY Extra Icing</h5>
            <p className="text-teal">SR 13</p>
            <button
              className="btn rounded-5 text-white fw-bold w-100"
              style={{ background: "#e85d88" }}>
              Add to cart
            </button>
          </div>

          <div className="col-md-3">
            <img
              src="/assets/images/HBD-88-220x220.png"
              className="addon-img w-75 rounded-4 border border-light"
            />
            <h5 className="fw-bold">Number Candles</h5>
            <p className="text-teal">SR 6</p>
            <button
              className="btn rounded-5 text-white fw-bold w-100"
              style={{ background: "#e85d88" }}
            >
              Add to cart
            </button>
          </div>

          <div className="col-md-3">
            <img
              src="/assets/images/HBD-Batman-220x220.png"
              className="addon-img w-75 rounded-4 border border-light"
            />
            <h5 className="fw-bold">Number Candles</h5>
            <p className="text-teal">SR 6</p>
            <button
              className="btn rounded-5 text-white fw-bold w-100"
              style={{ background: "#e85d88" }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .cart-box {
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
        }
        .qty span {
          margin: 0 10px;
        }
        .price {
          color: #2aa7b3;
        }
        .delete {
          color: #e85d88;
          cursor: pointer;
        }
        .dashed {
          border-bottom: 2px dashed #ccc;
        }
        .summary {
          background: #f3e8e6;
        }
        .line {
          border-bottom: 2px dashed #bdaaa3;
        }
        .btn-pink-outline {
          border: 1px solid #e85d88;
          color: #e85d88;
        }
        .text-teal {
          color: #2aa7b3;
        }
      `}</style>
    </div>
  );
}
