"use client";
import React from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddIceCreamSize from "@/components/dashboard/icecream/AddIceCreamPortionSize";
import { useEffect, useState } from "react";
import { getAllIceCreamPortionSizes, deleteIceCreamPortionSizeById } from "@/utils/apiRoutes";
import Offcanvas from "react-bootstrap/Offcanvas";
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";

export default function IceCreamPortionSizePage() {
  const { token } = useAxiosConfig();
  const [iceCreamPortionSizes, setIceCreamPortionSizes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [iceCreamPortionData, setIceCreamPortionSizeData] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC")

  // PAGINATION STATES 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchIceCreamPortionSizes = async () => {
    if (!token) return;
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      }
      const response = await axios.get(getAllIceCreamPortionSizes, { params });
      setIceCreamPortionSizes(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);

    } catch (error) {
      console.error("Error fetching icecream Portion Sizes", error);
    }
  };

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchIceCreamPortionSizes();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchIceCreamPortionSizes();
    }
}, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasOnAddCakesSize = () => {
    setIceCreamPortionSizeData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditCakesSize = (icecream) => {
    setIceCreamPortionSizeData(icecream);
    setShowOffcanvas(true);
  };

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

  const handleDelete = async (iceCreamId) => {
    try {
      const response = await axios.delete(deleteIceCreamPortionSizeById(iceCreamId));
      if(response.status === 200) {
        toast.success("Ice Cream portion size deleted successfully!", {autoClose: 1000});
        setIceCreamPortionSizes((prev) =>
          prev.filter((iceCreamPortionSize) => iceCreamPortionSize.id !== iceCreamId)
        );
      }
    } catch (error) {
      console.error("Error deleting Ice Cream size:", error);
      toast.error("Failed to delete Ice Cream size.");
    }
  };

  const showDeleteConfirmation = (iceCreamId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Ice Cream size?"
    );
    if (confirmed) {
      handleDelete(iceCreamId);
    }
  };

  const addIceCreamPortionSize = (newIceCream) => {
    setIceCreamPortionSizes((prev) => [newIceCream, ...prev]);
    setShowOffcanvas(false);
  };

  const updateIceCreamPortionSize = (updatedIceCream) => {
    setIceCreamPortionSizes((prev) =>
      prev.map((item) =>
        item.id === updatedIceCream.id ? updatedIceCream : item
      )
    );
    setShowOffcanvas(false);
  };

  const handleSort = (field) => {
    setCurrentPage(1);

    if (sortField === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortField(field);
      setSortOrder("ASC");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return "⇅";
    return sortOrder === "ASC" ? "↑" : "↓";
  };

  return (
    <>
      <section className="mt-10">
        <div className="">
          <p className="pagetitle fnt-color">Ice Cream Portion Sizes</p>
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
              <div
                className="btn-orange"
                onClick={showOffcanvasOnAddCakesSize}
                role="button"
              >
                <i className="bi bi-plus-circle me-2"></i>
                <span>Create</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-0 pt-0 rounded-2 p-0 mt-3">
          <div className="datatable-wrapper">
            <div className="data-table p-2 rounded-4">
              <table className="table datatable datatable-table">
                <thead className="">
                  <tr className="">
                    <th onClick={() => handleSort("id")}>
                    ID <span>{renderSortIcon("id")}</span>
                    </th>
                    <th onClick={() => handleSort("name_en")}>
                    Name <span>{renderSortIcon("name_en")}</span>
                    </th>
                    <th onClick={() => handleSort("icecream_bucket_id")}>
                    Icecream Bucket <span>{renderSortIcon("icecream_bucket_id")}</span>
                    </th>
                    <th onClick={() => handleSort("slug")}>
                    Slug <span>{renderSortIcon("slug")}</span>
                    </th>
                    <th onClick={() => handleSort("status")}>
                    Status <span>{renderSortIcon("status")}</span>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {iceCreamPortionSizes.map((icecream, index) => (
                    <tr key={`${icecream.id}-${index}`}>
                      <td>{icecream.id}</td>
                      <td>{icecream.name_en}</td>
                      <td>{icecream.icecream_bucket_id}</td>
                      <td>{icecream.slug}</td>
                      <td>
                        <div className={icecream?.status === "active"? "blue-status": "red-status"}>
                          {icecream?.status === "active"? "Active": "Inactive"}
                        </div>
                      </td>

                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="action-btn"
                            onClick={() =>
                              showOffcanvasOnEditCakesSize(icecream)
                            }
                          >
                            <i className="bi bi-pencil-square text-primary"></i>
                          </button>
                          <button
                            className="action-btn"
                            onClick={() => showDeleteConfirmation(icecream.id)}
                          >
                            <i className="bi bi-trash text-danger"></i>
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
                  {iceCreamPortionData
                    ? "Update Ice Cream Portion Size"
                    : "Add Ice Cream Portion Size"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddIceCreamSize
                iceCreamPortionData={iceCreamPortionData}
                closePopup={closePopup}
                onAddIceCreamPortionSize={addIceCreamPortionSize}
                onUpdateIceCreamPortionSize={updateIceCreamPortionSize}
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
