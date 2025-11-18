import React from "react";

function Page() {
  return (
    <section>
      <div className="p-4" style={{marginTop: "134px",position: "relative", backgroundColor: "#6d5794"}}>
        <div className="row mt-3">
          <div className="col-md-4">
                <div className="d-flex align-items-center">
                    <img className="order-img" src="./assets/images/call-contact.png" alt="Call Contact"/>
                    <div className="">
                        <p className="m-0 fs-5 fw-bold text-white">Customer hotline</p>
                        <p className="m-0 fw-medium text-white">920011480</p>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <div className="d-flex align-items-center">
                    <img className="order-img" src="./assets/images/whatsapp-contact.png" alt="WhatsApp Contact"/>
                    <div className="">
                        <p className="m-0 fs-5 fw-bold text-white">WhatsApp</p>
                        <p className="m-0 fw-medium text-white">+966594064708</p>
                    </div>
                </div>
            </div>
            <div className="col-md-3">
                <div className="d-flex align-items-center">
                    <img className="order-img" src="./assets/images/email-contact.png" alt="Email Contact"/>
                    <div className="">
                        <p className="m-0 fs-5 fw-bold text-white">E-mail</p>
                        <p className="m-0 fw-medium text-white">info@marblestore.com</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}

export default Page;