'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddCakes from "@/components/dashboard/cake/AddCakesSize";
import { useEffect, useState } from 'react';
import { getAllCakesSizes, deleteCakeSizeById ,updateCakeSizeById } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function ListCakeSizes() {
  const {token} = useAxiosConfig();
  const [cakeSizes, setCakeSizes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cakeData, setCakeSizeData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCakeSizes = async () => {
    try {
      const response = await axios.get(getAllCakesSizes);
      setCakeSizes(response.data);
    } catch (error) {
      console.error("Error fetching cake sizes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCakeSizes();
  }, [token]);

  const showOffcanvasOnAddCakesSize = () => {
    setCakeSizeData(null);
    setShowOffcanvas(true);
  }

  const showOffcanvasOnEditCakesSize = (cakeSize) => {
    setCakeSizeData(cakeSize);
    setShowOffcanvas(true);
  }

  const closePopup = () => {
    setShowOffcanvas(false);
    
  };

  const handleDelete = async (cakeSizeId) => {
    try {
      const response = await axios.delete(deleteCakeSizeById(cakeSizeId));
      if(response.status === 200) {
        toast.success("Cake size deleted successfully!", {autoClose: 1000});
        setCakeSizes((prev) =>
          prev.filter((cakeSize) => cakeSize.id !== cakeSizeId)
        );
      }
    }catch (error){
      console.error("Error deleting Cake size:", error);
      toast.error("Failed to delete Cake size.");
    }
  }

  const showDeleteConfirmation = (cakeSizeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this Cake size?");
    if(confirmed){
      handleDelete(cakeSizeId)
    }
  }
  
  const addCakeSize = (newCakeSize) => {
    setCakeSizes(prev => [newCakeSize, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCakeSize = (updatedCakeSize) => {
    setCakeSizes((prev) =>
      prev.map((cakeSize) =>
        cakeSize.id === updatedCakeSize.id ? { ...cakeSize, ...updatedCakeSize } : cakeSize
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
        <p className="pagetitle mb-0 fnt-color">Cakes Sizes</p>
        <div className='d-flex justify-content-between mt-4'>
          <div className='d-flex'>
            <i className='bi bi-search fs-20 py-1 px-2 text-secondary bg-light rounded-3 border rounded-end-0 border-end-0'></i>
            <input 
              type="text" 
              className="form-control border rounded-start-0 border-start-0" 
              placeholder="Search here..." 
              style={{height:"46px", width:"300px"}}
            />
          </div>
          <div style={{marginInlineEnd:"20px"}}>
            <div 
              className='org-btn py-2 px-4 rounded-3' 
              onClick={showOffcanvasOnAddCakesSize} 
              role='button'
            >
              <i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-3">
          <div className=" ">
            <div className="data-table">
              <table className="table datatable-wrapper">
                <thead className="">
                  <tr className=''>
                    <th onClick={() => handleSort("id")}>
                      ID <span className="fs-12 text-secondary">{renderSortIcon("id")}</span>
                    </th>
                    <th onClick={() => handleSort("name_en")}>
                      Name <span className="fs-12 text-secondary">{renderSortIcon("name_en")}</span>
                    </th>
                    <th onClick={() => handleSort("custom_cake_type_id")}>
                      Cake Type <span className="fs-12 text-secondary">{renderSortIcon("custom_cake_type_id")}</span>
                    </th>
                    <th onClick={() => handleSort("scoop_size")}>
                      Scope <span className="fs-12 text-secondary">{renderSortIcon("scoop_size")}</span>
                    </th>
                    <th onClick={() => handleSort("additional_price")}>
                      Additional Price <span className="fs-12 text-secondary">{renderSortIcon("additional_price")}</span>
                    </th>
                    <th onClick={() => handleSort("status")}>
                      Status <span className="fs-12 text-secondary">{renderSortIcon("status")}</span>
                    </th>
                    <th className="">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {cakeSizes.map((cakeSize, index) => (
                    <tr key={cakeSize?.id}>
                      <td>{cakeSize?.id}</td>
                      <td>{cakeSize?.name_en}</td>
                      <td>{cakeSize?.customCakeType?.name_en}</td>
                      <td>{cakeSize?.scoop_size}</td>
                      <td>{cakeSize?.additional_price}</td>
                      <td>
                        <div className={cakeSize?.status === "active" ? "blue-status" : "red-status"}>
                          {cakeSize?.status === "active" ? "Active" : "Inactive"}
                        </div>
                      </td>
                      <td className='d-flex gap-2'>
                        <div className='action-btn' onClick={() => showOffcanvasOnEditCakesSize(cakeSize)}>
                          <i className="bi bi-pencil text-primary"></i></div>
                        <div className='action-btn' onClick={() => showDeleteConfirmation(cakeSize.id)}>
                          <i className="bi bi-trash text-danger"></i></div>
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
            <div className='fs-24 fnt-color'>
              {cakeData ? "Update Size" : "Add Size"}
            </div>
          </Offcanvas.Title>
          </Offcanvas.Header>
          <hr  className="mt-0"/>
          <Offcanvas.Body>
            <AddCakes
              cakeData={cakeData}
              closePopup={closePopup}
              onAddCakeSize={addCakeSize}
              onUpdateCakeSize={updateCakeSize}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
    </>    
  )
}
