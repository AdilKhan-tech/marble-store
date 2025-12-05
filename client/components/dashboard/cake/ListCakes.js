'use client';
import React from 'react'
import useAxiosConfig from "../../../hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddCakes from "../cake/add/AddCakes"
import { getCakesSizes, deleteCakesSizes } from '../../../utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function ListCakes() {
  const {token} = useAxiosConfig();
  const [cakes, setCakes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cakeData, setCakeData] = useState(null);

  const fetchCakeSizes = async () => {
    try {
      const response = await axios.get(getCakesSizes);
      setCakes(response.data)
    } catch (error) {
      console.error("Error fetching cakes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCakeSizes();
  }, [token]);

  const showOffcanvasOnAddCakesSize = () => {
        setCakeData(null);
        setShowOffcanvas(true);
     }
     const closePopup = () => {
        setShowOffcanvas(false);
    };

      const handleDelete = async (cakeId) => {
      try {
          const response = await axios.delete(deleteCakesSizes(cakeId));
          if(response.status === 200) {
              toast.success("Cake size deleted successfully!", {autoClose: 1000});
              fetchCakeSizes();
          }
      }catch (error){
          console.error("Error deleting Cake size:", error);
          toast.error("Failed to delete Cake size.");
          }
      }
      const showDeleteConfirmation = (cakeId) => {
          const confirmed = window.confirm("Are you sure you want to delete this Cake size?");
          if(confirmed){
              handleDelete(cakeId)
          }
      }
    const addCakeToState = (newCake) => {
    setCakes(prev => [newCake, ...prev]); // prepend or append as needed
    setShowOffcanvas(false);
    };


  return (
    <>
    <section className='' style={{marginInlineStart:"270px", marginTop:"100px"}}>
      <div className=""> 
      <p className="fs-20">Cakes Sizes</p>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
            <input type="text" className="form-control rounded-2 border px-3 py-2" placeholder="Search here..." style={{height:"43px", width:"300px"}}/>
            </div>
            <div style={{marginInlineEnd:"20px"}}>
              <div className='org-btn py-2 px-4 rounded-3' onClick={showOffcanvasOnAddCakesSize} role='button'><i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span></div>
            </div>
        </div>
        </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-5">

        <div className="datatable-wrapper">
          <div className="data-table p-2 rounded-4">
            <table className="table datatable datatable-table schedulerTable">
              <thead>
                <tr className=''>
                  <th className="fw-20">#</th>
                  <th className="fw-20">Name</th>
                  <th className="fw-20">Category</th>
                  <th className="fw-20">Slug</th>
                  <th className="fw-20">Scope/Size</th>
                  <th className="fw-20">Additional Price</th>
                  <th className="fw-20">Symbol</th>
                  <th className="fw-20">Calories</th>
                  <th className="fw-20">Status</th>
                  <th className="fw-20">Action</th>
                </tr>
              </thead>

              <tbody>
                {cakes.map((cake, index) => (
                  <tr key={`${cake.id}-${index}`}>

                    <td className="text-secondary fs-16">{cake.id}</td>
                    <td className="text-secondary fs-16">{cake.name_en}</td>
                    <td className="text-secondary fs-16">{cake.category_id}</td>
                    <td className="text-secondary fs-16">{cake.slug}</td>
                    <td className="text-secondary fs-16">{cake.scoop_size}</td>
                    <td className="text-secondary fs-16">{cake.additional_price}</td>
                    <td className="text-secondary fs-16">{cake.symbol}</td>
                    <td className="text-secondary fs-16">{cake.calories}</td>
                    <td className="text-secondary fs-16">
                    <div className="form-check form-switch ms-4">
                      <input
                        className="form-check-input fs-4"
                        type="checkbox"
                        role="switch"
                        name="status"
                      />
                    </div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-light p-2">
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="btn btn-sm btn-light p-2" onClick={() => showDeleteConfirmation(cake.id)}>
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
                   {cakeData ? "Update Size" : "Add Size"}
                </Offcanvas.Title>
                </Offcanvas.Header>
                <hr  className="mt-0"/>
                <Offcanvas.Body>
                 <AddCakes
                    cakeData={cakeData}
                    closePopup={closePopup}
                    onAddCake={addCakeToState}
                />
                </Offcanvas.Body>
            </Offcanvas>
            <ToastContainer />

      </div>
    </section>
    </>
    
  )
}