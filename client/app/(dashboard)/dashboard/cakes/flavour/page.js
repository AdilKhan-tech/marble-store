'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddCakeFlavour from "@/components/dashboard/cake/AddCakeFlavour";
import { useEffect, useState } from 'react';
import { getAllCakeFlavours, deleteCakeFlavourById } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function CakeFlavourPage() {

  const {token} = useAxiosConfig();
  const [cakeFlavors, setCakeFlavors] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cakeFlavorData, setCakeFlavorData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCakeFlavors = async () => {
    try {
      const response = await axios.get(getAllCakeFlavours);
      setCakeFlavors(response.data)
    } catch (error) {
      console.error("Error fetching cake Flavors", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCakeFlavors();
  }, [token]);

  const showOffcanvasOnAddCakesFlavour = () => {
    setCakeFlavorData(null);
    setShowOffcanvas(true);
  }

  const showOffcanvasOnEditCakesFlavour = (flavor) => {
    setCakeFlavorData(flavor);
    setShowOffcanvas(true);
  }

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const handleDelete = async (flavorId) => {
    try {
      const response = await axios.delete(deleteCakeFlavourById(flavorId));
      if(response.status === 200) {
        toast.success("Cake flavour deleted successfully!", {autoClose: 1000});
        setCakeFlavors((prev) =>
          prev.filter((cakeFlavor) => cakeFlavor.id !== flavorId)
        );
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

  const addCakeFlavor = (newCakeFlavor) => {
    setCakeFlavors(prev => [newCakeFlavor, ...prev]); 
    setShowOffcanvas(false);
  };

  const updateCakeFlavor = (updatedCakeFlavor) => {
    setCakeFlavors((prev) =>
      prev.map((cakeFlavor) =>
        cakeFlavor.id === updatedCakeFlavor.id ? { ...cakeFlavor, ...updatedCakeFlavor } : cakeFlavor
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
                    ID<span className="fs-12 text-secondary">{renderSortIcon("id")}</span>
                  </th>

                  <th onClick={() => handleSort("name_en")}>
                    Name<span className="fs-12 text-secondary">{renderSortIcon("name_en")}</span>
                  </th>

                  <th onClick={() => handleSort("custom_cake_type_id")}>
                    Cake Type<span className="fs-12 text-secondary">{renderSortIcon("custom_cake_type_id")}</span>
                  </th>

                  <th onClick={() => handleSort("slug")}>
                    Slug<span className="fs-12 text-secondary">{renderSortIcon("slug")}</span>
                  </th>

                  <th onClick={() => handleSort("status")}>
                    Status<span className="fs-12 text-secondary">{renderSortIcon("status")}</span>
                  </th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cakeFlavors.map((cakeFlavor, index) => (
                  <tr key={cakeFlavor?.id}>
                    <td>{cakeFlavor?.id}</td>
                    <td>{cakeFlavor?.name_en}</td>
                    <td>{cakeFlavor?.customCakeType?.name_en}</td>
                    <td>{cakeFlavor?.slug}</td>
                    <td>
                      <div className={cakeFlavor?.status === "active" ? "blue-status" : "red-status"}>
                        {cakeFlavor?.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="action-btn border-secondary" onClick={() => showOffcanvasOnEditCakesFlavour(cakeFlavor)}>
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="action-btn border-secondary" onClick={() => showDeleteConfirmation(cakeFlavor.id)}>
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
              {cakeFlavorData ? "Update Cake Flavour" : "Add Cake Flavour"}
            </div>
          </Offcanvas.Title>
          </Offcanvas.Header>
          <hr  className="mt-0"/>
          <Offcanvas.Body>
            <AddCakeFlavour
              cakeFlavorData={cakeFlavorData}
              closePopup={closePopup}
              onAddCakeFlavor={addCakeFlavor}
              onUpdateCakeFlavor={updateCakeFlavor}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
    </>
    
  )
}
