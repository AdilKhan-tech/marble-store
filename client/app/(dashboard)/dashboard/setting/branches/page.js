"use client";
import React from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import AddBranch from '@/components/dashboard/setting/AddBranch';
import { getAllBranches, deleteBranchById } from "@/utils/apiRoutes";

export default function BranchPage() {
  const { token } = useAxiosConfig();
  const [branches, setBranches] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [branchData, setBranchData] = useState(null);

  const fetchBranches = async () => {
    try {
      const response = await axios.get(getAllBranches);
      setBranches(response.data);
    } catch (error) {
      console.error("Error fetching cake sizes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchBranches();
  }, [token]);

  const showOffcanvasOnEditBranch = (branch) => {
    setBranchData(branch);
    setShowOffcanvas(true);
  }

  const showOffcanvasOnAddBranch = () => {
    setBranchData(null);
    setShowOffcanvas(true)
  }

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const handleDelete = async (branchId) => {
    try {
      const response = await axios.delete(deleteBranchById(branchId));
      if(response.status === 200) {
          toast.success("Branch deleted successfully!", {autoClose: 1000});
          setBranches((prev) =>
            prev.filter((branch) => branch.id !== branchId)
          );
      }
    }catch (error){
      console.error("Error deleting branch", error);
      toast.error("Failed to delete branch");
    }
  }

  const showDeleteConfirmation = (branchId) => {
    const confirmed = window.confirm("Are you sure you want to delete this Branch?");
    if(confirmed){
        handleDelete(branchId)
    }
  }

  const addBranch = (newBranch) => {
    setBranches(prev => [newBranch, ...prev]);
    setShowOffcanvas(false);
  };

  const updateBranch = (updatedBranch) => {
    setBranches((prev) =>
      prev.map((branch) =>
        branch.id === updatedBranch.id
          ? { ...branch, ...updatedBranch }
          : branch
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
    <section className="" style={{ marginTop: "100px" }}>
      <div className="">
        <p className="pagetitle mb-0 fnt-color">Branches</p>
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex">
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
              onClick={showOffcanvasOnAddBranch}
              role="button"
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
                  <th onClick={() => handleSort("slug")}>
                    Slug<span>{renderSortIcon("slug")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Status<span>{renderSortIcon("status")}</span>
                  </th>
                  <th onClick={() => handleSort("timing")}>
                    Timing<span>{renderSortIcon("timing")}</span>
                  </th>
                  <th onClick={() => handleSort("city")}>
                    City<span>{renderSortIcon("city")}</span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {branches.map((branch, index) => (
                  <tr key={branch?.id}>
                    <td>{branch?.id}</td>
                    <td>{branch?.name_en}</td>
                    <td>{branch?.slug}</td>
                    <td>{branch?.status}</td>
                    <td>{branch?.timing}</td>
                    <td>{branch?.city}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="btn btn-sm btn-light p-2"
                          onClick={() => showOffcanvasOnEditBranch(branch)}
                        >
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-light p-2"
                          onClick={() => showDeleteConfirmation(branch.id)}
                        >
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
              {branchData ? "Update Branch" : "Add Branch"}
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr className="mt-0" />
          <Offcanvas.Body>
            <AddBranch
              branchData={branchData}
              closePopup={closePopup}
              onAddBranch={addBranch}
              onUpdateBranch={updateBranch}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
  );
}

