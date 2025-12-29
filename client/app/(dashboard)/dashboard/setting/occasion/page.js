"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getAllOcassions } from "@/utils/apiRoutes";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import AddOccasion from "@/components/dashboard/setting/AddOccasion";

function Occasions() {
  const { token } = useAxiosConfig();
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [occasions, setOccasions] = useState([]);
  const [occasionData, setOccasionData] = useState(null);
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const fetchOccasions = async () => {
    try {
      const response = await axios.get(getAllOcassions);
      setOccasions(response.data.occasions);
    } catch (error) {
      console.error("Error fetching box sizes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchOccasions();
  }, [token]);

  const showOffcanvasOnAddCakesSize = () => {
    setOccasionData(null);
    setShowOffCanvas(true);
  };

  const showOffcanvasOnEditCakesSize = (occasion) => {
    setOccasionData(occasion);
    setShowOffCanvas(true);
  };
  const closePopup = () => {
    setShowOffCanvas(false);
  };

  const handleSort = (field) => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };

  const renderSortIcon = (field) => {
    return sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "↑↓";
  };
  return (
    <section className="" style={{ marginTop: "100px" }}>
      <div className="">
        <p className="pagetitle mb-0 fnt-color">Occasions</p>
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex">
            <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
            <input
              type="text"
              className="form-control form-control-lg px-5 text-dark-custom"
              placeholder="Search here..."
            />
          </div>
          <button
            style={{ marginInlineEnd: "20px" }}
            className="btn org-btn py-2 px-4 rounded-3 d-flex"
            onClick={showOffcanvasOnAddCakesSize}
          >
            <i className="bi bi-plus-circle"></i>Create
          </button>
        </div>
      </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-3">
        <div className="datatable-wrapper">
          <div className="data-table p-2 rounded-4">
            <table className="datatable table datatable-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("status")}>
                    ID<span>{renderSortIcon("status")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Name<span>{renderSortIcon("status")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Description<span>{renderSortIcon("status")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Slug<span>{renderSortIcon("status")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Count<span>{renderSortIcon("status")}</span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {occasions.map((occasion, index) => (
                  <tr key={`${occasion.id}-${index}`}>
                    <td>{occasion.id}</td>
                    <td>{occasion.name_en}</td>
                    <td>{occasion.description || "N/A"}</td>
                    <td>{occasion.slug}</td>
                    <td>{occasion.count || "N/A"}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="action-btn" onClick={()=>showOffcanvasOnEditCakesSize(occasion)}>
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="action-btn">
                          <i className="bi bi-trash3 text-danger"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Offcanvas
          show={showOffCanvas}
          onHide={() => setShowOffCanvas(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="fs-24 fnt-color">
                {occasionData ? "Update Occasion" : "Add Occasion"}
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr className="mt-0" />
          <Offcanvas.Body>
            <AddOccasion
             closePopup={closePopup}
             occasions={occasions}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
  );
}

export default Occasions;
