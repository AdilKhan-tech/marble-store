'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddFlavour from "@/components/dashboard/cake/flavour/add/AddFlavours";
import { useEffect, useState } from 'react';
import { getCakesFlavour, deleteCakesFlavour } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function ListFlavours() {
  const {token} = useAxiosConfig();
  const [cakes, setCakes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cakeData, setCakeData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchCakeFlavors = async () => {
    try {
      const response = await axios.get(getCakesFlavour);
      setCakes(response.data)
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching cakes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCakeFlavors();
  }, [token]);

  const showOffcanvasOnAddCakesFlavour = () => {
        setCakeData(null);
        setShowOffcanvas(true);
     }
     const showOffcanvasOnEditCakesFlavour = (flavors) => {
        setCakeData(flavors);
        setShowOffcanvas(true);
     }
     const closePopup = () => {
        setShowOffcanvas(false);
    };

      const handleDelete = async (cakesId) => {
      try {
          const response = await axios.delete(deleteCakesFlavour(cakesId));
          if(response.status === 200) {
              toast.success("Cake flavour deleted successfully!", {autoClose: 1000});
              fetchCakeFlavors();
          }
      }catch (error){
          console.error("Error deleting Cake flavour:", error);
          toast.error("Failed to delete Cake flavour.");
          }
      }
      const showDeleteConfirmation = (cakesId) => {
          const confirmed = window.confirm("Are you sure you want to delete this Cake flavour?");
          if(confirmed){
              handleDelete(cakesId)
          }
      }
    const addCakeToState = (newCake) => {
    setCakes(prev => [newCake, ...prev]);
    setShowOffcanvas(false);
    };



  return (
    <>
    <section className='' style={{ marginTop:"100px"}}>
      <div className=""> 
      <p className="pagetitle mb-0 fnt-color">Cakes Flavours</p>
      <div className='d-flex justify-content-between mt-4'>
        <div className='d-flex'>
            <i className='bi bi-search fs-20 py-1 px-2 text-secondary bg-light rounded-3 border rounded-end-0 border-end-0'></i>
            <input type="text" className="form-control border rounded-start-0 border-start-0" placeholder="Search here..." style={{height:"43px", width:"300px"}}/>
            </div>
            <div style={{marginInlineEnd:"20px"}}>
              <div className='org-btn py-2 px-4 rounded-3' onClick={showOffcanvasOnAddCakesFlavour} role='button'><i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span></div>
            </div>
        </div>
        </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-3">

        <div className="datatable-wrapper">
          <div className="data-table p-2">
            <table className="table datatable datatable-table">
              <thead>
                <tr className=''>
                  <th className="fw-16 fnt-color">ID</th>
                  <th className="fw-16 fnt-color">Name</th>
                  <th className="fw-16 fnt-color">Category</th>
                  <th className="fw-16 fnt-color">Slug</th>
                  <th className="fw-16 fnt-color">Additional Price</th>
                  <th className="fw-16 fnt-color">Symbol</th>
                  <th className="fw-16 fnt-color">Status</th>
                  <th className="fw-16 fnt-color">Action</th>
                </tr>
              </thead>
              <tbody>
                {cakes.map((cakes, index) => (
                  <tr key={`${cakes.id}-${index}`}>
                    <td className="fw-normal fnt-color fs-14"><span className='ms-1'>{cakes.id}</span></td>
                    <td className="fw-normal fnt-color fs-14"><span className='ms-1'>{cakes.name_en}</span></td>
                    <td className="fw-normal fnt-color fs-14"><span className='ms-1'>{cakes.category_id}</span></td>
                    <td className="fw-normal fnt-color fs-14"><span className='ms-1'>{cakes.slug}</span></td>
                    <td className="fw-normal fnt-color fs-14"><span className='ms-1'>{cakes.additional_price}</span></td>
                    <td className="fw-normal fnt-color fs-14"><span className='ms-1'>{cakes.symbol}</span></td>
                    <td className="text-secondary fs-16">
                    <div className="form-check form-switch ms-4">
                      <input className="form-check-input fs-4" type="checkbox" role="switch" name="status"/>
                    </div>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button className="action-btn border-secondary" onClick={() => showOffcanvasOnEditCakesFlavour(cakes)}>
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="action-btn border-secondary" onClick={() => showDeleteConfirmation(cakes.id)}>
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
                   <div className='fs-24'>
                     {cakeData ? "Update Flavour" : "Add Flavour"}
                   </div>
                </Offcanvas.Title>
                </Offcanvas.Header>
                <hr  className="mt-0"/>
                <Offcanvas.Body>
                 <AddFlavour
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