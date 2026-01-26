"use client";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import axios from "axios";
import { createCakeSize, updateCakeSizeById, getAllCustomCakeTypes } from "@/utils/apiRoutes";

const AddCakeSize = ({ closePopup, cakeSizeData = null, onAddCakeSize, onUpdateCakeSize }) => {
  const {token} = useAxiosConfig();
  // const [errors, setErrors] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [customCakeTypes, setCustomCakeTypes] = useState([]);

  const [formData, setFormData] = useState({
    custom_cake_type_id: "",
    name_en: "",
    name_ar: "",
    slug: "",
    scoop_size: "",
    additional_price: "",
    calories: "",
    status: "active",
  });

  // Load existing data
  useEffect(() => {
    if (cakeSizeData) {
      setFormData({
        custom_cake_type_id: cakeSizeData.custom_cake_type_id || "",
        name_en: cakeSizeData.name_en || "",
        name_ar: cakeSizeData.name_ar || "",
        slug: cakeSizeData.slug || "",
        scoop_size: cakeSizeData.scoop_size || "",
        additional_price: cakeSizeData.additional_price || "",
        calories: cakeSizeData.calories || "",
        status: cakeSizeData.status || "active",
      });
    }
  }, [cakeSizeData]);

  const fetchCustomCakeTypes = async () => {
    try {
      const response = await axios.get(getAllCustomCakeTypes);
      setCustomCakeTypes(response.data.data)
    } catch (error) {
      console.error("Error fetching custom cake types", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCustomCakeTypes();
  }, [token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = new FormData();
  
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
  
      if (selectedFiles && selectedFiles.length > 0) {
        payload.append("image_url", selectedFiles[0]);
      }
  
      // ================= UPDATE =================
      if (cakeSizeData) {
        const res = await axios.put(
          updateCakeSizeById(cakeSizeData.id),
          payload
        );
  
        if (res.status === 200) {
          toast.success("Cake size updated successfully!", {
            autoClose: 1000,
          });

          const selectedType = customCakeTypes.find(
            (t) =>
              String(t.id) === String(formData.custom_cake_type_id)
          );
  
          if (onUpdateCakeSize) {
            onUpdateCakeSize({
              ...cakeSizeData,
              ...formData,
              id: cakeSizeData.id,
              customCakeType: selectedType || null,
            });
          }
  
          closePopup();
        }
      }
  
      // ================= CREATE =================
      else {
        const res = await axios.post(createCakeSize, payload);
  
        if (res.status === 201 || res.status === 200) {
          const selectedType = customCakeTypes.find((t) =>
              String(t.id) === String(formData.custom_cake_type_id)
          );
  
          const createdCakeSize = {
            ...res.data,
            customCakeType: selectedType || null,
          };
  
          toast.success("Cake Size added successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
  
          if (onAddCakeSize) onAddCakeSize(createdCakeSize);
        }
      }
    } catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0] ||
        "Something went wrong!";
    
      toast.error(backendMessage);
    }
  };

  return (
    <form className="mt-0" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label text-secondary">Name English</label>
        <input 
          name="name_en" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_en} 
          onChange={handleChange}
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Name Arabic</label>
        <input 
          name="name_ar" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar} 
          onChange={handleChange}
        />
      </div>


        <div className="form-group mt-3">
          <label className="form-label text-secondary">
            Cake Type
          </label>
          <select
            name="custom_cake_type_id"
            className="form-select textarea-hover-dark text-secondary"
            value={formData.custom_cake_type_id}
            onChange={handleChange}
          >
            <option value="">Select Cake Type</option>

            {customCakeTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name_en}
              </option>
            ))}
          </select>
        </div>


        <div className="row">
        <div className="form-group mt-3 col-md-6">
          <label className="form-label text-secondary">Slug</label>
          <input 
            name="slug" 
            type="text" 
            className="form-control form-control-lg textarea-hover-dark text-secondary"
            value={formData.slug} 
            onChange={handleChange}
          />
        </div>

      <div className="form-group mt-3 col-md-6">
        <label className="form-label text-secondary">Scoop Size</label>
        <input 
          name="scoop_size" 
          type="text" 
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.scoop_size} 
          onChange={handleChange}
        />
      </div>

      </div>

      <div className="row">
        <div className="form-group mt-3 col-md-6">
          <label className="form-label text-secondary">Additional Price</label>
          <input 
            name="additional_price" 
            type="text" 
            className="form-control form-control-lg textarea-hover-dark text-secondary"
            value={formData.additional_price} onChange={handleChange}
          />
        </div>

        <div className="form-group mt-3 col-md-6">
          <label className="form-label text-secondary">Calories</label>
          <input 
            name="calories" 
            type="text" 
            className="form-control form-control-lg textarea-hover-dark text-secondary"
            value={formData.calories} 
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="col-md-12 mt-3">
      <label className="form-label text-secondary me-3">Status</label>
        <div className="form-check form-switch ms-3">
          <input 
            className="form-check-input fs-4" 
            type="checkbox"
            role="switch" 
            checked={formData.status === "active"} 
            onChange={(e) => setFormData((prev) => ({
              ...prev,
              status: e.target.checked ? "active" : "inactive",
            }))
            }
          />
          <label className="form-check-label mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active"? "Active": "Inactive"}
          </label>
        </div>
      </div>

      <div className="col-md-12 px-1 mt-3">
        <label className="form-label text-secondary">File Attachment</label>
        <div className="">
          <input 
            type="file" 
            className="form-control form-control-lg textarea-hover-dark text-secondary" 
            id="fileInput"
            multiple onChange={handleFileChange}
          />
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted mt-2 fnt-color opacity-50 fs-16 fw-normal" key={index}>File Size: {file.size} KB</li>
          ))}
        </ul>
        <div className="text-danger">
        <i className="bi bi-info-circle me-2"></i>
        <span className="fs-14 fw-normal">Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX</span>
        </div>
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button type="button" className="cancle-btn rounded-3 w-100" onClick={closePopup}>Cancel</button>
        <button type="submit" className="org-btn w-100">Save</button>
       </div>

    </form>
  );
};

export default AddCakeSize;
