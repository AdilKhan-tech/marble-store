"use client"
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import axios from "axios";
import { createBranch, updateBranchById } from "@/utils/apiRoutes";

const AddBranch = ({ closePopup, branchData = null, onAddBranch, onUpdateBranch }) => {

    const [formData, setFormData] = useState({
        name_en: "",
        name_ar: "",
        slug: "",
        city: "",
        address: "",
        latitude: "",
        longitude: "",
        number: "",
        timing: "",
        branch_store_id: "",
        status: "Active for Both",
    });

    useEffect(() => {
        if (branchData) {
          setFormData({
            name_en: branchData.name_en || "",
            name_ar: branchData.name_ar || "",
            slug: branchData.slug || "",
            city: branchData.city || "",
            address: branchData.address || "",
            latitude: branchData.latitude || "",
            longitude: branchData.longitude || "",
            number: branchData.number || "",
            timing: branchData.timing || "",
            branch_store_id: branchData.branch_store_id || "",
            status: branchData.status || "Active for Both",
          });
        }
      }, [branchData]);
      

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // UPDATE
          if (branchData) {
            const res = await axios.put(
              updateBranchById(branchData.id),
              formData
            );
    
            toast.success("Branch updated successfully");
            onUpdateBranch?.(res.data.data);
          }
          
    
          // CREATE
          else {
            const res = await axios.post(createBranch, formData);
    
            toast.success("Branch added successfully");
            onAddBranch?.(res.data.data);
          }
    
          closePopup();
        } catch (error) {
          toast.error(error?.response?.data?.message || "Something went wrong");
        }
      };

    return (
        <form className="mt-0" onSubmit={handleSubmit}>
        <div className="form-group">
            <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Name English</label>
            <input 
                name="name_en" 
                type="text" 
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.name_en} 
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-2">
            <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Name Arabic</label>
            <input 
                name="name_ar" 
                type="text" 
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.name_ar}
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-2">
            <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Slug</label>
            <input 
                name="slug" 
                type="text" 
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.slug}
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-2">
            <label className="form-label fs-14 fw-bold text-secondary">City</label>
            <input
                name="city"
                type="text"
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.city}
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-secondary">Address</label>
        <textarea
            name="address"
            rows="2"
            className="form-control textarea-hover-dark text-secondary"
            value={formData.address}
            onChange={handleChange}
        />
        </div>

        <div className="form-group mt-2">
            <label className="form-label fs-14 fw-bold text-secondary">Latitude</label>
            <input
                name="latitude"
                type="number"
                step="any"
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.latitude}
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-2">
            <label className="form-label fs-14 fw-bold text-secondary">Longitude</label>
            <input
                name="longitude"
                type="number"
                step="any"
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.longitude}
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-2">
            <label className="form-label fs-14 fw-bold text-secondary">Number</label>
            <input
                name="number"
                type="text"
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.number}
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-2">
            <label className="form-label fs-14 fw-bold text-secondary">Timing</label>
            <input
                name="timing"
                type="text"
                placeholder="e.g. 9:00 AM - 11:00 PM"
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.timing}
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-2">
            <label className="form-label fs-14 fw-bold text-secondary">Branch Store Id</label>
            <input
                name="branch_store_id"
                type="number"
                className="form-control form-control-lg textarea-hover-dark text-secondary"
                value={formData.branch_store_id}
                onChange={handleChange}
            />
        </div>

        <div className="form-group mt-3">
            <label className="form-label fs-14 fw-bold text-secondary">
                Status
            </label>
            <select
                name="status"
                className="form-select text-secondary"
                value={formData.status}
                onChange={handleChange}
            >
                <option value="">Select Status</option>
                <option value="Active for Pickup Only">Active for Pickup Only</option>
                <option value="Active for Both">Active for Both</option>
                <option value="Inactive for Both">Inactive for Both</option>
            </select>
        </div>


        <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
            <button type="button" className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100" onClick={closePopup}>Cancel</button>
            <button type="submit" className="org-btn py-2 d-flex justify-content-center rounded-3 fs-16 fw-normal border-0 w-100">Save</button>
        </div>

        </form>
    );
};

export default AddBranch;
