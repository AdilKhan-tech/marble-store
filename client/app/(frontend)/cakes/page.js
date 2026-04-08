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
        const cakeProducts = res.data.data.filter(product =>
          product.categories?.some(cat => cat.name_en.toLowerCase() === "cakes")
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

      <div className="container-fluid px-5 py-5">
        <div className="bg-white">
          <div className="row g-4">
            {products.map(product => (
              <div key={product.id} className="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <div className="cakes-card w-100 card border-0 rounded-4 h-100 shadow-sm p-3">
                  <img
                    className="w-100 rounded-4"
                    src={product.image_url}
                    alt={product.name_en}
                    style={{ objectFit: "cover", height: "250px" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="text-center color-brown fs-15 fw-bold">{product.name_en}</h6>
                    <p className="fs-14 text-muted">{product.sku || "N/A"}</p>
                    <p className="text-center text-blue fs-16 fw-medium">SR {product.regular_price}</p>
                    <button
                      onClick={() => router.push(`/cakes/${product.id}/view`)}
                      className="btn rounded-2 px-5 py-2 fs-14 fw-bold bg-pink text-white" type="submit"
                    >
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
  );
}