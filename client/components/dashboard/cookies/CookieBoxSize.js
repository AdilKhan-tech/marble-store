"use client"
import React from 'react'
import { useState , useEffect } from 'react'
import axios from 'axios';
import { getCookieBoxSizes ,deleteCookieBoxSizes } from '@/utils/apiRoutes';
import {ToastContainer} from "react-toastify";
import AddBoxSize from "@/components/dashboard/cookies/AddCookieBoxSize";
import useAxiosConfig from "@/hooks/useAxiosConfig"
import Offcanvas from 'react-bootstrap/Offcanvas';

function CookieBoxSize() {
  const [boxSizes, setBoxSizes] = useState([]);
  const {token} = useAxiosConfig();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [boxSizeData, setBoxSizeData] = useState(null);


  const fetchBoxSizes = async () => {
    try {
    const response = await axios.get(getCookieBoxSizes);
    setBoxSizes(response.data);
    } catch (error) {
      console.error("Error fetching box sizes", error);
    }
  }

  useEffect(() => {
    if(!token) return;
    fetchBoxSizes();
  }, [token]);

  const showOffcanvasOnEditBoxSize = (boxSize) => {
    setBoxSizeData(boxSize);
    setShowOffcanvas(true);
  }
  const showOffcanvasOnAddBoxSize = () => {
    setBoxSizeData();
    setShowOffcanvas(true);
  }

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const addBoxSizeToState = (newBoxSize) => {
    setBoxSizes(prev => [newBoxSize, ...prev]);
    setShowOffcanvas(false);
    };

    const showDeleteConfirmation = (boxSizeId) => {
      const confirmed = window.confirm("Are you sure you want to delete this box size?");
      if(confirmed){
        handleDelete(boxSizeId)
      }
    };

    const handleDelete = async (boxSizeId) => {
      try {
          const response = await axios.delete(deleteCookieBoxSizes(boxSizeId));
          if(response.status === 200){
              fetchBoxSizes();
          }
    }catch (error){
        console.error("Error deleting box size:", error);
        toast.error("Failed to delete icecream size.");
      }
    }
  return (
    <section className='' style={{marginTop:"100px"}}>
      <div className=''>
        <p className='pagetitle mb-0 fnt-color'>Cookie Box Size</p>
        <div className='d-flex justify-content-between mt-4'>
          <div className='d-flex'>
            <i className='bi bi-search fs-20 py-1 px-2 text-secondary bg-light rounded-3 border rounded-end-0 border-end-0'></i>
            <input
              type='text'
              className='form-control border-start-0 rounded-start-0'
              placeholder='Search here...'
              style={{height:"46px", width:"300px"}}
            />
          </div>
          <div style={{marginInlineEnd:"20px"}}>
            <div className='org-btn py-2 px-4 rounded-3'
              onClick={showOffcanvasOnAddBoxSize}
              role='button'>
              <i className='bi bi-plus-circle ms-2'></i>
              <span className='ms-1'>Create</span>
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
                  <th>Cookies Type</th>
                  <th>Slug</th>
                  <th>Portion Size</th>
                  <th>Price</th>
                  <th>Symbol</th>
                  <th>Calories</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {boxSizes.map((boxSize, index) => (
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
                    <div className="form-check form-switch ms-4">
                        <input
                          className="form-check-input fs-24"
                          type="checkbox"
                          role="switch"
                          id={`flexSwitchCheck-${boxSize?.id || ''}`}
                          checked={boxSize?.status?.toLowerCase() === "active"}
                          readOnly
                        />
                      </div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-light p-2" onClick={() => showOffcanvasOnEditBoxSize(boxSize)}>
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
              {boxSizeData ? "Add Box Size" : "Update Box Size"}
            </div>
        </Offcanvas.Title>
        </Offcanvas.Header>
        <hr  className="mt-0"/>
        <Offcanvas.Body>
          <AddBoxSize
            boxSizeData={boxSizeData}
            closePopup={closePopup}
            onAddBoxSize={addBoxSizeToState}
        />
        </Offcanvas.Body>
    </Offcanvas>
    <ToastContainer />
      </div>
    </section>
  )
}

export default CookieBoxSize
