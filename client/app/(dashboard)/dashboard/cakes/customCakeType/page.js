'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddCustomCakeType from '@/components/dashboard/cake/AddCustomCakeType';
import { useEffect, useState } from 'react';
import { getAllCustomCakeTypes, deleteCustomCakeTypeById } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function CustomCakeTypePage() {
  
  const {token} = useAxiosConfig();
  const [customeCakeTypes, setCustomCakeTypes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [customCakeTypeData, setCustomCakeTypeData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCustomCakeTypes = async () => {
    try {
      const response = await axios.get(getAllCustomCakeTypes);
      setCustomCakeTypes(response.data);
    } catch (error) {
      console.error("Error fetching cakes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCustomCakeTypes();
  }, [token]);

  const showOffcanvasAddCustomCakeType = () => {
    setCustomCakeTypeData(null);
    setShowOffcanvas(true);
  }

  const showOffcanvasOnEditCakeTypes = (customeCakeType) => {
    setCustomCakeTypeData(customeCakeType);
    setShowOffcanvas(true);
  }

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const handleDelete = async (customeCakeTypeId) => {
    try {
      const response = await axios.delete(deleteCustomCakeTypeById(customeCakeTypeId));
      if(response.status === 200) {
        toast.success("Custom Cake Type deleted successfully!", {autoClose: 1000});
        setCustomCakeTypes((prev) =>
          prev.filter((customeCakeType) => customeCakeType.id !== customeCakeTypeId)
        );
      }
    }catch (error){
      console.error("Error deleting Custom Cake Type", error);
      toast.error("Failed to delete Custom Cake Type");
    }
  }

  const showDeleteConfirmation = (customeCakeTypeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this Custom Cake Type?");
    if(confirmed){
        handleDelete(customeCakeTypeId)
    }
  }

  const addCustomCakeType = (newCustomeCakeType) => {
    setCustomCakeTypes(prev => [newCustomeCakeType, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCustomCakeType = (updatedCustomeCakeType) => {
    setCustomCakeTypes((prev) =>
      prev.map((customeCakeType) =>
        customeCakeType.id === updatedCustomeCakeType.id
          ? { ...customeCakeType, ...updatedCustomeCakeType }
          : customeCakeType
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
        <p className="pagetitle mb-0 fnt-color">Custom Cake Type</p>
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
              onClick={showOffcanvasAddCustomCakeType} 
              role='button'
            >
              <i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-3">

        <div className="datatable-wrapper">
          <div className="data-table p-2 rounded-4">
            <table className="table datatable datatable-table">
              <thead className=''>
                <tr className=''>
                  <th onClick={() => handleSort("id")}>
                    ID <span className="fs-12 text-secondary">{renderSortIcon("id")}</span>
                  </th>
                  <th onClick={() => handleSort("name_en")}>
                    Name <span className="fs-12 text-secondary">{renderSortIcon("name_en")}</span>
                  </th>
                  <th onClick={() => handleSort("slug")}>
                    Slug <span className="fs-12 text-secondary">{renderSortIcon("slug")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Status <span className="fs-12 text-secondary">{renderSortIcon("status")}</span>
                  </th>
                  <th className="fw-16 fnt-color">Action</th>
                </tr>
              </thead>

              <tbody>
                {customeCakeTypes.map((customeCakeType, index) => (
                  <tr key={customeCakeType?.id}>
                    <td>{customeCakeType?.id}</td>
                    <td>{customeCakeType?.name_en}</td>
                    <td>{customeCakeType?.slug}</td>
                    <td>
                      <div className={customeCakeType?.status === "active" ? "blue-status" : "red-status"}>
                        {customeCakeType?.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className='d-flex gap-2'>
                      <div className='action-btn' onClick={() => showOffcanvasOnEditCakeTypes(customeCakeType)}>
                        <i className="bi bi-pencil text-primary"></i></div>
                      <div className='action-btn' onClick={() => showDeleteConfirmation(customeCakeType.id)}>
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
                {customCakeTypeData ? "Update Cake Type" : "Add Cake Type"}
              </div>
            </Offcanvas.Title>
            </Offcanvas.Header>
            <hr  className="mt-0"/>
            <Offcanvas.Body>
              <AddCustomCakeType
                customCakeTypeData={customCakeTypeData}
                closePopup={closePopup}
                onAddCustomCakeType={addCustomCakeType}
                onUpdateCustomCakeType={updateCustomCakeType}
              />
            </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
    </>
  )
}
