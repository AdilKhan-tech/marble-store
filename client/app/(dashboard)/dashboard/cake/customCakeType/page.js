'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddCustomCakeType from '@/components/dashboard/cake/AddCustomCakeType';
import { useEffect, useState } from 'react';
import { getAllCustomCakeTypes, deleteCustomCakeTypeById } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Common from "@/utils/Common"
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";

export default function CustomCakeTypePage() {
  
  const {token} = useAxiosConfig();
  const [customeCakeTypes, setCustomCakeTypes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [customCakeTypeData, setCustomCakeTypeData] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC")

  // PAGINATION STATES 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchCustomCakeTypes = async () => {
    if (!token) return;
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      }
      const response = await axios.get(getAllCustomCakeTypes, { params });
      setCustomCakeTypes(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching cakes", error);
    }
  };

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchCustomCakeTypes();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchCustomCakeTypes();
    }
}, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

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

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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

  const handleSortChange = (field) =>
    Common.handleSortingChange(field, setSortField, setSortOrder);

  return (
    <>
    <section className="mt-5">
      <div>
      <div className='d-flex justify-content-between mb-3'>
        <p className="pagetitle mb-0 fnt-color">Custom Cake Type</p>
        <div >
          <div 
            className='btn-orange text-center' 
            onClick={showOffcanvasAddCustomCakeType} 
            role='button'
          >
            <i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span>
          </div>
        </div>
      </div>
          <div className='d-flex'>
            <i className='bi bi-search fs-5 px-3 py-1 text-secondary position-absolute'></i>
            <input 
              type="text" 
              className="form-control px-5 text-dark-custom" 
              style={{height:"44px", width:"300px"}}
              placeholder="Search here..." 
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
        </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-3">

        <div className="datatable-wrapper">
          <div className="data-table p-2 rounded-4">
            <table className="table datatable datatable-table">
              <thead className=''>
                <tr className=''>
                  <th
                    className="fw-bold fs-14 fnt-color"
                    onClick={() => handleSortChange("id")}>
                    ID
                    <span className="fs-10 text-secondary ms-1">
                      {(sortField === "id" &&
                      (sortOrder === "asc" ? "↑" : "↓")) ||
                      "↑↓"}
                    </span>
                  </th>
                  <th className="fw-bold fs-14 fnt-color" onClick={() => handleSortChange("name_en")}>
                    Name
                    <span className="fs-10 text-secondary ms-1">
                      {(sortField === "name_en" &&
                      (sortOrder === "asc" ? "↑" : "↓")) ||
                      "↑↓"}
                    </span>
                  </th>
                  <th
                    className='fw-bold fs-14 fnt-color'
                    onClick={() => handleSortChange("slug")}>
                    Slug
                    <span className="fs-10 text-secondary ms-1">
                      {(sortField === "slug" &&
                      (sortOrder === "asc" ? "↑" : "↓")) ||
                      "↑↓"}
                    </span>
                  </th>
                  <th
                    className='fw-bold fs-14 fnt-color'
                    onClick={() => handleSortChange("status")}>
                    Status
                    <span className="fs-10 text-secondary ms-1">
                      {(sortField === "status" &&
                      (sortOrder === "asc" ? "↑" : "↓")) ||
                      "↑↓"}
                    </span>
                  </th>
                  <th className='fw-bold fs-14 fnt-color'>Action</th>
                </tr>
              </thead>

              <tbody>
                {customeCakeTypes.map((customeCakeType, index) => (
                  <tr key={customeCakeType?.id}>
                    <td className="fw-normal fs-14 fnt-color">
                      {customeCakeType?.id}
                    </td>
                    <td className="fw-normal fs-14 fnt-color">
                      {customeCakeType?.name_en}
                    </td>
                    <td className="fw-normal fs-14 fnt-color">
                      {customeCakeType?.slug}
                    </td>
                    <td>
                      <div className={customeCakeType?.status === "active" ? "blue-status" : "red-status"}>
                        {customeCakeType?.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className='d-flex gap-2'>
                      <div className='action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2' onClick={() => showOffcanvasOnEditCakeTypes(customeCakeType)}>
                        <i className="bi bi-pencil-square text-primary"></i></div>
                      <div className='action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2' onClick={() => showDeleteConfirmation(customeCakeType.id)}>
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
                {customCakeTypeData ? "Update Custom Cake Type" : "Add Custom Cake Type"}
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
    <hr/>
    <div className='datatable-bottom'>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        pageLimit={pageLimit}
        totalEntries={totalEntries}
      />
      <EntriesPerPageSelector
        pageLimit={pageLimit}
        onPageLimitChange={handleLimitChange}
      />
    </div>
    </>
  )
}
