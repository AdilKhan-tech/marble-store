"use client";
import React, { use } from "react";
import { useEffect, useState } from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { createCookies, updateCookieById } from "@/utils/apiRoutes";

const AddCookie = ({ closePopup, cookieData = null, onAddCookie, onUpdateCookie }) => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name_en:"",
        name_ar:"",
        cookie_type_id :"",
        slug:"",
        sort:"",
        status:"active",
        image_url:"",
    })

    useEffect(() => {
        if (cookieData) {
          setFormData({
            name_en: cookieData.name_en || "",
            name_ar: cookieData.name_ar || "",
            cookie_type_id:cookieData.cookie_type_id || "",
            slug: cookieData.slug || "",
            sort: cookieData.sort || "",
            status: cookieData.status || "active",
            image_url: cookieData.image_url || "",
          });
        }
      }, [cookieData]);

      const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
 };

    const validateForm = () => {
    const errors = [];
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.cookie_type_id) errors.push("Cookie type is required.");
    if (!formData.slug) errors.push("Slug is required.");
    if (!formData.sort) errors.push("Sort is required.");
    if (!formData.status) errors.push("Status is required.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;
  
    try {
      const payload = new FormData();
  
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
  
      if (selectedFiles && selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          payload.append("image_url", selectedFiles[0]);
        });
      }

      if (cookieData) {
        const res = await axios.put(updateCookieById(cookieData.id), payload);

        if (res.status === 200) {
          toast.success("Cookie updated successfully!", {
            autoClose: 1000,
          });

          if (onUpdateCookie) {
            onUpdateCookie({
              ...cookieData,
              ...formData,
              id: cookieData.id,
            });
          }

          closePopup();
        }
      }
      //  CREATE
      else {
        const res = await axios.post(createCookies, payload);
  
        if (res.status === 201 || res.status === 200) {

          toast.success("Cookie added successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
  
          if (onAddCookie) onAddCookie(onAddCookie);
        }
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong!";
      setErrors([msg]);
    }
  };

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => toast.error(err));
      setErrors([]);
    }
  }, [errors]);
  return (
    <form className="mt-0" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label text-secondary">Name English</label>
        <input
          name="name_en" type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
            value={formData.name_en} onChange={handleChange}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label text-secondary">Name Arabic</label>
        <input
          name="name_ar" type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
            value={formData.name_ar} onChange={handleChange}/>
      </div>
      
      <div className="col-md-12 form-group mt-2">
        <label className="form-label text-secondary">Select Cookie Size</label>
        <select name="cookie_type_id" className="form-select textarea-hover-dark text-secondary"
          value={formData.cookie_type_id} onChange={handleChange}>Select Cookie Size
            <option value="">Select Cookie Type</option>
            <option value="1">adil</option>
            <option value="2">rehan</option>
            <option value="3">king</option>
            <option value="4">khan</option>
        </select>
      </div>

      <div className="form-group mt-2">
        <label className="form-label text-dark-custom text-secondary">Slug</label>
        <input
          name="slug" type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
            value={formData.slug} onChange={handleChange}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label text-dark-custom text-secondary">Sort</label>
        <input
          name="sort" type="number"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
            value={formData.sort} onChange={handleChange}/>
      </div>

      <div className="col-md-12 mt-3">
      <label className="form-label text-dark-custom text-secondary">Status</label>
        <div className="form-check form-switch m-3">
          <input 
            className="form-check-input fs-4" 
            type="checkbox"
            role="switch" 
            checked={formData.status === "active"} 
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              status: e.target.checked ? "active" : "inactive",
            }))}
          />
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active"? "Active": "Inactive"}
          </label>
        </div>
      </div>
      
      <div className="col-md-12 px-1 mt-2">
        <label className="form-label text-dark-custom text-secondary">File Attachment</label>
        <div className="">
          <input 
            type="file" 
            name="image_url"
            className="form-control form-control-lg textarea-hover-dark text-secondary" 
            id="fileInput"
            onChange={handleFileChange}
          />
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted" key={index}><span className="fs-12 fw-bold">File Size: {file.size} KB</span></li>
          ))}
        </ul>
        <div className="text-danger">
        <i className="bi bi-info-circle me-2"></i>
        <span className="fs-14 fw-normal">Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX</span>
        </div>
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
       <button type="button" className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100" onClick={closePopup}>Cancel</button>
       <button type="submit" className="org-btn py-2 d-flex justify-content-center rounded-3 fs-16 fw-normal border-0 w-100">Save</button>
      </div>
    </form>
  );
};

export default AddCookie;
