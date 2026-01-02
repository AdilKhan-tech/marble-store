"use client";
import React, { use } from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAllGenders,deleteGenderById } from "@/utils/apiRoutes";
import Offcanvas from "react-bootstrap/Offcanvas";
import AddGender from "@/components/dashboard/setting/AddGender";

export default function GenderPage() {
  const { token } = useAxiosConfig();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [genderData , setGenderData] = useState(null)
  const [genders, setGenders] = useState([]);

  const fetchAllGenders = async () => {
    try {
      const response = await axios.get(getAllGenders);
      setGenders(response.data);
    } catch (error) {
      console.error("Error fetching genders", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAllGenders();
  }, [token]);

  const showOffcanvasOnAddGender = () => {
    setGenderData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditGender = (gender) => {
    setGenderData(gender);
    setShowOffcanvas(true);
  };

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const handleDelete = async (genderId) => {
    try {
      const response = await axios.delete(deleteGenderById(genderId));
      if (response.status === 200) {
        toast.success("Gender deleted successfully!", { autoClose: 1000 });
        setGenders((prev) => prev.filter((gender) => gender.id !== genderId));
      }
    } catch (error) {
      toast.error("Failed to delete Gender.");
    }
  };

  const showDeleteConfirmation = (genderId) => {
    if (confirm("Are you sure you want to delete this Gender?")) {
      handleDelete(genderId);
    }
  };

  const addGender = (newGender) => {
    setGenders((prev) => [newGender, ...prev]);
    setShowOffcanvas(false);
  };

  const updateGender = (updatedGender) => {
    setGenders((prev) =>
      prev.map((item) =>
        item.id === updatedGender.id ? updatedGender : item
      )
    );
    setShowOffcanvas(false);
  };

  return (
    <section className="" style={{ marginTop: "100px" }}>
      <div className="">
        <p className="pagetitle mb-0 fnt-color">Genders</p>
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex">
            <i className="bi bi-search fs-5 px-3 py-2 text-secondary position-absolute"></i>
            <input
              type="text"
              className="form-control form-control-lg px-5 text-dark-custom"
              placeholder="Search here..."
            />
          </div>
          <div style={{ marginInlineEnd: "20px" }}>
            <div
              className="org-btn py-2 px-4 rounded-3"
              role="button"
              onClick={showOffcanvasOnAddGender}
            >
              <i className="bi bi-plus-circle ms-2"></i>
              <span className="ms-1">Create</span>
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
                  <th>ID</th>
                  <th>Name</th>
                  <th>Parent Gender</th>
                  <th>Slug</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {genders.map((gender, index) => (
                  <tr key={`${gender.id}-${index}`}>
                    <td>{gender.id}</td>
                    <td>{gender.name_en}</td>
                    <td>{gender.parent_gender}</td>
                    <td>{gender.slug}</td>
                    
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="action-btn"
                          onClick={() => showOffcanvasOnEditGender(gender)}
                        >
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button
                          className="action-btn"
                          onClick={() => showDeleteConfirmation(gender.id)}
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
                {genderData ? "Update Gender": "Add Gender"}
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <hr className="mt-0" />
          <Offcanvas.Body>
            <AddGender
              closePopup={closePopup}
              genderData = {genderData}
              onAddGender = {addGender}
              onUpdateGender ={updateGender}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
  );
}
