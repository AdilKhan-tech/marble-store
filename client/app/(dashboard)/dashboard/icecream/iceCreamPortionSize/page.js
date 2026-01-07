"use client";
import React from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddIceCreamSize from "@/components/dashboard/icecream/AddIceCreamPortionSize";
import { useEffect, useState } from "react";
import { getAllIceCreamPortionSizes, deleteIceCreamPortionSizeById } from "@/utils/apiRoutes";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function IceCreamPortionSizePage() {
  const { token } = useAxiosConfig();
  const [iceCreamPortionSizes, setIceCreamPortionSizes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [iceCreamPortionData, setIceCreamPortionSizeData] = useState(null);

  const fetchIceCreamPortionSizes = async () => {
    try {
      const response = await axios.get(getAllIceCreamPortionSizes);
      setIceCreamPortionSizes(response.data.data);
    } catch (error) {
      console.error("Error fetching icecream Portion Sizes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchIceCreamPortionSizes();
  }, [token]);

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

  return (
    <>
      <section className="content-contianer">
        <div className="">
          <p className="pagetitle fnt-color">IceCream Sizes</p>
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
              <div
                className="org-btn py-2 px-4 rounded-3"
                onClick={showOffcanvasOnAddCakesSize}
                role="button"
              >
                <i className="bi bi-plus-circle ms-2"></i>
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
                    <th>ID</th>
                    <th>Name</th>
                    <th>Icecream Bucket </th>
                    <th>Slug</th>
                    <th>Additional Price</th>
                    <th>Calorie</th>
                    <th>Status</th>
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
                      <td>{icecream.additional_price}</td>
                      <td>{icecream.calories}</td>
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
                            <i className="bi bi-pencil text-primary"></i>
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
    </>
  );
}
