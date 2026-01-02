"use client";
import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import useAxiosConfig from '@/hooks/useAxiosConfig';
import AddCookieBoxType from '@/components/dashboard/cookies/AddCookieBoxType';
import { ToastContainer, toast } from "react-toastify";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getCookieBoxTypes, deleteCookieBoxTypesById } from '@/utils/apiRoutes';

export default function CookieBoxTypePage() {

  const {token} = useAxiosConfig();
  const [cookieBoxType, setCookieBoxType] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cookieBoxTypeData, setCookieBoxTypeData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

const fetchCookieBoxTypes = async () => {
  try {
    const response = await axios.get(getCookieBoxTypes)
    setCookieBoxType(response?.data);
  }catch (error){
    console.error("Error fetching Cookie Box Types", error);
  }
}

  useEffect(() => {
    if (!token) return;
    fetchCookieBoxTypes();
  }, [token]);
  
    const showOffcanvasOnAddCookieType = () => {
      setCookieBoxTypeData(null);
      setShowOffcanvas(true);
    }
  
    const showOffcanvasOnEditCookieType = (cookieBoxType) => {
      setCookieBoxTypeData(cookieBoxType);
      setShowOffcanvas(true);
    }
  
    const closePopup = () => {
      setShowOffcanvas(false);
      
    };


      const handleDelete = async (typeId) => {
    try {
      const response = await axios.delete(deleteCookieBoxTypesById(typeId));
      if(response.status === 200) {
        toast.success("Cookie box Type deleted successfully!", { autoClose: 1000 });
        setCookieBoxType((prev) => prev.filter((type) => type.id !== typeId));
      }
    }catch (error){
      toast.error("Failed to delete Cookie box type.");
    }
  }

  const showDeleteConfirmation = (typeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this Cookie box type?");
    if(confirmed){
      handleDelete(typeId)
    }
  }

    const addCookieBoxType = (newCookie) => {
    setCookieBoxType(prev => [newCookie, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCookieBoxType = (updatedCookie) => {
    setCookieBoxType((prev) =>
      prev.map((cookie) =>
        cookie.id === updatedCookie.id ? { ...cookie, ...updatedCookie } : cookie
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
    <section  style={{marginTop:"100px"}}>
      <div className=''>
        <p className='pagetitle mb-0 fnt-color'>Cookie Box Type</p>
        <div className='d-flex justify-content-between mt-4'>
        <div className='d-flex gap-5'>
        <i className='bi bi-search fs-20 px-3 py-1 text-secondary position-absolute'></i>
          <input
            type='text'
            className='form-control form-control-lg px-5 text-dark-custom'
            placeholder='Search here...'/>
        </div>
        <div style={{marginInlineEnd:"20px"}}>
          <button className='btn org-btn w-100 py-2 px-4 rounded-3'
            role='button' onClick={showOffcanvasOnAddCookieType}>
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
                  <th onClick={() => handleSort("slug")}>
                  Slug<span>{renderSortIcon("slug")}</span>
                  </th>
                  <th onClick={() => handleSort("status")}>
                  Status<span>{renderSortIcon("status")}</span>
                  </th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cookieBoxType.map((type, index) => (
                  <tr key={type._id || type.id || index}>
                    <td>{type?.id}</td>
                    <td>{type?.name_en}</td>
                    <td>{type?.slug}</td>
                    <td>
                      <div className={type?.status === "active" ? "blue-status" : "red-status"}>
                        {type?.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>
                    <td className='d-flex gap-2'>
                      <div className='action-btn' onClick={() => showOffcanvasOnEditCookieType(type)}>
                        <i className="bi bi-pencil text-primary"></i></div>
                      <div className='action-btn' onClick={() => showDeleteConfirmation(type.id)}>
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
              {cookieBoxTypeData ? "Update Box Type" : "Add Box Type"}
            </div>
          </Offcanvas.Title>
          </Offcanvas.Header>
          <hr  className="mt-0"/>
          <Offcanvas.Body>
            <AddCookieBoxType
              cookieBoxTypeData={cookieBoxTypeData}
              closePopup={closePopup}
              onAddCookieBoxType={addCookieBoxType}
              onUpdateCookieBoxType={updateCookieBoxType}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
    )
}
