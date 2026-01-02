"use client";
import React from "react";
import { useState, useEffect } from "react";
import Common from "@/utils/Common";
import {getAllProducts} from "@/utils/apiRoutes"
import useAxiosConfig from '@/hooks/useAxiosConfig';
import axios from "axios";
import Link from "next/link";

export default function CakeFlavourPage() {
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [products, setProducts] = useState([]);
  const {token} = useAxiosConfig();

  const fetchAllProduct = async () => {
    try {
      const response = await axios.get(getAllProducts);
      setProducts(response?.data);
    } catch (error) {
      console.error("Error fetching Products", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAllProduct();
  }, [token]);

  const handleSort = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };
  const renderSortIcon = (field) => {
    return sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "↑↓";
  };

  const cleanHTML = (html) => {
    if (!html) return "";
    return html.replace(/<\/?p>/g, "");
  };

  return (
    <>
      <section className="" style={{ marginTop: "100px" }}>
        <div className="">
          <p className="pagetitle mb-0 fnt-color">Products</p>
          <div className="d-flex justify-content-between mt-4">
            <div className="d-flex">
              <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
              <input
                type="text"
                className="form-control px-5 text-dark-custom"
                placeholder="Search here..."
                style={{ height: "43px", width: "300px" }}
              />
            </div>
            <div style={{ marginInlineEnd: "20px" }}>
            <Link href="/dashboard/product/add" className="text-decoration-none">
              <div className="org-btn py-2 px-4 rounded-3" role="button">
                <i className="bi bi-plus-circle ms-2"></i>
                <span className="ms-1">Create</span>
              </div>
            </Link>

            </div>
          </div>
        </div>
        <div className="px-0 pt-0 rounded-2 p-0 mt-3">
          <div className="">
            <div className="data-table">
              <table className="table datatable-wrapper">
                <thead>
                  <tr className="">
                    <th>
                      <div className="form-check fs-5">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </th>

                    <th onClick={() => handleSort("name_en")}>
                      Name
                      <span className="fs-12 text-secondary">
                        {renderSortIcon("name_en")}
                      </span>
                    </th>

                    <th onClick={() => handleSort("sku")}>
                      SKU
                      <span className="fs-12 text-secondary">
                        {renderSortIcon("sku")}
                      </span>
                    </th>

                    <th onClick={() => handleSort("stock")}>
                      Stock
                      <span className="fs-12 text-secondary">
                        {renderSortIcon("stock")}
                      </span>
                    </th>

                    <th onClick={() => handleSort("price")}>
                      Price
                      <span className="fs-12 text-secondary">
                        {renderSortIcon("price")}
                      </span>
                    </th>

                    <th onClick={() => handleSort("category")}>
                      Categories
                      <span className="fs-12 text-secondary">
                        {renderSortIcon("category")}
                      </span>
                    </th>

                    <th onClick={() => handleSort("date")}>
                      Date
                      <span className="fs-12 text-secondary">
                        {renderSortIcon("date")}
                      </span>
                    </th>

                    <th onClick={() => handleSort("branches")}>
                      Branches
                      <span className="fs-12 text-secondary">
                        {renderSortIcon("branches")}
                      </span>
                    </th>

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="form-check fs-5">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td>Graduation free box</td>
                    <td>---</td>
                    <td>In stock</td>
                    <td>0.00 SR</td>
                    <td>Promotions</td>
                    <td>2025/05/01 at 9:04 am</td>
                    <td>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: cleanHTML(
                            Common.truncateText(
                              "Alkhaldiyah, Dammam Madinat, Laban, Mohammadyiah, Olaya, Qurtoba, Rabwah, Rakkah, Rawdah, Sahafa",
                              20
                            )
                          ),
                        }}
                      />
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="action-btn border-secondary">
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="action-btn border-secondary">
                          <i className="bi bi-trash3 text-danger"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
