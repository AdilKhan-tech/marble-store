"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { getAllProductsRoute } from "@/utils/apiRoutes";

export default function Cakes() {
  const {token} = useAxiosConfig()
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!token) return;
    const fetchProducts = async () => {
      try {
        const res = await axios.get(getAllProductsRoute);
        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products", err);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <>
      <section>
        {/* Banner */}
        <img
          style={{ marginTop: "134px", width: "100%" }}
          src="/assets/images/ice-cak-bnner.jpg"
          alt="cake banner"
        />

        <div className="container-fluid px-5 py-5">
          <div className="bg-white">

            {/* Products Grid */}
            <div className="row g-4">
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
                      <h6 className="color-brown fs-5 fw-bold">
                        {product.name_en}
                      </h6>

                      <p className="fs-14 text-muted">
                        {product.sku || "N/A"}
                      </p>

                      <p className="text-primary fs-5 fw-semibold">
                        SR {product.regular_price}
                      </p>

                      <button className="btn btn-primary rounded-5 px-4">
                        Add to Cart
                      </button>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
