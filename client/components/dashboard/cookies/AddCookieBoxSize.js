"use client";
import React from "react";
import { useEffect, useState } from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast } from "react-toastify";
import axios from "axios";
import { createCookieBoxSize, updateCookieBoxSizeById, getAllCookieBoxTypes } from "@/utils/apiRoutes";

const AddCookieBoxSize = ({ closePopup, cookieBoxSizeData = null, onAddCookieBoxSize, onUpdateCookieBoxSize }) => {
  const [errors, setErrors] = useState([]);
  const {token} = useAxiosConfig();
  const [cookiesBoxTypes, setCookiesBoxTypes] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [formData, setFormData] = useState({
    cookies_types_id: "",
    name_en: "",
    name_ar: "",
    slug: "",
    portion_size: "",
    price: "",
    symbol: "",
    calories: "",
    status: "active",
  });

  useEffect(() => {
    if (cookieBoxSizeData) {
      setFormData({
        cookies_types_id: cookieBoxSizeData.cookies_types_id || "",
        name_en: cookieBoxSizeData.name_en || "",
        name_ar: cookieBoxSizeData.name_ar || "",
        slug: cookieBoxSizeData.slug || "",
        price: cookieBoxSizeData.price || "",
        portion_size: cookieBoxSizeData.portion_size || "",
        symbol: cookieBoxSizeData.symbol || "",
        calories: cookieBoxSizeData.calories || "",
        status: cookieBoxSizeData.status || "active",
      });
    }
  }, [cookieBoxSizeData]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.cookies_types_id) errors.push("Cookies types id is required.");
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.slug) errors.push("Slug is required.");
    if (!formData.price) errors.push("Price is required.");
    if (!formData.portion_size)errors.push("Additional price is required.");
    if (!formData.symbol) errors.push("Symbol is required.");
    if (!formData.calories) errors.push("Calories is required.");
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
  
      if (cookieBoxSizeData) {
        const res = await axios.put(updateCookieBoxSizeById(cookieBoxSizeData.id), payload);
  
        if (res.status === 200) {
          toast.success("Cookie Box Size updated successfully!", {
            autoClose: 1000,
          });
          
          if (onUpdateCookieBoxSize) {
            onUpdateCookieBoxSize({
              ...cookieBoxSizeData,
              ...formData,
              id: cookieBoxSizeData.id,
            });
          }

          closePopup();
        }
      }
      //  CREATE
      else {
        const res = await axios.post(createCookieBoxSize, payload);
  
        if (res.status === 201 || res.status === 200) {
          const selectedType = cookiesBoxTypes.find(
            (t) => String(t.id) === String(formData.cookies_types_id)
          );
  
          const createdCookie = {
            ...res.data,
            cookiesTypes: selectedType || null,
          };
  
          toast.success("Cookie Box Size added successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
          if (onAddCookieBoxSize) onAddCookieBoxSize(createdCookie);
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

  const fetchCookieBoxTypes = async () => {
    try {
      const response = await axios.get(getAllCookieBoxTypes);
      setCookiesBoxTypes(response?.data?.data);
    } catch (error) {
      console.error("Error fetching cookie box types", error);
    }
  };

  useEffect(() => {
    if(!token) return;
    fetchCookieBoxTypes();
  }, [token]);

  return (
    <form className="component-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label text-secondary">Name English</label>
        <input 
          name="name_en" 
          type="text" 
          className="form-control textarea-hover-dark"
          value={formData.name_en}
          onChange={(e)=>setFormData({...formData,name_en:e.target.value})}
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Name Arabic</label>
        <input
         name="name_ar" 
         type="text" className="form-control textarea-hover-dark"
         value={formData.name_ar} 
         onChange={(e)=>setFormData({...formData,name_ar:e.target.value})}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label text-secondary">Cookies Type</label>
        <select
          name="cookies_types_id"
          className="form-select textarea-hover-dark text-secondary"
          value={formData.cookies_types_id}
          onChange={(e)=>setFormData({...formData,cookies_types_id:e.target.value})}
        >
          <option value="">Select Cookie Type</option>

          {cookiesBoxTypes.map((cookiestype) => (
            <option key={cookiestype?.id} value={cookiestype?.id}>
              {cookiestype?.name_en}
            </option>
          ))}
        </select>
      </div>

      <div className="row mt-3">

      <div className="form-group col-md-6">
        <label className="form-label text-secondary">Slug</label>
        <input 
          name="slug" type="text" 
          className="form-control textarea-hover-dark"
          value={formData.slug} 
          onChange={(e)=>setFormData({...formData,slug:e.target.value})}
        />
      </div>

      <div className="form-group col-md-6">
        <label className="form-label text-secondary">Price</label>
        <input
          name="price" 
          type="number" 
          className="form-control textarea-hover-dark"
          value={formData.price} 
          onChange={(e)=>setFormData({...formData,price:e.target.value})}
        />
      </div>
      </div>
      
      <div className="row mt-3">
      <div className="form-group col-md-6">
        <label className="form-label text-secondary">Portion Size</label>
        <input 
          name="portion_size" 
          type="text" 
          className="form-control textarea-hover-dark"
          value={formData.portion_size} 
          onChange={(e)=>setFormData({...formData,portion_size:e.target.value})}
        />
      </div>

      <div className="form-group col-md-6">
        <label className="form-label text-secondary">Symbol</label>
        <input 
          name="symbol" 
          type="text" 
          className="form-control textarea-hover-dark"
          value={formData.symbol} 
          onChange={(e)=>setFormData({...formData,symbol:e.target.value})}
        />
      </div>
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Calories</label>
        <input 
          name="calories" 
          type="number" 
          className="form-control textarea-hover-dark"
          value={formData.calories} 
          onChange={(e)=>setFormData({...formData,calories:e.target.value})}
        />
      </div>


      <div className="col-md-12 mt-3">
        <div className="form-check form-switch m-2">
          <input 
            className="form-check-input fs-5" 
            name="status" 
            type="checkbox"
            role="switch" 
            checked={formData.status === "active"} 
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              status: e.target.checked ? "active" : "inactive",
            }))}
          />
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active"? "active": "inactive"}
          </label>
        </div>
      </div>

      <div className="col-md-12 px-1 mt-3">
        <label className="form-label text-secondary">File Attachment</label>
        <div className="">
          <input 
            type="file" 
            className="form-control textarea-hover-dark bg-light" 
            id="fileInput"
            multiple 
            onChange={handleFileChange}
          />
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li 
            className="list-unstyled text-muted" 
            key={index}><span className="fs-12 fw-bold">File flavour: {file.flavour}
             KB</span></li>
          ))}
        </ul>
        <div className="text-danger">
        <i className="bi bi-info-circle me-2"></i>
        <span className="fs-12 fw-bold">Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX</span>
        </div>
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button 
          type="submit" 
          className="org-btn rounded-3 border-0 py-2 fs-16 fw-bold w-100"
        >
          Save
        </button>
        <button 
          type="button" 
          className="cancle-btn rounded-3 border-1 fs-16 py-2 fw-bold w-100" 
          onClick={closePopup}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddCookieBoxSize;
