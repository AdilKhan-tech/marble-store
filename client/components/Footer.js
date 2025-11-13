import React from 'react'

function Footer() {
  return (
    <footer className='footer bg-brown py-5 pb-3'>
      <div className='container'>
        <div className='row justify-content-between'>
        <div className='col-md-3 '>
          <a>
            <img src="./assets/images/slabfooterlogo.svg"      className="img-fluid" alt="Logo"/>
          </a>
        </div>

        <div className='col-md-9 d-flex justify-content-between'>
          <div className='col-md-3 col-6 '>
            <h6 className='keepTxt'>Collection</h6>
            <a className='text-decoration-none footerlink mb-2 d-block'>Ready Cakes</a>
            <a className='text-decoration-none footerlink mb-2 d-block'>Ice Creams</a>
            <a className='text-decoration-none footerlink mb-2 d-block'>Cookie Box</a>
          </div>

          <div className='col-md-3 col-6 '>
            <h6 className='keepTxt'>Services</h6>
            <a className='text-decoration-none footerlink mb-2 d-block'>Custom Cake</a>
            <a className='text-decoration-none footerlink mb-2 d-block'>Custom Ice Cream</a>
            <a className='text-decoration-none footerlink mb-2 d-block'>Marble Van</a>
          </div>

          <div className='col-md-3 col-6 '>
            <h6 className='keepTxt'>Company</h6>
            <a className='text-decoration-none footerlink mb-2 d-block'>About</a>
            <a className='text-decoration-none footerlink mb-2 d-block'>Contact</a>
            <a className='text-decoration-none footerlink mb-2 d-block'>FAQ</a>
          </div>

          <div className="ms-auto coll d-flex flex-column justify-content-between">
            <div className='ml-4'>
              <h6 className='keepTxt'>Contact us</h6>
              <div>
                <a>
                <img src="./assets/images/phoni.svg" className="me-2" alt="img"/>
                </a>
                <a>
                <img src="./assets/images/whatsappi.svg" className="me-2" alt="img"/>
                </a>
                <a>
                <img src="./assets/images/maili.svg" className="me-2" alt="img"/>
                </a>
              </div>
              <div className='mt-4 '>
                <h6 className='keepTxt followustxt'>Follow us</h6>
                <a>
                <img src="./assets/images/insta.png" className="me-2" alt="img"/>
                </a>
                <a>
                <img src="./assets/images/faceb.png" className="me-2" alt="img"/>
                </a>
                <a>
                <img src="./assets/images/tiktok.png" className="me-2" alt="img"/>
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
        {/* <hr/> */}
        <div className='container mt-5'>
          <div className='d-flex justify-content-between'>
            <p className="m-0  footerlink fs-6 text-brown mt-3"> 
              <span id="Cicon">©</span> 
              <span id="copyright">2025</span> Marble Slab. All Rights Reserved.
            </p>
            <a href="#" className="mt-3 text-decoration-none footerlink mb-2 d-block text-brown">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer