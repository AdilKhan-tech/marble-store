'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddCakes from "@/components/dashboard/cake/size/add/AddCakes";
import { useEffect, useState } from 'react';
import { getCakesSizes, deleteCakesSizes ,updateCakesSizes } from '@/utils/apiRoutes';
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
     const showOffcanvasOnEditCakesSize = (cake) => {
        setCakeData(cake);
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
    setCakes(prev => [newCake, ...prev]);
    setShowOffcanvas(false);
    };



  return (
    <>
    <section className='' style={{ marginTop:"100px"}}>
      <div className=""> 
      <p className="pagetitle mb-0 fnt-color">Cakes Sizes</p>
      <div className='d-flex justify-content-between mt-4'>
        <div className='d-flex'>
        <i className='bi bi-search fs-20 py-1 px-2 text-secondary bg-light rounded-3 border rounded-end-0 border-end-0'></i>
            <input type="text" className="form-control border rounded-start-0 border-start-0" placeholder="Search here..." style={{height:"46px", width:"300px"}}/>
            </div>
            <div style={{marginInlineEnd:"20px"}}>
              <div className='org-btn py-2 px-4 rounded-3' onClick={showOffcanvasOnAddCakesSize} role='button'><i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span></div>
            </div>
        </div>
        </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-3">

        <div className="datatable-wrapper">
          <div className="data-table p-2 rounded-4">
            <table className="table datatable datatable-table">
              <thead className=''>
                <tr className=''>
                  <th className="fw-16 fnt-color">ID</th>
                  <th className="fw-16 fnt-color">Name</th>
                  <th className="fw-16 fnt-color">Category</th>
                  <th className="fw-16 fnt-color">Slug</th>
                  <th className="fw-16 fnt-color">Scope/Size</th>
                  <th className="fw-16 fnt-color">Additional Price</th>
                  <th className="fw-16 fnt-color">Symbol</th>
                  <th className="fw-16 fnt-color">Calories</th>
                  <th className="fw-16 fnt-color">Status</th>
                  <th className="fw-16 fnt-color">Action</th>
                </tr>
              </thead>

              <tbody>
                {cakes.map((cake, index) => (
                  <tr key={`${cake.id}-${index}`}>

                    <td className="fw-normal fnt-color"><span className='ms-1'>{cake.id}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cake.name_en}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cake.category_id}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cake.slug}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cake.scoop_size}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cake.additional_price}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cake.symbol}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cake.calories}</span></td>
                    <td className="fs-16">
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
                        <button className="btn btn-sm btn-light p-2" onClick={() => showOffcanvasOnEditCakesSize(cake)}>
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
                   <div className='fs-24 fnt-color'>
                     {cakeData ? "Update Size" : "Add Size"}
                   </div>
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