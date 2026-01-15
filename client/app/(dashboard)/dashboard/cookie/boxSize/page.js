"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios';
import { getAllCookieBoxSizes ,deleteCookieBoxSizeById } from '@/utils/apiRoutes';
import {ToastContainer, toast} from "react-toastify";
import AddCookieBoxSize from "@/components/dashboard/cookies/AddCookieBoxSize";
import useAxiosConfig from "@/hooks/useAxiosConfig"
import Offcanvas from 'react-bootstrap/Offcanvas';
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";

export default function CookieBoxSizePage() {
  const [cookieBoxSizes, setCookieBoxSizes] = useState([]);
  const {token} = useAxiosConfig();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cookieBoxSizeData, setCookieBoxSizeData] = useState(null);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC")

  // PAGINATION STATES 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchCookieBoxSizes = async () => {
    if (!token) return;
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      }
      const response = await axios.get(getAllCookieBoxSizes, { params });
      setCookieBoxSizes(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching Cookie box sizes", error);
    }
  }

  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchCookieBoxSizes();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchCookieBoxSizes();
    }
  }, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasOnEditCookieBoxSize = (boxSize) => {
    setCookieBoxSizeData(boxSize);
    setShowOffcanvas(true);
  }

  const showOffcanvasOnAddCookieBoxSize = () => {
    setCookieBoxSizeData();
    setShowOffcanvas(true);
  }

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const addCookieBoxSize = (newCookieSize) => {
    setCookieBoxSizes(prev => [newCookieSize, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCookieBoxSize = (updatedCookieSize) => {
    setCookieBoxSizes((prev) =>
      prev.map((cookieSize) =>
        cookieSize.id === updatedCookieSize.id ? { ...cookieSize, ...updatedCookieSize } : cookieSize
      )
    );
    setShowOffcanvas(false);
  };

  const showDeleteConfirmation = (boxSizeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this cookie box size?");
    if(confirmed){
      handleDelete(boxSizeId)
    }
  };

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (boxSizeId) => {
    try {
        const response = await axios.delete(deleteCookieBoxSizeById(boxSizeId));
        if(response.status === 200){
          toast.success("Cookie box Size deleted successfully!", { autoClose: 1000 });
          setCookieBoxSizes((prev) => prev.filter((boxSize) => boxSize.id !== boxSizeId));
        }
  }catch (error){
      toast.error("Failed to delete Cookie Box Size.");
    }
  }

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
      <div className='mt-5'>
        <p className='pagetitle mb-0 fnt-color'>Cookie Box Size</p>
        <div className='d-flex justify-content-between mt-4'>
          <div className='d-flex'>
            <i className='bi bi-search fs-20 px-3 py-1 text-secondary position-absolute'></i>
            <input
              type='text'
              className='form-control px-5 text-dark-custom'
              placeholder='Search here...'
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>
          <div >
            <button 
              className='btn-orange'
              onClick={showOffcanvasOnAddCookieBoxSize}
              role='button'>
              <i className='bi bi-plus-circle me-2'
            ></i>
            Create
            </button>
          </div>
        </div>
      </div>
      <div className='px-0 pt-0 rounded-2 p-0 mt-3'>

        <div className='datatable-wrapper'>
          <div className='data-table p-2 rounded-4'>
            <table className='table datatable datatable-table'>
              <thead className=''>
                <tr className=''>
                  <th onClick={() => handleSort("id")}>
                    ID<span>{renderSortIcon("id")}</span>
                  </th>
                  <th onClick={() => handleSort("name_en")}>
                    Name<span>{renderSortIcon("name_en")}</span>
                  </th>
                  <th onClick={() => handleSort("cookie_type_id")}>
                    Cookies Type<span>{renderSortIcon("cookie_type_id")}</span>
                  </th>
                  <th onClick={() => handleSort("slug")}>
                    Slug<span>{renderSortIcon("slug")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                    Status<span>{renderSortIcon("status")}</span>
                  </th>
                  <th>
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {cookieBoxSizes.map((boxSize, index) => (
                  <tr key={`${boxSize.id}-${index}`}>
                    <td>{boxSize.id}</td>
                    <td>{boxSize.name_en}</td>
                    <td>{boxSize.type.name_en}</td>
                    <td>{boxSize.slug}</td>
                    <td>
                    <div className={boxSize.status === "active" ? "blue-status" : "red-status"}>
                      {boxSize.status === "active" ? "Active" : "Inactive"}
                    </div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2" onClick={() => showOffcanvasOnEditCookieBoxSize(boxSize)}>
                          <i className="bi bi-pencil-square text-primary"></i>
                        </button>
                        <button className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2" onClick={() => showDeleteConfirmation(boxSize.id)}>
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
              {cookieBoxSizeData ? "Add Box Size" : "Update Box Size"}
            </div>
          </Offcanvas.Title>
          </Offcanvas.Header>
          <hr  className="mt-0"/>
          <Offcanvas.Body>
            <AddCookieBoxSize
              cookieBoxSizeData={cookieBoxSizeData}
              closePopup={closePopup}
              onAddCookieBoxSize={addCookieBoxSize}
              onUpdateCookieBoxSize={updateCookieBoxSize}
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

