'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddFlavour from "@/components/dashboard/cake/AddCakeFlavours";
import { useEffect, useState } from 'react';
import { getCakesFlavour, deleteCakesFlavour, updateCakesFlavour } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function CakeFlavour() {

  const {token} = useAxiosConfig();
  const [flavor, setFlavor] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [flavorData, setFlavorData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCakeFlavors = async () => {
    try {
      const response = await axios.get(getCakesFlavour);
      setFlavor(response.data)
        } catch (error) {
      console.error("Error fetching cake Flavors", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCakeFlavors();
  }, [token]);

  const showOffcanvasOnAddCakesFlavour = () => {
        setFlavorData(null);
        setShowOffcanvas(true);
     }
     const showOffcanvasOnEditCakesFlavour = (flavor) => {
        setFlavorData(flavor);
        setShowOffcanvas(true);
     }
     const closePopup = () => {
        setShowOffcanvas(false);
    };

      const handleDelete = async (flavorId) => {
      try {
          const response = await axios.delete(deleteCakesFlavour(flavorId));
          if(response.status === 200) {
              toast.success("Cake flavour deleted successfully!", {autoClose: 1000});
              fetchCakeFlavors();
          }
      }catch (error){
          console.error("Error deleting Cake flavour:", error);
          toast.error("Failed to delete Cake flavour.");
          }
      }
      const showDeleteConfirmation = (flavorId) => {
          const confirmed = window.confirm("Are you sure you want to delete this Cake flavour?");
          if(confirmed){
              handleDelete(flavorId)
          }
      }
    const addFlavorToState = () => {
     fetchCakeFlavors(); 
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
  const toggleLetterStatus = async (flavor) => {
    const currentStatus = String(flavor.status || "").toLowerCase();
    const newStatus = currentStatus === "active" ? "in-active" : "active";
    try {
      const response = await axios.put(updateCakesFlavour(flavor.id), {
        status: newStatus,
      });
      if (response.status === 200) {
        setFlavor((prev) =>
          prev.map((f) => (f.id === flavor.id ? { ...f, status: newStatus } : f))
        );
        toast.success(`Status updated to ${newStatus}`, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status!", { autoClose: 3000 });
    }
  };

  return (
    <>
    <section className='' style={{ marginTop:"100px"}}>
      <div className=""> 
      <p className="pagetitle mb-0 fnt-color">Cakes Flavours</p>
      <div className='d-flex justify-content-between mt-4'>
        <div className='d-flex'>
            <i className='bi bi-search fs-20 py-1 px-2 text-secondary bg-light rounded-3 border rounded-end-0 border-end-0'></i>
            <input type="text" className="form-control border rounded-start-0 border-start-0" placeholder="Search here..." style={{height:"43px", width:"300px"}}/>
            </div>
            <div style={{marginInlineEnd:"20px"}}>
              <div className='org-btn py-2 px-4 rounded-3' onClick={showOffcanvasOnAddCakesFlavour} role='button'><i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span></div>
            </div>
        </div>
        </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-3">

        <div className="">
          <div className="data-table">
            <table className="table datatable-wrapper">
              <thead>
                <tr className=''>
                  <th onClick={() => handleSort("id")}>
                  ID<span className="fs-12 text-secondary">{renderSortIcon("id")}</span></th>
                  <th onClick={() => handleSort("name_en")}>
                  Name<span className="fs-12 text-secondary">{renderSortIcon("name_en")}</span></th>
                  <th onClick={() => handleSort("category_id")}>
                  Category<span className="fs-12 text-secondary">{renderSortIcon("category_id")}</span></th>
                  <th onClick={() => handleSort("slug")}>
                  Slug<span className="fs-12 text-secondary">{renderSortIcon("slug")}</span></th>
                  <th onClick={() => handleSort("additional_price")}>
                  Additional Price<span className="fs-12 text-secondary">{renderSortIcon("additional_price")}</span></th>
                  <th onClick={() => handleSort("symbol")}>
                  Symbol<span className="fs-12 text-secondary">{renderSortIcon("symbol")}</span></th>
                  <th onClick={() => handleSort("status")}>
                  Status<span className="fs-12 text-secondary">{renderSortIcon("status")}</span></th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {flavor.map((flavor, index) => (
                  <tr key={index}>
                    <td>{flavor?.id}</td>
                    <td>{flavor?.name_en}</td>
                    <td>{flavor?.category_id}</td>
                    <td>{flavor?.slug}</td>
                    <td>{flavor?.additional_price}</td>
                    <td>{flavor?.symbol}</td>
                    <td className="text-secondary fs-16">
                    <div className="form-check form-switch ms-3">
                      <input className="form-check-input fs-5" type="checkbox" role="switch"
                        checked={String(flavor?.status || "").toLowerCase() === "active"}
                        onChange={() => toggleLetterStatus(flavor)}/>
                    </div>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="action-btn border-secondary" onClick={() => showOffcanvasOnEditCakesFlavour(flavor)}>
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="action-btn border-secondary" onClick={() => showDeleteConfirmation(flavor.id)}>
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
                placement="end">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                   <div className='fs-24'>
                     {flavorData ? "Update Flavour" : "Add Flavour"}
                   </div>
                </Offcanvas.Title>
                </Offcanvas.Header>
                <hr  className="mt-0"/>
                <Offcanvas.Body>
                 <AddFlavour
                    flavorData={flavorData}
                    closePopup={closePopup}
                    onAddFlavor={addFlavorToState}
                />
                </Offcanvas.Body>
            </Offcanvas>
            <ToastContainer />

      </div>
    </section>
    </>
    
  )
}
