import React from 'react'

function Cakes() {
  return (
    <div>
       <section>
        <img style={{marginTop:"134px",marginInlineStart:"40px", position:"relative", width:"95%"}} src="./assets/images/ice-cak-bnner.jpg" alt="cake banner"></img>
      </section>
      <div className='container'>

        <div className="bg-white py-5">
        <div className="col-4 d-flex justify-content-end"> 
            <input type="text" className="form-control search-box" placeholder="Search here..."/> 
            <button type="submit"><i className="fa fa-search"></i></button> 
          </div> 
        <div className="mt-3 d-flex overflow-auto pb-4 ms-3 gap-3">
          <div className="cakes-card card border-0 rounded-4 align-items-center mx-1">
            <img className="mt-3" src="./assets/images/salah.png" alt="Card image" style={{width:"75%",}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold"> HBD 7th Salah</h4>
              <p className="text-center fs-15">Cookie-hbd-022</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 173.8999</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
            <img className="mt-3 rounded-4" src="./assets/images/turtle.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">Turtle Cake</h4>
              <p className="text-center fs-15">ICC14-1</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 235</p>
              <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
            <img className="mt-3 rounded-4" src="./assets/images/cookie-cake.jpg" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">We dream and achieve cookie cake</h4>
              <p className="text-center fs-15">ND-001</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 173</p>
              <button className="btn rounded-5 px-3 ms-5 py-0 fs-5" type="submit"> Add to cart </button>
            </div>
          </div>
          <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
            <img className="mt-3" src="./assets/images/HBD-pink-white.png" alt="Card image" style={{width:"75%"}}/>
            <div className="card-body align-items-center">
              <h4 className="text-center color-brown fs-5 fw-bold">HBD pink white</h4>
              <p className="text-center fs-15">Cookie-hbd-099</p>
              <p className="text-center mt-0 text-blue fs-20 fw-medium">SR-173.00</p>
              <button className="btn rounded-5 px-3 py-0 fs-5 ms-2" type="submit"> Add to cart </button>
            </div>
          </div>
      </div>
      </div>
      </div>
    </div>
  )
}

export default Cakes
