"use client";
import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import useAxiosConfig from '@/hooks/useAxiosConfig';
import AddCookieType from '@/components/dashboard/cookies/AddCookieType';
import { ToastContainer, toast } from "react-toastify";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getCookieBoxTypes, deleteCookieBoxTypesById } from '@/utils/apiRoutes';

export default function CookieBoxTypes() {

  const {token} = useAxiosConfig();
  const [cookieBoxType, setCookieBoxType] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cookieData, setCookieData] = useState(null);

const fetchCookieBoxTypes = async () => {
  try {
    const response = await axios.get(getCookieBoxTypes)
    setCookieBoxType(response?.data.cookiesTypes);
  }catch (error){
    console.error("Error fetching Cookie Box Types", error);
  }
}

  useEffect(() => {
    if (!token) return;
    fetchCookieBoxTypes();
  }, [token]);
  
    const showOffcanvasOnAddCookieType = () => {
      setCookieData(null);
      setShowOffcanvas(true);
    }
  
    const showOffcanvasOnEditCookieType = (cookieBoxType) => {
      setCookieData(cookieBoxType);
      setShowOffcanvas(true);
    }
  
    const closePopup = () => {
      setShowOffcanvas(false);
      
    };


      const handleDelete = async (typeId) => {
    try {
      const response = await axios.delete(deleteCookieBoxTypesById(typeId));
      if(response.status === 200) {
        toast.success("Cookie box type deleted successfully!", {autoClose: 1000});
        fetchCookieBoxTypes();
      }
    }catch (error){
      console.error("Error deleting Cookie box type:", error);
      toast.error("Failed to delete Cookie box type.");
    }
  }

  const showDeleteConfirmation = (typeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this Cookie box type?");
    if(confirmed){
      handleDelete(typeId)
    }
  }

    const onAddCookie = (newCookie) => {
    setCookieBoxType(prev => [newCookie, ...prev]);
    setShowOffcanvas(false);
  };

  const onUpdateCookie = (updatedCookie) => {
    setCookieBoxType((prev) =>
      prev.map((cookie) =>
        cookie.id === updatedCookie.id ? { ...cookie, ...updatedCookie } : cookie
      )
    );
    setShowOffcanvas(false);
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
            placeholder='Search here...'
            style={{height:"46px", width:"300px"}}
          />
        </div>
        <div style={{marginInlineEnd:"20px"}}>
          <div className='btn org-btn rounded-3'
            role='button' onClick={showOffcanvasOnAddCookieType}>
            <i className='bi bi-plus-circle'></i>
            <span className='ms-2'>Create</span>
          </div>
        </div>
      </div>
      </div>

      <div className='px-0 pt-0 rounded-2 p-0 mt-3'>
        <div className='datatable-wrapper'>
          <div className='data-table p-2 rounded-4'>
            <table className='table datatable datatable-table'>
              <thead className=''>
                <tr className=''>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Slug</th>
                  <th>Sort</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cookieBoxType.map((type, index) => (
                  <tr key={type?.id}>
                    <td>{type?.id}</td>
                    <td>{type?.name_en}</td>
                    <td>{type?.slug}</td>
                    <td>{type?.sort}</td>
                    <td>
                      <div className="form-check form-switch ms-3">
                      <input 
                        className="form-check-input fs-5" 
                        type="checkbox"
                        role="switch" 
                        checked={type?.status === "active"} 
                        readOnly
                      />
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
              {cookieData ? "Update Box Type" : "Add Box Type"}
            </div>
          </Offcanvas.Title>
          </Offcanvas.Header>
          <hr  className="mt-0"/>
          <Offcanvas.Body>
            <AddCookieType
              cookieData={cookieData}
              closePopup={closePopup}
              onAddCookie={onAddCookie}
              onUpdateCookie={onUpdateCookie}
            />
          </Offcanvas.Body>
        </Offcanvas>
        <ToastContainer />
      </div>
    </section>
    )
}
