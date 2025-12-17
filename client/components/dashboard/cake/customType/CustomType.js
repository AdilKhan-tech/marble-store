'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddType from '@/components/dashboard/cake/customType/add/AddType';
import { useEffect, useState } from 'react';
import { getCakeTypes, updateCakeTypes, deleteCakeTypes } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function Listcakes() {
  const {token} = useAxiosConfig();
  const [cakes, setcakes] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [cakeTypeData, setCakeTypeData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchcaketype = async () => {
    try {
      const response = await axios.get(getCakeTypes);
      console.log("cakes data:", response.data);
      setcakes(response.data)
    } catch (error) {
      console.error("Error fetching cakes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchcaketype();
  }, [token]);

  const showOffcanvasAddType = () => {
        setCakeTypeData(null);
        setShowOffcanvas(true);
     }
     const showOffcanvasEditType = (cakeType) => {
        setCakeTypeData(cakeType);
        setShowOffcanvas(true);
     }
     const closePopup = () => {
        setShowOffcanvas(false);
    };

      const handleDelete = async (cakeTypeId) => {
      try {
          const response = await axios.delete(deleteCakeTypes(cakeTypeId));
          if(response.status === 200) {
              toast.success("cakeType size deleted successfully!", {autoClose: 1000});
              fetchcaketype();
          }
      }catch (error){
          console.error("Error deleting cakeType size:", error);
          toast.error("Failed to delete cakeType size.");
          }
      }
      const showDeleteConfirmation = (cakeTypeId) => {
          const confirmed = window.confirm("Are you sure you want to delete this cakeType size?");
          if(confirmed){
              handleDelete(cakeTypeId)
          }
      }
    const addTypeToState = (newcakeType) => {
    setcakes(prev => [newcakeType, ...prev]);
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
  const toggleLetterStatus = async (cakeType) => {
    const currentStatus = String(cakeType.status || "").toLowerCase();
    const newStatus = currentStatus === "active" ? "in-active" : "active";
    try {
      const response = await axios.put(updateCakeTypes(cakeType.id), {
        status: newStatus,
      });
      if (response.status === 200) {
        setcakes((prev) =>
          prev.map((c) => (c.id === cakeType.id ? { ...c, status: newStatus } : c))
        );
        toast.success(`Status updated to ${newStatus}`, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status!", { autoClose: 3000 });
    }
  };




  return (
    <>
    <section className='' style={{ marginTop:"100px"}}>
      <div className=""> 
      <p className="pagetitle mb-0 fnt-color">Cake Type</p>
      <div className='d-flex justify-content-between mt-4'>
        <div className='d-flex'>
        <i className='bi bi-search fs-20 py-1 px-2 text-secondary bg-light rounded-3 border rounded-end-0 border-end-0'></i>
            <input type="text" className="form-control border rounded-start-0 border-start-0" placeholder="Search here..." style={{height:"46px", width:"300px"}}/>
            </div>
            <div style={{marginInlineEnd:"20px"}}>
              <div className='org-btn py-2 px-4 rounded-3' onClick={showOffcanvasAddType} role='button'><i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span></div>
            </div>
        </div>
        </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-3">

        <div className="datatable-wrapper">
          <div className="data-table p-2 rounded-4">
            <table className="table datatable datatable-table">
              <thead className=''>
                <tr className=''>
                  <th onClick={() => handleSort("id")} className="nowrap">
                  ID <span className="fs-12 text-secondary">{renderSortIcon("id")}</span></th>
                  <th onClick={() => handleSort("name_en")} className="nowrap">
                    Name <span className="fs-12 text-secondary">{renderSortIcon("name_en")}</span></th>
                  <th onClick={() => handleSort("slug")} className="nowrap">
                    Slug <span className="fs-12 text-secondary">{renderSortIcon("slug")}</span></th>
                  <th onClick={() => handleSort("status")} className="nowrap">
                    Status <span className="fs-12 text-secondary">{renderSortIcon("status")}</span></th>
                  <th className="fw-16 fnt-color">Action</th>
                </tr>
              </thead>

              <tbody>
                {cakes.map((cakeType, index) => (
                  <tr key={`${cakeType.id}-${index}`}>

                    <td className="fw-normal fnt-color"><span className='ms-1'>{cakeType.id}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cakeType.name_en}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{cakeType.slug}</span></td>
                    <td className="fs-16">
                    <div className="form-check form-switch ms-4">
                      <input className="form-check-input fs-4" type="checkbox" role="switch" name="status"
                        id={`flexSwitchCheck-${cakeType?.id || ''}`}
                        checked={String(cakeType?.status || "").toLowerCase() === "active"} onChange={() => toggleLetterStatus(cakeType)}/>
                    </div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-light p-2" onClick={() => showOffcanvasEditType(cakeType)}>
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="btn btn-sm btn-light p-2" onClick={() => showDeleteConfirmation(cakeType.id)}>
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
                     {cakeTypeData ? "Update Size" : "Add Size"}
                   </div>
                </Offcanvas.Title>
                </Offcanvas.Header>
                <hr  className="mt-0"/>
                <Offcanvas.Body>
                 <AddType
                    cakeTypeData={cakeTypeData}
                    closePopup={closePopup}
                    onAddType={addTypeToState}
                />
                </Offcanvas.Body>
            </Offcanvas>
            <ToastContainer />

      </div>
    </section>
    </>
    
  )
}