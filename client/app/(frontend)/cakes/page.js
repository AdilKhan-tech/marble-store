"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { getAllProductsRoute } from "@/utils/apiRoutes";
import { useRouter } from "next/navigation";

export default function IceCreams() {
  const { token } = useAxiosConfig();
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!token) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(getAllProductsRoute);

        // Filter products by category name_en "Cakes"
        const cakeProducts = res.data.data.filter((product) =>
          product.categories?.some(
            (cat) => cat.name_en.toLowerCase() === "cakes",
          ),
        );

        setProducts(cakeProducts);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <section>
      <img
        style={{ width: "100%" }}
        src="/assets/images/ice-cak-bnner.jpg"
        alt="ice cream banner"
      />
      <hr/>
      <div className="tabs-wrapper px-2 mt-4 all-filters-slider d-flex align-items-center position-reative mb-0">
          <button className="cat_left me-3">
          ‹
          </button>
          <div
            className="tabs d-flex"
            style={{ scrollBehavior: "smooth", overflowX: "auto", flex: "1" }}
          >
            <span
              className="d-inline-flex align-items-center justify-content-center rounded-4"
              style={{
                border: "1px solid #c5c5c591",
                width: "80px",
                height: "50px",
                float: "left",
              }}
            >
              <i className="bi bi-image text-muted me-2"></i>
              <span className="ms-2 text-muted fs-14">All</span>
            </span>
            <div className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src="/assets/images/eid-removebg-preview.png" alt="Eid Mubarak"/>
              Eid Mubarak
            </div>
            <div className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src="/assets/images/motherday-removebg-preview.png" alt="Eid Mubarak"/>
              Mother's Day
            </div>
            <div className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src="/assets/images/RAMDAN1-removebg-preview.png" alt="Eid Mubarak"/>
              Ramadan
            </div>
            <div className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src="/assets/images/anniv.png" alt="Eid Mubarak"/>
              Achievement
            </div>
            <div className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src="/assets/images/birthday.png" alt="Eid Mubarak"/>
              Birthday
            </div>
            <div className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src="/assets/images/eidM.png" alt="Eid Mubarak"/>
              Congratulations
            </div>
            <div className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src="/assets/images/Ice-Cream-Cake-100x100-1.png" alt="Eid Mubarak"/>
              General
            </div>
            <div className="tab ms-2">
              <img
                className="img-fluid rounded-circle border-image"
                src="/assets/images/Ice-Cream-Cake-100x100-1.png" alt="Eid Mubarak"/>
            </div>
            <button className="cat_right ms-3">
              ›
          </button>
          <button className="rounded-5 border px-4 mb-2 py-1 text-brown fs-20 bg-transparent d-flex align-items-center gap-1 ms-2" type="button">
            <i className="bi bi-funnel"></i>
          </button>
          </div>
        </div>

      <div className="container-fluid px-5 py-3">
        <div className="row g-4 mt-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-xl-3 col-lg-3 col-md-6 col-sm-12"
            >
              <div className="cakes-card w-100 card border-0 rounded-4 h-100 shadow-sm p-3">
                <img
                  className="w-100 rounded-4"
                  src={product.image_url}
                  alt={product.name_en}
                  style={{ objectFit: "cover", height: "250px" }}
                />
                <div className="card-body text-center">
                  <h6 className="text-center color-brown fs-15 fw-bold">
                    {product.name_en}
                  </h6>
                  <p className="fs-14 text-muted">{product.sku || "N/A"}</p>
                  <p className="text-center text-blue fs-16 fw-medium">
                    SR {product.regular_price}
                  </p>
                  <button
                    onClick={() => router.push(`/cakes/${product.id}/view`)}
                    className="btn rounded-2 px-5 py-2 fs-14 fw-bold bg-pink text-white"
                    type="submit"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
