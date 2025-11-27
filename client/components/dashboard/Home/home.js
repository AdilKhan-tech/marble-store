import React from 'react'

function home() {
  return (
    <section>
    <div>
    <img src="./assets/images/Home Banner_arabic.png" alt="Cookies Images" className="img-fluid mx-auto d-block" style={{marginTop:"134px", position:"relative"}}/>
    </div>
    <div className='d-flex justify-content-center'>
        <div className='mt-5 d-flex gap-5 mb-5'>
            <div role='button' className="sky-btn rounded-2 mt-3 p-2 fs-18 d-flex justify-content-center">Create Cake</div>
            <div role='button' className="sky-btn rounded-2 mt-3 p-2 fs-18 d-flex justify-content-center">Create Ice Cream</div>
            <div role='button' className="sky-btn rounded-2 mt-3 p-2 fs-18 d-flex justify-content-center">Create Cookies</div>
            <div role='button' className="sky-btn rounded-2 mt-3 p-2 fs-18 d-flex justify-content-center">Create Diy Product</div>
        </div>
    </div>
    </section>
  )
}

export default home