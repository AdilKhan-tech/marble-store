"use client";
import React, { useEffect, useState } from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import {
  getAllCustomCakeFlavor,
  deleteCustomCakeFlavorById,
} from "@/utils/apiRoutes";
import AddCustomCakeFlavor from "@/components/dashboard/cake/AddCustomCakeFlavor";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";

function page() {
  const { token } = useAxiosConfig();
  const [customCakeFlavors, setCustomCakeFlavors] = useState([]);
  const [customCakeFlavorData, setCustomCakeFlavorData] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  
  // PAGINATION STATES 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);


  const fetchAllCustomCakeFlavor = async () => {
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
      }
      const response = await axios.get(getAllCustomCakeFlavor, { params });
      setCustomCakeFlavors(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount)
    } catch (error) {
      console.error("Error fetching Custom Cake Flavor", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAllCustomCakeFlavor();
  }, [currentPage, pageLimit, keywords, token]);

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (customCakeFlavorId) => {
    try {
      const response = await axios.delete(
        deleteCustomCakeFlavorById(customCakeFlavorId)
      );
      if (response.status === 200) {
        toast.success("Custom cake flavor deleted successfully!", {
          autoClose: 1000,
        });
        setCustomCakeFlavors((prev) =>
          prev.filter(
            (customCakeFlavor) => customCakeFlavor.id !== customCakeFlavorId
          )
        );
      }
    } catch (error) {
      toast.error("Failed to delete Custom Cake Flavor.");
    }
  };

  const showDeleteConfirmation = (customCakeFlavorId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Custom Cake Flavor?"
    );
    if (confirmed) {
      handleDelete(customCakeFlavorId);
    }
  };

  const showOffcanvasOnAddCustomCakeFlavor = () => {
    setCustomCakeFlavorData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditCustomCakeFlavor = (customCakeFlavor) => {
    setCustomCakeFlavorData(customCakeFlavor);
    setShowOffcanvas(true);
  };

  const addCustomCakeFlavor = (newCustomCakeFlavor) => {
    setCustomCakeFlavors(prev => [newCustomCakeFlavor, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCustomCakeFlavor = (updatedCustomCakeFlavor) => {
    setCustomCakeFlavors((prev) =>
      prev.map((customCakeFlavor) =>
        customCakeFlavor.id === updatedCustomCakeFlavor.id ? { ...customCakeFlavor, ...updatedCustomCakeFlavor } : customCakeFlavor
      )
    );
    setShowOffcanvas(false);
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
    <>
    <section className='mt-10'>
      <div className="">
        <p className="pagetitle mb-0 tnt-color">Custom Cake Flavor</p>
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex">
            <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
            <input
              type="text"
              className="form-control px-5 text-dark-custom"
              placeholder="Search here..."
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div style={{ marginInlineEnd: "20px" }}>
            <button
              className="btn-orange"
              onClick={showOffcanvasOnAddCustomCakeFlavor}
              role="button">
              <i className="bi bi-plus-circle ms-1"></i>
              <span className="ms-2">Create</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-0 pt-0 rounded-2 p-0 mt-3">
        <div className="datatable-wrapper">
          <div className="data-table p-2 rounded-4">
            <table className="table datatable datatable-table">
              <thead>
                <tr className="">
                  <th onClick={() => handleSort("id")}>
                    Id<span>{renderSortIcon("id")}</span>
                  </th>
                  <th onClick={() => handleSort("name_en")}>
                  Name <span>{renderSortIcon("name_en")}</span>
                  </th>
                  <th onClick={() => handleSort("slug")}>
                  Slug <span>{renderSortIcon("slug")}</span>
                  </th>
                  <th onClick={() => handleSort("custom_cake_type_id")}>
                  Cake Type <span>{renderSortIcon("custom_cake_type_id")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                  Status <span>{renderSortIcon("status")}</span>
                  </th>
                  <th onClick={() => handleSort("id")}>Action</th>
                </tr>
              </thead>
              <tbody>
                {customCakeFlavors.map((customCakeFlavor, index) => (
                  <tr key={`${customCakeFlavor?.id}-${index}`}>
                    <td>{customCakeFlavor?.id}</td>
                    <td>{customCakeFlavor?.name_en}</td>
                    <td>{customCakeFlavor?.slug}</td>
                    <td>{customCakeFlavor?.customCakeType?.name_en}</td>
                    <td>
                      <div
                        className={customCakeFlavor?.status === "active"? "blue-status": "red-status"}>
                        {customCakeFlavor?.status === "active"? "active": "inactive"}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="action-btn"
                          onClick={() =>showOffcanvasOnEditCustomCakeFlavor(customCakeFlavor)}>
                          <i className="bi bi-pencil-square text-primary"></i>
                        </button>
                        <button
                          className="action-btn"
                          onClick={() =>showDeleteConfirmation(customCakeFlavor?.id)}>
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
          show={showOffcanvas}
          onHide={() => setShowOffcanvas(false)}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <div className="fs-24 fnt-color">
                {customCakeFlavorData
                  ? "Update Custom Cake Flavor"
                  : "Add Custom Cake flavor"}
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr className="mt-0" />
          <Offcanvas.Body>
            <AddCustomCakeFlavor
              closePopup={closePopup}
              customCakeFlavorData={customCakeFlavorData}
              onUpdateCustomCakeFlavor = {updateCustomCakeFlavor}
              onAddCustomCakeFlavor = {addCustomCakeFlavor}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
    <hr/>
    <div className='datatable-bottom'>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        pageLimit={pageLimit}
        totalEntries={totalEntries}
      />
      <EntriesPerPageSelector
        pageLimit={pageLimit}
        onPageLimitChange={handleLimitChange}
      />
    </div>
    </>
  );
}

export default page;
