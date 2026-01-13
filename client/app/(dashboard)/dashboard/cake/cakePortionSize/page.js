'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddCakePortionSize from '@/components/dashboard/cake/AddCakePortionSize';
import { useEffect, useState } from 'react';
import { getAllCakePortionSizes, deleteCakePortionSizeById } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';

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
        cakePortionSize.id === updatedCakePortionSize.id
          ? { ...cakePortionSize, ...updatedCakePortionSize }
          : cakePortionSize
      )
    );
    setShowOffcanvas(false);
  };

  const handleSort = (field) => {
    setCurrentPage(1);

    if (sortField === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortField(field);
      setSortOrder("ASC");
    }
  };

  const renderSortIcon = (field) => {
    if (sortField !== field) return "⇅";
    return sortOrder === "ASC" ? "↑" : "↓";
  };

  return (
    <>
    <section className="mt-10">
      <div className="mt-10">
        <p className="pagetitle mb-0 fnt-color">Cake Portion Size</p>
        <div className='d-flex justify-content-between mt-4'>
          <div className='d-flex'>
            <i className='bi bi-search fs-5 px-3 py-1 text-secondary position-absolute'></i>
            <input 
              type="text" 
              className="form-control px-5 text-dark-custom" 
              placeholder="Search here..." 
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div >
            <div 
              className='btn-orange' 
              onClick={showOffcanvasAddCakePortionSize} 
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
                    ID <span>{renderSortIcon("id")}</span>
                  </th>
                  <th onClick={() => handleSort("name_en")}>
                    Name <span>{renderSortIcon("name_en")}</span>
                  </th>
                  <th onClick={() => handleSort("slug")}>
                    Slug <span>{renderSortIcon("slug")}</span>
                  </th>
                  <th onClick={() => handleSort("parent_portion_size")}>
                    Parent Portion Size <span>{renderSortIcon("parent_portion_size")}</span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {cakePortionSizes.map((cakePortionSize, index) => (
                  <tr key={cakePortionSize?.id}>
                    <td>{cakePortionSize?.id}</td>
                    <td>{cakePortionSize?.name_en}</td>
                    <td>{cakePortionSize?.slug}</td>
                    <td>{cakePortionSize?.parent_portion_size}</td>
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
