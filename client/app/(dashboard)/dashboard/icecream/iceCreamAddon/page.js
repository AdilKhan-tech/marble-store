'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddIceCreamAddon from "@/components/dashboard/icecream/AddIceCreamAddon";
import { useEffect, useState } from 'react';
import { deleteIceCreamsAddonById, getAllIcecreamAddOns } from '@/utils/apiRoutes';
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function IceCreamAddon () {
  const {token} = useAxiosConfig();
  const [iceCreamAddons, setIceCreamAddons] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [IceCreamAddonData, setIceCreamAddonData] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC")

  // PAGINATION STATES 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchIceCreamAddon = async () => {
    if (!token) return;
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      }
      const response = await axios.get(getAllIcecreamAddOns, { params });
      setIceCreamAddons(response.data.data)
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching icecream Addon", error);
    }
  };

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchIceCreamAddon();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchIceCreamAddon();
    }
  }, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasOnAddicecreamsSize = () => {
    setIceCreamAddonData(null);
    setShowOffcanvas(true);
  }

  const showOffcanvasOnEditicecreamsSize = (icecream) => {
    setIceCreamAddonData(icecream);
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

  const handleDelete = async (iceCreamId) => {
    try {
      const response = await axios.delete(deleteIceCreamsAddonById(iceCreamId));
      if(response.status === 200) {
          toast.success("icecream Addon deleted successfully!", {autoClose: 1000});
          fetchIceCreamAddon();
      }
    } catch (error){
      console.error("Error deleting icecream Addon:", error);
      toast.error("Failed to delete icecream Addon.");
    }
  }

  const showDeleteConfirmation = (iceCreamId) => {
    const confirmed = window.confirm("Are you sure you want to delete this icecream Addon?");
    if(confirmed){
      handleDelete(iceCreamId)
    }
  }

  const addicecreamToState = (newicecream) => {
    setIceCreamAddons(prev => [newicecream, ...prev]);
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
    <section >
      <div className="mt-5"> 
        <p className="pagetitle mb-0 fnt-color">Ice Cream Addons</p>
        <div className='d-flex justify-content-between mt-4'>
          <div className='d-flex'>
            <i className='bi bi-search fs-20 px-3 py-1 text-secondary position-absolute'></i>
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
              onClick={showOffcanvasOnAddicecreamsSize} 
              role='button'
            >
              <i className='bi bi-plus-circle me-2'></i>Create
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

                  <th onClick={() => handleSort("type")}>
                    Type <span>{renderSortIcon("type")}</span>
                  </th>

                  <th onClick={() => handleSort("status")}>
                    Status <span>{renderSortIcon("status")}</span>
                  </th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {iceCreamAddons.map((icecream, index) => (
                  <tr key={`${icecream.id}-${index}`}>
                    <td>{icecream.id}</td>
                    <td>{icecream.name_en}</td>
                    <td>{icecream.slug}</td>
                    <td>{icecream.add_on_type}</td>
                    <td>
                      <div className={icecream?.status === "active" ? "blue-status" : "red-status"}>
                        {icecream?.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2" onClick={() => showOffcanvasOnEditicecreamsSize(icecream)}>
                          <i className="bi bi-pencil-square text-primary"></i>
                        </button>
                        <button className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2" onClick={() => showDeleteConfirmation(icecream.id)}>
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
            <div className='fs-24 fnt-color'>
              {IceCreamAddonData ? "Update Addon" : "Add Addon"}
            </div>
          </Offcanvas.Title>
          </Offcanvas.Header>
          <hr  className="mt-0"/>
          <Offcanvas.Body>
            <AddIceCreamAddon
              IceCreamAddonData={IceCreamAddonData}
              closePopup={closePopup}
              onAddicecream={addicecreamToState}
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