import React from 'react'

function Footer() {
  return (
    <footer className='footer bg-brown p-5 pb-3'>
      <div className='container'>
        <div className='row justify-content-between'>
        <div className='col-md-3 '>
          <a href="./Landing"><img src="./assets/images/slabfooterlogo.svg" className="img-fluid" alt="Logo"/></a>
        </div>

        <div className='col-md-9 d-flex justify-content-between'>
          <div className='col-md-3 col-6 '>
            <h6 className='footer-text'>Collection</h6>
            <a className='text-decoration-none footerlink mb-2 d-block' href='#'>Ready Cakes</a>
            <a className='text-decoration-none footerlink mb-2 d-block' href='#'>Ice Creams</a>
            <a className='text-decoration-none footerlink mb-2 d-block' href='#'>Cookie Box</a>
          </div>

          <div className='col-md-3 col-6 '>
            <h6 className='footer-text'>Services</h6>
            <a className='text-decoration-none footerlink mb-2 d-block' href='#'>Custom Cake</a>
            <a className='text-decoration-none footerlink mb-2 d-block' href='#'>Custom Ice Cream</a>
            <a className='text-decoration-none footerlink mb-2 d-block' href='#'>Marble Van</a>
          </div>

          <div className='col-md-3 col-6 '>
            <h6 className='footer-text'>Company</h6>
            <a className='text-decoration-none footerlink mb-2 d-block' href='./about'>About</a>
            <a className='text-decoration-none footerlink mb-2 d-block' href='./contact'>Contact</a>
            <a className='text-decoration-none footerlink mb-2 d-block' href='#'>FAQ</a>
          </div>

          <div className="ms-auto coll d-flex flex-column justify-content-between">
            <div className='ml-4'>
              <h6 className='footer-text'>Contact us</h6>
              <div>
                <a href='#'><img src="./assets/images/phoni.svg" className="me-2" alt="img"/></a>
                <a href='#'><img src="./assets/images/whatsappi.svg" className="me-2" alt="img"/></a>
                <a href='#'><img src="./assets/images/maili.svg" className="me-2" alt="img"/></a>
              </div>
              <div className='mt-4 '>
                <h6 className='footer-text'>Follow us</h6>
                <a href='#'><img src="./assets/images/insta.png" className="me-2" alt="img"/></a>
                <a href='#'><img src="./assets/images/faceb.png" className="me-2" alt="img"/></a>
                <a href='#'><img src="./assets/images/tiktok.png" className="me-2" alt="img"/></a>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* <hr/> */}
        <div className='container mt-5'>
        <hr style={{borderColor: "rgba(0, 0, 0, 1)"}}/>
          <div className='d-flex justify-content-between'>
            <p className="m-0  footerlink fs-6 text-brown mt-3"> © 2025 Marble Slab. All Rights Reserved.</p>
            <a href="#" className="mt-3 text-decoration-none footerlink mb-2 d-block text-brown">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer