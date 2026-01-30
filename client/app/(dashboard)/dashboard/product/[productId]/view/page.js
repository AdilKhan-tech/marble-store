"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import Common from "@/utils/Common";
import { getProductByIdRoute } from "@/utils/apiRoutes";

export default function Page() {
  const { productId } = useParams();
  const router = useRouter();
  const { token } = useAxiosConfig();
  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(getProductByIdRoute(productId));
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (!token || !productId) return;
    fetchProduct();
  }, [productId, token]);


  if (!product) return <p className="mt-5">Loading...</p>;

  return (
    <div className="mt-5">
      <div className="card p-4 rounded-4">
       <div className="d-flex justify-content-start align-items-center">
          <p className="pagetitle mb-0 fnt-color">Product Details</p>
        </div>
        <hr />

        <div className="row">
          <div className="col-md-3">
            <div
              className="position-relative w-100 bg-white d-flex justify-content-center"
              style={{
                border: "2px dashed #e6e6e6",
                borderRadius: "20px",
                minHeight: "230px",
              }}
            >
              <img
                src={`http://localhost:5000/${product.image_url}`} 
                alt={product.name_en} 
                className="position-absolute top-0 start-0 w-100 h-100 rounded-4"/>
              <i
                className="bi bi-pencil-square fs-4 updatepro position-absolute top-0 end-0 m-2"
                role="button"></i>
            </div>
          </div>

          <div className="col-md-9">
            <div className="row mt-2">
              <div className="col-md-6 mb-3">
                <p className="fs-16 fw-bold mb-0 fnt-color">
                  {product.name_en}
                </p>
                <p className="fs-14 fw-normal">Name English</p>
              </div>
              <div className="col-md-6 mb-3">
                <p className="fs-16 fw-bold mb-0 fnt-color">
                  {product.name_ar}
                </p>
                <p className="fs-14 fw-normal">Name Arabic</p>
              </div>
            </div>

            <div className="">
              <div className="fs-14 fw-bold mb-0 fnt-color" dangerouslySetInnerHTML={{ __html: product.description }}/>
              <p className="fs-14 fw-normal mt-0">Product Description</p>
            </div>
            
            <div className="row">
            <div className="col-md-6 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                {product?.tags?.length
                  ? Common.truncateText(product.tags.map(tag => tag.name_en).join(", "),30)
                  : "N/A"}
              </p>
              <p className="fs-14 fw-normal">Product Tags</p>
            </div>


            <div className="col-md-6 mb-3">
                <p className="fs-16 fw-bold mb-0 fnt-color">
                  {product.gender.name_en}
                </p>
                <p className="fs-14 fw-normal">Gender</p>
              </div>
              </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="row">
            <div className="col-md-4 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                ${product.regular_price}
              </p>
              <p className="fs-14 fw-normal">Price</p>
            </div>

            <div className="col-md-4 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                {product.stock || "In Stock"}
              </p>
              <p className="fs-14 fw-normal">Stock</p>
            </div>

            
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                {product.tax_status}
              </p>
              <p className="fs-14 fw-normal">Tax Status</p>
            </div>

            <div className="col-md-4 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                {product.tax_class}
              </p>
              <p className="fs-14 fw-normal">Tax Class</p>
            </div>

            <div className="col-md-4 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                {product.sku || "N/A"}
              </p>
              <p className="fs-14 fw-normal">Product SKU</p>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                {product?.branches?.length
                  ? Common.truncateText(product.branches.map(branch => branch.name_en).join(", "),30)
                  : "N/A"}
              </p>
              <p className="fs-14 fw-normal">Product Branches</p>
            </div>

            <div className="col-md-4 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                {product?.occasions?.length
                  ? Common.truncateText(product.occasions.map(occasion => occasion.name_en).join(", "),30)
                  : "N/A"}
              </p>
              <p className="fs-14 fw-normal">Product Occasions</p>
            </div>

            <div className="col-md-4 mb-3">
              <p className="fs-16 fw-bold mb-0 fnt-color">
                {product?.categories?.length
                  ? Common.truncateText(product.categories.map(category => category.name_en).join(", "),30)
                  : "N/A"}
              </p>
              <p className="fs-14 fw-normal">Product Categories</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
