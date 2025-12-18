"use client";
import React from "react";
import { useState } from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { createCookiesSizes, updateCookiesSizes } from "@/utils/apiRoutes";

const AddCookieBoxSize = (closePopup) => {
  const {token} = useAxiosConfig();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    name_ar: "",
    name_en: "",
    cookies_type_id: "",
    slug: "",
    portion_size: "",
    price: "",
    symbol: "",
    calories: "",
    calories:"",
    status: "active",
  });

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  }

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

  const fetchCustomCakeTypes = async () => {
    try {
      const response = await axios.get(getAllCustomCakeTypes);
      setCustomCakeTypes(response.data)
    } catch (error) {
      console.error("Error fetching custom cake types", error);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    try {
      if (cookieData) {
        const res = await axios.put(updateCookiesSizes(cookieData.id), formData);

        if (res.status === 200) {
          toast.success("Cookie Box Size updated successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
        }
      } else {
        const res = await axios.post(createCookiesSizes, formData);

        if (res.status === 201 || res.status === 200) {
          const createdCake = res.data.cookiesizes;
          toast.success("Cookie Box Size added successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
           if (onAddCake) onAddCake(createdCake); // update parent state
        return; // exit so closePopup is not called
        }
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong!";
      setErrors([msg]);
    }
  };
  return (
    <form>
      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Name English</label>
        <input 
         name="name_en" type="text"
         className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_en} 
          onChange={handleChange}
         />
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Name Arabic</label>
        <input
         name="name_ar" type="text" 
         className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar}
          onChange={handleChange}
         />
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Cookies Type</label>
        <select name="cookies_type_id" className="form-select textarea-hover-dark text-secondary">
          <option value="" className="fs-14 fw-normal text-secondary">Select Category</option>
          <option value="Original" className="fs-14 fw-normal text-secondary">Original</option>
          <option value="big_bite" className="fs-14 fw-normal text-secondary">Big Bite</option>

        </select>
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Slug</label>
        <input
         name="slug" type="text" 
         className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug} 
          onChange={handleChange}
         />
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Portion Size</label>
        <input
         name="portion_size" type="text" 
         className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.portion_size} 
          onChange={handleChange}
         />
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Price</label>
        <input
         name="price" type="text" 
         className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.price} 
          onChange={handleChange}
         />
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Symbol</label>
        <input
         name="symbol" type="text" 
         className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.symbol} 
          onChange={handleChange}
         />
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Calories</label>
        <input
         name="calories" type="text" 
         className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.calories}
          onChange={handleChange}
         />
      </div>
      <div className="col-md-12 mt-3">
        <div className="form-check form-switch">
          <input className="form-check-input" style={{ width: "50px", height: "26px" }} type="checkbox"
            role="switch" checked={formData.status === "active"} onChange={(e) => setFormData((prev) => ({
                ...prev,status: e.target.checked ? "Active" : "Inactive",}))}/>
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "Active"? "Active": "Inactive"}
          </label>
        </div>
      </div>
      <div className="col-md-12 mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">File Attachment</label>
        <input
          type="file"
          className="form-control form-control-lg textarea-hover-dark text-secondary" id="fileInput"
          multiple onChange={handleFileChange}/>
      </div>
      <ul className="mt-2">
        {selectedFiles.map((file, index) => (
          <li className="list-unstyled text-muted" key={index}><span className="fs-12 fw-bold">File Size: {file.size} KB</span></li>
        ))}
      </ul>
      <div className="text-danger">
        <i className="bi bi-info-circle m-1"></i>
        <span className="fs-14 fw-normal">Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX</span>
      </div>
      <div className="btn-group mt-5 d-flex justify-content-between gap-2">
        <button type="button" className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100" >Cancel</button>
        <button type="button" className="org-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100">Save</button>
      </div>
    </form>
  );
};

export default AddCookieBoxSize;
