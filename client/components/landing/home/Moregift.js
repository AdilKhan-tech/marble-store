import React from 'react'

function Moregift() {
  return (
    <section>
        <div>
        <div className="row w-100 mx-auto align-items-center px-5" style={{backgroundColor:"#5af5fa50"}}>
          <div className="col-md-5">
            <div>
              <h2 className="fs-38 fw-bold text-brown">More gift options</h2>
              <p className="fs-3 fw-medium text-brown py-4">Explore more ice cream creations & surprise your belovedwith personalized messages</p>
              <a href="#">
                <button className="btn btn-primary rounded-5 px-md-4 px-2 py-1 pt-2" type="submit">VIEW ICE CREAM COLLECTIONS</button>
              </a>
            </div>
          </div>
          <div className="col-md-7 p-0">
            <img src="./assets/images/ice2.webp" className="w-100" alt="cookies box"/>
          </div>
        </div>
        <div className="row w-100 mx-auto align-items-center" style={{backgroundColor:"#ff008846"}}>
          <div className="col-md-5 ">
            <div className="px-5">
              <h2 className="fs-38 fw-bold text-brown"> Make your own <br/> cookies box! </h2>
              <p className="fs-3 fw-medium text-brown py-4"> Fresh, high-quality ingredients and baked to perfection. Assemble your own box of cookies to create the perfect mix of flavors for you or your friends and family. </p>
              <a href="#">
                <button className="btn btn-primary rounded-5 px-md-4 px-2 py-1 pt-2" type="submit">MAKE YOUR OWN BOX</button>
              </a>
            </div>
          </div>
          <div className="col-md-7 p-0">
            <img src="./assets/images/cookbox1.png" className="w-100" alt="cookies box"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Moregift