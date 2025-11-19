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
              <button className='btn btn-outline-dark' type="submit"><i className="fa fa-search"></i></button> 
          </div> 
          <div className="mt-3 d-flex overflow-auto pb-4 ms-3 gap-3">
              <div className="cakes-card card border-0 rounded-4 align-items-center mx-1">
                <img className="mt-3 rounded-4" src="./assets/images/IMG_1293.jpg" alt="Card image" style={{width:"75%",}}/>
                <div className="card-body align-items-center">
                  <h4 className="text-center color-brown fs-24 fw-bold">Saudi Regions Challenge Cake</h4>
                  <p className="text-center fs-15">ND-002</p>
                  <p className="text-center mt-0 text-blue fs-20 fw-medium"> SR  194 </p>
                  <button className="btn rounded-5 px-3 py-0 fs-5" type="submit">Add to Cart</button>
                </div>
              </div>
              <div className="cakes-card card border-0 rounded-4 align-items-center mx-1">
                <img className="mt-3 rounded-4" src="./assets/images/cookie-cake.jpg" alt="Card image" style={{width:"75%"}}/>
                <div className="card-body align-items-center">
                  <h4 className="text-center color-brown fs-5 fw-bold">Turtle Cake</h4>
                  <p className="text-center fs-15">ICC14-1</p>
                  <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 235</p>
                  <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
                </div>
              </div>
              <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
                <img className="mt-3 rounded-4" src="./assets/images/turtle.png" alt="Card image" style={{width:"75%"}}/>
                <div className="card-body align-items-center">
                  <h4 className="text-center color-brown fs-5 fw-bold">We dream and achieve cookie cake</h4>
                  <p className="text-center fs-15">ND-001</p>
                  <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 173</p>
                  <button className="btn rounded-5 px-3 ms-5 py-0 fs-5" type="submit"> Add to Cart </button>
                </div>
              </div>
              <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
                <img className="mt-3" src="./assets/images/custom-cake-design.png" alt="Card image" style={{width:"75%"}}/>
                <div className="card-body align-items-center">
                  <h4 className="text-center color-brown fs-5 fw-bold">HBD pink white</h4>
                  <p className="text-center fs-15">Cookie-hbd-099</p>
                  <p className="text-center mt-0 text-blue fs-20 fw-medium">SR-173.00</p>
                  <button className="btn rounded-5 px-3 py-0 fs-5 ms-2" type="submit"> Add to Cart </button>
                </div>
              </div>
          </div>

          <div className="mt-3 d-flex overflow-auto pb-4 ms-3 gap-3">
            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3  rounded-4" src="./assets/images/3cuozzpg.jpeg" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-item-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Cake N cup 2</h4>
                <p className="text-center fs-15">cnc-001</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium"> SR  52 </p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/5thsponge.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Turtle Cake</h4>
                <p className="text-center fs-15">ICC14-1</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 235</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/bomb.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Cherry Bomb</h4>
                <p className="text-center fs-15">spc-004</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium"> SR  150 </p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/comic.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Cherry Bomb</h4>
                <p className="text-center fs-15">spc-004</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium"> SR  150 </p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>
          </div>

          <div className="mt-3 d-flex overflow-auto pb-4 ms-3 gap-3">
            
            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/makewish.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Make A Wish</h4>
                <p className="text-center fs-15">spc-002</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium"> SR  150 </p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/minions.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">
                Minions Party				</h4>
                <p className="text-center fs-15">spc-001</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">  SR  150  </p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/70s.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">
                70’s				</h4>
                <p className="text-center fs-15">Cute-001</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">  SR  62  </p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3" src="./assets/images/letsparty.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-item-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Let’s Party</h4>
                <p className="text-center fs-15">Cute-002</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">  SR  62  </p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
              </div>
            </div>

          </div>

          <div className="mt-3 d-flex overflow-auto pb-4 ms-3 gap-3">
            
            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/butter-fly.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Butterfly</h4>
                <p className="text-center fs-15">Cute-003</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR  62</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/chanel-ribbon.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Chanel Ribbon</h4>
                <p className="text-center fs-15">Cute-004</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR  62</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/Cute-cake-bye-bye-single-life-1-300x300.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Bye bye single life</h4>
                <p className="text-center fs-15">Cute-wed-001</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3" src="./assets/images/Cute-cake-tomorrow-wedding.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-item-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Tomorrow wedding</h4>
                <p className="text-center fs-15">Cute-wed-002</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
              </div>
            </div>

          </div>

          <div className="mt-3 d-flex overflow-auto pb-4 ms-3 gap-3">
            
            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/Cute-cake-HBD-you-are-17-1-300x300.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">You are 17</h4>
                <p className="text-center fs-15">Cute-HBD-001</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/Cute-cake-HBD-Yalmir-1-300x300.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">HBD Yalmir</h4>
                <p className="text-center fs-15">Cute-HBD-002</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3 rounded-4" src="./assets/images/Cute-cake-congratulation-finally-pass-1-300x300.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-items-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Finally pass</h4>
                <p className="text-center fs-15">Cute-GRAD-001</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to Cart </button>
              </div>
            </div>

            <div className="cakes-card card border-0 align-items-center rounded-4 mx-1">
              <img className="mt-3" src="./assets/images/Cute-cake-graduation-cry-1-300x300.png" alt="Card image" style={{width:"75%"}}/>
              <div className="card-body align-item-center">
                <h4 className="text-center color-brown fs-5 fw-bold">Graduation in progress</h4>
                <p className="text-center fs-15">Cute-GRAD-002</p>
                <p className="text-center mt-0 text-blue fs-20 fw-medium">SR 62</p>
                <button className="btn rounded-5 px-3 py-0 fs-5" type="submit"> Add to cart </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cakes
