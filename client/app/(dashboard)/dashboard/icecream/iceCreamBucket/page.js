"use client";
import React from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddIceCreamBucket from "@/components/dashboard/icecream/AddIceCreamBucket";
import { useEffect, useState } from "react";
import { getAllIceCreamBuckets, deleteIceCreamBucketById,} from "@/utils/apiRoutes";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function IceCreamBucketPage() {
  const { token } = useAxiosConfig();
  const [iceCreamBucket, setIceCreamBucket] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [iceCreamBucketData, setIceCreamBucketData] = useState(null);

  const fetchAllIceCreamBucket = async () => {
    try {
      const response = await axios.get(getAllIceCreamBuckets);
      setIceCreamBucket(response.data.data);
    } catch (error) {
      console.error("Error fetching Ice Cream Buckets", error);
    }
  };
  useEffect(() => {
    if (!token) return;
    fetchAllIceCreamBucket();
  }, [token]);

  const showOffcanvasOnAddIceCreamBucket = () => {
    setIceCreamBucketData(null);
    setShowOffcanvas(true);
  };
  const showOffcanvasOnEditIceCreamBucket = (icecream) => {
    setIceCreamBucketData(icecream);
    setShowOffcanvas(true);
  };
  const closePopup = () => {
    setShowOffcanvas(false);
  };
  const handleDelete = async (iceCreamId) => {
    try {
      const response = await axios.delete(deleteIceCreamBucketById(iceCreamId));
      if (response.status === 200) {
      toast.success("Ice Cream Bucket deleted successfully!", {autoClose: 1000,});
        setIceCreamBucket((prev) =>
          prev.filter((iceCreamBucket) => iceCreamBucket.id !== iceCreamId)
        );
      }
    } catch (error) {
      console.error("Error deleting Ice Cream Bucket:", error);
      toast.error("Failed to delete Ice Cream Bucket.");
    }
  };
  const showDeleteConfirmation = (iceCreamId) => {
    const confirm = window.confirm("Are you sure you want to delete this Ice Cream Bucket?" );
    if (confirm) {
      handleDelete(iceCreamId);
    }
  };
  const addIceCreamBucket = (newIceCream) => {
    setIceCreamBucket((prev) => [newIceCream, ...prev]);
    setShowOffcanvas(false);
  };
  const updateIceCreamBucket = (updatedIceCream) => {
    setIceCreamBucket((prev) =>
      prev.map((item) =>
        item.id === updatedIceCream.id ? updatedIceCream : item
      )
    );
    setShowOffcanvas(false);
  };
  return (
    <>
      <section className="" style={{ marginTop: "100px" }}>
        <div className="">
          <p className="pagetitle fnt-color">Ice Cream Bucket</p>
          <div className="d-flex justify-content-between mt-4">
            <div className="d-flex">
              <i className="bi bi-search fs-20 py-1 px-2 text-secondary bg-light rounded-3 border rounded-end-0 border-end-0"></i>
              <input
                type="text"
                className="form-control border rounded-start-0 border-start-0"
                placeholder="Search here..."
                style={{ height: "46px", width: "300px" }}
              />
            </div>
            <div style={{ marginInlineEnd: "20px" }}>
              <div
                className="org-btn py-2 px-4 rounded-3"
                onClick={showOffcanvasOnAddIceCreamBucket}
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
                    <th>Slug</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {iceCreamBucket.map((icecream, index) => (
                    <tr key={`${icecream.id}-${index}`}>
                      <td>{icecream.id}</td>
                      <td>{icecream.name_en}</td>
                      <td>{icecream.slug}</td>
                      <td>{icecream.size}</td>
                      <td>{icecream.price}</td>
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
                              showOffcanvasOnEditIceCreamBucket(icecream)
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
                  {iceCreamBucketData
                    ? "Update Ice Cream Bucket"
                    : "Add Ice Cream Bucket"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddIceCreamBucket
                closePopup={closePopup}
                iceCreamBucketData={iceCreamBucketData}
                addIceCreamBucket={addIceCreamBucket}
                updateIceCreamBucket={updateIceCreamBucket}
              >
                </AddIceCreamBucket>
            </Offcanvas.Body>
          </Offcanvas>
          <ToastContainer />
        </div>
      </section>
    </>
  );
}
