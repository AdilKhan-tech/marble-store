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

function page() {
  const [customCakeFlavors, setCustomCakeFlavors] = useState([]);
  const [customCakeFlavorData, setCustomCakeFlavorData] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { token } = useAxiosConfig();

  const fetchAllCustomCakeFlavor = async () => {
    try {
      const response = await axios.get(getAllCustomCakeFlavor);
      setCustomCakeFlavors(response.data);
    } catch (error) {
      console.error("Error fetching Custom Cake Flavor", error);
    }
  };
  useEffect(() => {
    if (!token) return;
    fetchAllCustomCakeFlavor();
  }, [token]);

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
      toast.error("Failed to delete Cookie Box Size.");
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

  const closePopup = () => {
    setShowOffcanvas(false);
  };
  return (
    <section style={{ marginTop: "100px" }}>
      <div className="">
        <p className="pagetitle mb-0 tnt-color">Custom Cake Flavor</p>
        <div className="d-flex justify-content-between mt-4">
          <div className="d-flex">
            <i className="bi bi-search fs-20 px-3 py-1 text-secondary position-absolute"></i>
            <input
              type="text"
              className="form-control form-control-lg px-5 text-dark-custom"
              placeholder="Search here..."/>
          </div>
          <div style={{ marginInlineEnd: "20px" }}>
            <button
              className="btn org-btn w-100 py-2 px-4 rounded-3"
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
                  <th>Id</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Cake Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customCakeFlavors.map((customCakeFlavor, index) => (
                  <tr key={`${customCakeFlavor.id}-${index}`}>
                    <td>{customCakeFlavor.id}</td>
                    <td>{customCakeFlavor.name_en}</td>
                    <td>{customCakeFlavor.slug}</td>
                    <td>{customCakeFlavor.cake_type_id}</td>
                    <td>
                      <div
                        className={customCakeFlavor.status === "active"? "blue-status": "red-status"}>
                        {customCakeFlavor.status === "active"? "Active": "Inactive"}
                      </div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <button
                          className="action-btn"
                          onClick={() =>showOffcanvasOnEditCustomCakeFlavor(customCakeFlavor)}>
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button
                          className="action-btn"
                          onClick={() =>showDeleteConfirmation(customCakeFlavor.id)}>
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
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
  );
}

export default page;
