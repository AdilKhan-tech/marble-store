import React from "react";

function Footer() {
  return (
    <footer className="footer bg-brown p-4 p-md-5 pb-3">
      <div className="container">
        
        {/* Top Section */}
        <div className="row gy-4 align-items-start">

          {/* Logo */}
          <div className="col-12 col-md-3 text-center text-md-start">
            <a href="./Landing">
              <img
                src="./assets/images/slabfooterlogo.svg"
                className="img-fluid"
                alt="Logo"
              />
            </a>
          </div>

          {/* Links */}
          <div className="col-12 col-md-9">
            <div className="row gy-4">

              <div className="col-6 col-md-3">
                <h6 className="footer-text">Collection</h6>
                <a className="footerlink d-block mb-2" href="#">Ready Cakes</a>
                <a className="footerlink d-block mb-2" href="#">Cookie Box</a>
              </div>

              <div className="col-6 col-md-3">
                <h6 className="footer-text">Services</h6>
                <a className="footerlink d-block mb-2" href="#">Custom Cake</a>
                <a className="footerlink d-block mb-2" href="#">Marble Van</a>
              </div>

              <div className="col-6 col-md-3">
                <h6 className="footer-text">Company</h6>
                <a className="footerlink d-block mb-2" href="./about">About</a>
                <a className="footerlink d-block mb-2" href="./contact">Contact</a>
                <a className="footerlink d-block mb-2" href="#">FAQ</a>
              </div>

              {/* Contact */}
              <div className="col-12 col-md-3">
                <h6 className="footer-text">Contact us</h6>
                <div className="d-flex gap-2 flex-wrap">
                  <a href="#"><img src="./assets/images/phoni.svg" alt="" /></a>
                  <a href="#"><img src="./assets/images/whatsappi.svg" alt="" /></a>
                  <a href="#"><img src="./assets/images/maili.svg" alt="" /></a>
                </div>

                <h6 className="footer-text mt-3">Follow us</h6>
                <div className="d-flex gap-2 flex-wrap">
                  <a href="#"><img src="./assets/images/insta.png" alt="" /></a>
                  <a href="#"><img src="./assets/images/faceb.png" alt="" /></a>
                  <a href="#"><img src="./assets/images/tiktok.png" alt="" /></a>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}
        <hr className="mt-4" style={{ borderColor: "rgba(0,0,0,1)" }} />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="m-0 footerlink text-brown text-center text-md-start">
            © 2025 Marble Slab. All Rights Reserved.
          </p>
          <a href="#" className="text-decoration-none footerlink text-brown mt-2 mt-md-0">
            Privacy Policy
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;