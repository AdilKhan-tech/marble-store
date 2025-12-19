"use client";
import React from "react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { createCakesFlavour, updateCakesFlavour } from "@/utils/apiRoutes";

const AddCakeFlavours = ({ closePopup, flavorData = null,onAddFlavor }) => {
  const [errors, setErrors] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [formData, setFormData] = useState({
    category_id: "",
    name_en: "",
    name_ar: "",
    slug: "",
    additional_price: "",
    symbol: "",
    status: false,
  });

  useEffect(() => {
    if (flavorData) {
      setFormData({
        category_id: flavorData.category_id || "",
        name_en: flavorData.name_en || "",
        name_ar: flavorData.name_ar || "",
        slug: flavorData.slug || "",
        additional_price: flavorData.additional_price || "",
        symbol: flavorData.symbol || "",
        status: flavorData.status || false,
      });
    }
  }, [flavorData]);

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

  const validateForm = () => {
    const errors = [];
    if (!formData.category_id) errors.push("Category id is required.");
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.slug) errors.push("Slug is required.");
    if (!formData.additional_price)errors.push("Additional price is required.");
    if (!formData.symbol) errors.push("Symbol is required.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    try {
      if (flavorData) {
        const res = await axios.put(updateCakesFlavour(flavorData.id), formData);

        if (res.status === 200) {
          toast.success("Cake flavour updated successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
        }
      } else {
        const res = await axios.post(createCakesFlavour, formData);

        if (res.status === 201 || res.status === 200) {
          const createdFlavor = res.data.cakesflavour;
          toast.success("Cake Flavour added successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
           if (onAddFlavor) onAddFlavor(createdFlavor);
        return;
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
    <form className="component-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Name English</label>
        <input name="name_en" type="text" className="form-control textarea-hover-dark"
        value={formData.name_en} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Name Arabic</label>
        <input name="name_ar" type="text" className="form-control textarea-hover-dark"
          value={formData.name_ar} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Slug</label>
        <input name="slug" type="text" className="form-control textarea-hover-dark"
          value={formData.slug} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Additional Price</label>
        <input name="additional_price" type="text" className="form-control textarea-hover-dark"
          value={formData.additional_price} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Symbol</label>
        <input name="symbol" type="text" className="form-control textarea-hover-dark"
          value={formData.symbol} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Category</label>
        <select name="category_id" className="form-select"
          value={formData.category_id} onChange={handleChange}>
          <option value="" className="fs-14 fw-normal">Select Category</option>
          <option value="1" className="fs-14 fw-normal">Cake N Cup</option>
          <option value="2" className="fs-14 fw-normal">Cookies Cakes</option>
          <option value="3" className="fs-14 fw-normal">Rectangle Cakes</option>
          <option value="4" className="fs-14 fw-normal">Round Cakes</option>
          <option value="5" className="fs-14 fw-normal">Cute Cakes</option>
          <option value="6" className="fs-14 fw-normal">Ice Cream Cakes</option>
          <option value="7" className="fs-14 fw-normal">Sponge Cakes</option>
        </select>
      </div>

      <div className="col-md-12 mt-3">
        <div className="form-check form-switch">
          <input className="form-check-input" style={{ width: "50px", height: "26px" }} type="checkbox"
            role="switch" checked={formData.status === "Active"} onChange={(e) => setFormData((prev) => ({
                ...prev,status: e.target.checked ? "Active" : "Inactive",}))}/>
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "Active"? "Active": "Inactive"}
          </label>
        </div>
      </div>
      <div className="col-md-12 px-1 mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">File Attachment</label>
        <div className="">
          <input type="file" className="form-control textarea-hover-dark bg-light" id="fileInput"
            multiple onChange={handleFileChange}/>
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted" key={index}><span className="fs-12 fw-bold">File flavour: {file.flavour} KB</span></li>
          ))}
        </ul>
        <div className="text-danger">
        <i className="bi bi-info-circle me-2"></i>
        <span className="fs-12 fw-bold">Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX</span>
        </div>
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button type="submit" className="org-btn rounded-3 border-0 py-2 fs-16 fw-bold w-100">Save</button>
        <button type="button" className="cancle-btn rounded-3 border-1 fs-16 py-2 fw-bold w-100" onClick={closePopup}>Cancel</button>
      </div>
    </form>
  );
};

export default AddCakeFlavours;
