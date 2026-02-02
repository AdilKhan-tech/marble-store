'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddCakePortionSize from '@/components/dashboard/cake/AddCakePortionSize';
import { useEffect, useState } from 'react';
import { getAllCakePortionSizes, deleteCakePortionSizeById } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Common from "@/utils/Common"
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";

export default function CakePortionSizePage() {
  
  const {token} = useAxiosConfig();
  const [cakePortionSizes, setCakePortionSizes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cakePortionSizeData, setCakePortionSizeData] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC")

  // PAGINATION STATES 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchCakePortionSizes = async () => {
    if (!token) return;
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      }
      const response = await axios.get(getAllCakePortionSizes, { params });
      setCakePortionSizes(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching Cake Portion Sizes", error);
    }
  };

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchCakePortionSizes();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchCakePortionSizes();
    }
}, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasAddCakePortionSize = () => {
    setCakePortionSizeData(null);
    setShowOffcanvas(true);
  }

  const showOffcanvasOnEditCakePortionSizes = (cakePortionSize) => {
    setCakePortionSizeData(cakePortionSize);
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

  const handleDelete = async (cakePortionSizeId) => {
    try {
      const response = await axios.delete(deleteCakePortionSizeById(cakePortionSizeId));
      if(response.status === 200) {
        toast.success("Custom Cake Type deleted successfully!", {autoClose: 1000});
        setCakePortionSizes((prev) =>
          prev.filter((cakePortionSize) => cakePortionSize.id !== cakePortionSizeId)
        );
      }
    }catch (error){
      console.error("Error deleting Cake Portion Size", error);
      toast.error("Failed to delete Cake Portion Size");
    }
  }

  const showDeleteConfirmation = (cakePortionSizeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this Cake Portion Size?");
    if(confirmed){
        handleDelete(cakePortionSizeId)
    }
  }

  const addCakePortionSize = (newCakePortionSize) => {
    setCakePortionSizes(prev => [newCakePortionSize, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCakePortionSize = (updatedCakePortionSize) => {
    setCakePortionSizes((prev) =>
      prev.map((cakePortionSize) =>
        cakePortionSize.id === updatedCakePortionSize.id ? updatedCakePortionSize : cakePortionSize
      )
    );
    setShowOffcanvas(false);
  };

  const handleSortChange = (field) =>
    Common.handleSortingChange(field, setSortField, setSortOrder);

  return (
    <>
    <section className="mt-3">
      <div>
        <div className='d-flex justify-content-between mb-3'>
          <p className="pagetitle mb-0 fnt-color">Cake Portion Sizes</p>
          <div >
            <div 
              className='btn-orange text-center' 
              onClick={showOffcanvasAddCakePortionSize} 
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
                    className="fw-medium fs-14 fnt-color"
                    onClick={() => handleSortChange("id")}>
                    ID
                    <span className="fs-10 text-secondary ms-1">
                      {(sortField === "id" &&
                      (sortOrder === "asc" ? "↑" : "↓")) ||
                      "↑↓"}
                    </span>
                  </th>
                  <th
                    className="fw-medium fs-14 fnt-color"
                    onClick={() => handleSortChange("name_en")}>
                    Name
                    <span className="fs-10 text-secondary ms-1">
                      {(sortField === "name_en" &&
                      (sortOrder === "asc" ? "↑" : "↓")) ||
                      "↑↓"}
                    </span>
                  </th>
                  <th
                    className="fw-medium fs-14 fnt-color"
                    onClick={() => handleSortChange("slug")}>
                    Slug
                    <span className="fs-10 text-secondary ms-1">
                      {(sortField === "slug" &&
                      (sortOrder === "asc" ? "↑" : "↓")) ||
                      "↑↓"}
                    </span>
                  </th>
                  <th
                    className="fw-medium fs-14 fnt-color" 
                    onClick={() => handleSortChange("parent_portion_size")}>
                    Parent Portion Size
                    <span className="fs-10 text-secondary ms-1">
                      {(sortField === "parent_portion_size" &&
                      (sortOrder === "asc" ? "↑" : "↓")) ||
                      "↑↓"}
                    </span>
                  </th>
                  <th className="fw-medium fs-14 fnt-color">Action</th>
                </tr>
              </thead>

              <tbody>
                {cakePortionSizes.map((cakePortionSize, index) => (
                  <tr key={cakePortionSize?.id}>
                    <td className="fw-normal fs-14 fnt-color">
                      {cakePortionSize?.id}
                    </td>
                    <td className="fw-normal fs-14 fnt-color">
                      {cakePortionSize?.name_en}
                    </td>
                    <td className="fw-normal fs-14 fnt-color">
                      {cakePortionSize?.slug}
                    </td>
                    <td className="fw-normal fs-14 fnt-color">
                      {cakePortionSize?.parent_portion_size}
                    </td>
                    <td className='d-flex gap-2'>
                      <div className='action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2' onClick={() => showOffcanvasOnEditCakePortionSizes(cakePortionSize)}>
                        <i className="bi bi-pencil-square text-primary"></i></div>
                      <div className='action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2' onClick={() => showDeleteConfirmation(cakePortionSize.id)}>
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
                {cakePortionSizeData ? "Update Cake Portion Size" : "Add Cake Portion Size"}
              </div>
            </Offcanvas.Title>
            </Offcanvas.Header>
            <hr  className="mt-0"/>
            <Offcanvas.Body>
              <AddCakePortionSize
                cakePortionSizeData={cakePortionSizeData}
                closePopup={closePopup}
                onAddCakePortionSize={addCakePortionSize}
                onUpdateCakePortionSize={updateCakePortionSize}
              />
            </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
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
