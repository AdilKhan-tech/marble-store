'use client';
import React from 'react'
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import AddIceCreamAddon from "@/components/dashboard/icecream/AddIceCreamAddon";
import { useEffect, useState } from 'react';
import { deleteIceCreamsAddonById, getIcecreamAddons } from '@/utils/apiRoutes';
import Offcanvas from 'react-bootstrap/Offcanvas';
export default function IceCreamAddon () {
  const {token} = useAxiosConfig();
  const [iceCreamAddons, setIceCreamAddons] = useState([]);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [IceCreamAddonData, setIceCreamAddonData] = useState(null);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchIceCreamAddon = async () => {
    try {
      const response = await axios.get(getIcecreamAddons);
      setIceCreamAddons(response.data)
    } catch (error) {
      console.error("Error fetching icecream Addon", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchIceCreamAddon();
  }, [token]);

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

      const handleDelete = async (iceCreamId) => {
      try {
          const response = await axios.delete(deleteIceCreamsAddonById(iceCreamId));
          if(response.status === 200) {
              toast.success("icecream Addon deleted successfully!", {autoClose: 1000});
              fetchIceCreamAddon();
          }
      }catch (error){
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
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
  };
  const renderSortIcon = (field) => {
    return sortField === field ? (sortOrder === "asc" ? "↑" : "↓") : "↑↓";
  };
  const toggleLetterStatus = async (icecream) => {
    const currentStatus = String(icecream.status || "").toLowerCase();
    const newStatus = currentStatus === "active" ? "in-active" : "active";
    try {
      const response = await axios.put(updateIceCreamAddOnsById(icecream.id), {
        status: newStatus,
      });
      if (response.status === 200) {
        setIceCreamAddons((prev) =>
          prev.map((c) => (c.id === icecream.id ? { ...c, status: newStatus } : c))
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
      <p className="pagetitle mb-0 fnt-color">Ice Cream Addons</p>
      <div className='d-flex justify-content-between mt-4'>
        <div className='d-flex'>
        <i className='bi bi-search fs-20 py-1 px-2 text-secondary bg-light rounded-3 border rounded-end-0 border-end-0'></i>
            <input type="text" className="form-control border rounded-start-0 border-start-0" placeholder="Search here..." style={{height:"46px", width:"300px"}}/>
            </div>
            <div style={{marginInlineEnd:"20px"}}>
              <div className='org-btn py-2 px-4 rounded-3' onClick={showOffcanvasOnAddicecreamsSize} role='button'><i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span></div>
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
                  <th onClick={() => handleSort("type")} className="nowrap">
                    Type <span className="fs-12 text-secondary">{renderSortIcon("type")}</span></th>
                  <th onClick={() => handleSort("status")} className="nowrap">
                    Status <span className="fs-12 text-secondary">{renderSortIcon("status")}</span></th>
                  <th className="fw-16 fnt-color">Action</th>
                </tr>
              </thead>

              <tbody>
                {iceCreamAddons.map((icecream, index) => (
                  <tr key={`${icecream.id}-${index}`}>

                    <td className="fw-normal fnt-color"><span className='ms-1'>{icecream.id}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{icecream.name_en}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{icecream.slug}</span></td>
                    <td className="fw-normal fnt-color"><span className='ms-1'>{icecream.add_on_type}</span></td>
                    <td>
                      <div className={icecream?.status === "active" ? "blue-status" : "red-status"}>
                        {icecream?.status === "active" ? "Active" : "Inactive"}
                      </div>
                    </td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-light p-2" onClick={() => showOffcanvasOnEditicecreamsSize(icecream)}>
                          <i className="bi bi-pencil text-primary"></i>
                        </button>
                        <button className="btn btn-sm btn-light p-2" onClick={() => showDeleteConfirmation(icecream.id)}>
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
    </>
    
  )
}