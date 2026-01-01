"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios';
import { getCookieBoxSizes ,deleteCookieBoxSizes } from '@/utils/apiRoutes';
import {ToastContainer, toast} from "react-toastify";
import AddCookieBoxSize from "@/components/dashboard/cookies/AddCookieBoxSize";
import useAxiosConfig from "@/hooks/useAxiosConfig"
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function CookieBoxSizePage() {
  const [cookieBoxSizes, setCookieBoxSizes] = useState([]);
  const {token} = useAxiosConfig();
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cookieBoxSizeData, setCookieBoxSizeData] = useState(null);


  const fetchCookieBoxSizes = async () => {
    try {
      const response = await axios.get(getCookieBoxSizes);
      setCookieBoxSizes(response.data);
    } catch (error) {
      console.error("Error fetching Cookie box sizes", error);
    }
  }

  useEffect(() => {
    if(!token) return;
    fetchCookieBoxSizes();
  }, [token]);

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

    const handleDelete = async (boxSizeId) => {
      try {
          const response = await axios.delete(deleteCookieBoxSizes(boxSizeId));
          if(response.status === 200){
            toast.success("Cookie box Size deleted successfully!", { autoClose: 1000 });
            setCookieBoxSizes((prev) => prev.filter((boxSize) => boxSize.id !== boxSizeId));
          }
    }catch (error){
        toast.error("Failed to delete Cookie Box Size.");
      }
    }

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
    <section className='' style={{marginTop:"100px"}}>
      <div className=''>
        <p className='pagetitle mb-0 fnt-color'>Cookie Box Size</p>
        <div className='d-flex justify-content-between mt-4'>
          <div className='d-flex'>
            <i className='bi bi-search fs-20 px-3 py-1 text-secondary position-absolute'></i>
            <input
              type='text'
              className='form-control form-control-lg px-5 text-dark-custom'
              placeholder='Search here...'/>
          </div>
          <div style={{marginInlineEnd:"20px"}}>
            <button className='btn org-btn w-100 py-2 px-4 rounded-3'
              onClick={showOffcanvasOnAddCookieBoxSize}
              role='button'>
              <i className='bi bi-plus-circle ms-1'></i>
              <span className='ms-2'>Create</span>
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
                  <th onClick={() => handleSort("cookies_types_id")}>
                    Cookies Type<span>{renderSortIcon("cookies_types_id")}</span>
                  </th>
                  <th onClick={() => handleSort("slug")}>
                    Slug<span>{renderSortIcon("slug")}</span>
                  </th>
                  <th onClick={() => handleSort("portion_size")}>
                    Portion Size<span>{renderSortIcon("portion_size")}</span>
                  </th>
                  <th onClick={() => handleSort("price")}>
                    Price<span>{renderSortIcon("price")}</span>
                  </th>
                  <th onClick={() => handleSort("symbol")}>
                    Symbol<span>{renderSortIcon("symbol")}</span>
                  </th>
                  <th onClick={() => handleSort("calories")}>
                    Calories<span>{renderSortIcon("calories")}</span>
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
                    <td>{boxSize.cookies_types_id}</td>
                    <td>{boxSize.slug}</td>
                    <td>{boxSize.portion_size}</td>
                    <td>{boxSize.price}</td>
                    <td>{boxSize.symbol}</td>
                    <td>{boxSize.calories}</td>
                    <td>
                    <div className={boxSize.status === "active" ? "blue-status" : "red-status"}>
                      {boxSize.status === "active" ? "Active" : "Inactive"}
                    </div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-light p-2" onClick={() => showOffcanvasOnEditCookieBoxSize(boxSize)}>
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="btn btn-sm btn-light p-2" onClick={() => showDeleteConfirmation(boxSize.id)}>
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
  )
}

