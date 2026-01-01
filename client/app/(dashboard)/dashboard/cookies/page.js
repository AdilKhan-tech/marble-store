"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import AddCookie from "@/components/dashboard/cookies/AddCookie";
import { ToastContainer, toast } from "react-toastify";
import Offcanvas from "react-bootstrap/Offcanvas";
import { getAllCookies, deleteCookiesById } from "@/utils/apiRoutes";

export default function Cookies() {
  const { token } = useAxiosConfig();
  const [cookies, setCookies] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cookieData, setCookieData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCookies = async () => {
    try {
      const response = await axios.get(getAllCookies);
      setCookies(response?.data);
    } catch (error) {
      console.error("Error fetching Cookie", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCookies();
  }, [token]);

  const showOffcanvasOnAddCookies = () => {
    setCookieData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditCookies = (cookies) => {
    setCookieData(cookies);
    setShowOffcanvas(true);
  };

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const handleDelete = async (cookieId) => {
    try {
      const response = await axios.delete(deleteCookiesById(cookieId));
      if (response.status === 200) {
        toast.success("Cookie deleted successfully!", { autoClose: 1000 });
        setCookies((prev) => prev.filter((cookie) => cookie.id !== cookieId));
      }
    } catch (error) {
      toast.error("Failed to delete Cookie.");
    }
  };

  const showDeleteConfirmation = (cookiesId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Cookie?"
    );
    if (confirmed) {
      handleDelete(cookiesId);
    }
  };

  const addCookie = (newCookie) => {
    setCookies((prev) => [newCookie, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCookie = (updatedCookie) => {
    setCookies((prev) =>
      prev.map((cookie) =>
        cookie.id === updatedCookie.id
          ? { ...cookie, ...updatedCookie }
          : cookie
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
    <section style={{ marginTop: "100px" }}>
      <div className="">
        <p className="pagetitle mb-0 fnt-color">Cookies</p>
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex gap-5">
            <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
            <input
              type="text"
              className="form-control form-control-lg px-5 text-dark-custom"
              placeholder="Search here..."
            />
          </div>
          <div style={{ marginInlineEnd: "20px" }}>
            <button
              className="btn org-btn w-100 py-2 px-4 rounded-3"
              role="button"
              onClick={showOffcanvasOnAddCookies}
            >
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
              <thead className="">
                <tr className="">
                  <th onClick={() => handleSort("id")}>
                    ID<span>{renderSortIcon("id")}</span>
                  </th>
                  <th onClick={() => handleSort("name_en")}>
                    Name<span>{renderSortIcon("name_en")}</span>
                  </th>
                  <th onClick={() => handleSort("cookie_type_id")}>
                    Cookies Box Type<span>{renderSortIcon("cookie_type_id")}</span>
                  </th>
                  <th onClick={() => handleSort("slug")}>
                    slug<span>{renderSortIcon("slug")}</span>
                  </th>
                  <th onClick={() => handleSort("sort")}>
                    sort<span>{renderSortIcon("sort")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    status<span>{renderSortIcon("status")}</span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cookies.map((cookie, index) => (
                  <tr key={cookie.id || cookie.id || index}>
                    <td>{cookie?.id}</td>
                    <td>{cookie?.name_en}</td>
                    <td>{cookie?.type?.name_en}</td>
                    <td>{cookie?.slug}</td>
                    <td>{cookie?.sort}</td>
                    <td>
                      <div
                        className={cookie?.status === "active"? "blue-status": "red-status"}>
                        {cookie?.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className="d-flex gap-2">
                      <div
                        className="action-btn"
                        onClick={() => showOffcanvasOnEditCookies(cookie)}
                      >
                        <i className="bi bi-pencil text-primary"></i>
                      </div>
                      <div
                        className="action-btn"
                        onClick={() => showDeleteConfirmation(cookie?.id)}
                      >
                        <i className="bi bi-trash text-danger"></i>
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
                {cookieData ? "Update Cookie" : "Add Cookie"}
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr className="mt-0" />
          <Offcanvas.Body>
            <AddCookie
              cookieData={cookieData}
              closePopup={closePopup}
              onAddCookie={addCookie}
              onUpdateCookie={updateCookie}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
  );
}
