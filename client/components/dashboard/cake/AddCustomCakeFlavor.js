"use client";
import React, { useEffect } from "react";
import { useState } from "react";

function AddCustomCakeFlavor({ closePopup, customCakeFlavorData = null }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    slug: "",
    cake_type_id: "",
    status: "active",
    image_url: "",
  });

  useEffect(() => {
    if (customCakeFlavorData) {
      setFormData({
        name_en: customCakeFlavorData.name_en || "",
        name_ar: customCakeFlavorData.name_ar || "",
        slug: customCakeFlavorData.slug || "",
        cake_type_id: customCakeFlavorData.cake_type_id || "",
        status: customCakeFlavorData.status || "",
      });
    }
  }, [customCakeFlavorData]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };
  return (
    <form className="mt-0">
      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Name English
        </label>
        <input
          name="name_en"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_en} onChange={(e)=>setFormData({...formData,name_en:e.target.value})}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Name Arabic
        </label>
        <input
          name="name_ar"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar} onChange={(e)=>setFormData({...formData,name_ar:e.target.value})}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Slug
        </label>
        <input
          name="slug"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug} onChange={(e)=>setFormData({...formData,slug:e.target.value})}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Cake Type
        </label>
        <select
          name="cake_type_id"
          type="select"
          className="form-select textarea-hove-dark text-secondary"
          value={formData.cake_type_id} onChange={(e)=>setFormData({...formData,cake_type_id:e.target.value})}>
          <option value="Cookie Cake">Cookie Cake</option>
          <option value="Cute Cake">Cute Cake</option>
          <option value="Ice Cream Cake">Ice Cream Cake</option>
          <option value="Other">Other</option>
          <option value="Sponge Cake ">Sponge Cake </option>
        </select>
      </div>

      <div className="col-md-12 px-1 mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          File Attachment
        </label>
        <div className="">
          <input
            type="file"
            className="form-control form-control-lg textarea-hover-dark text-secondary"
            id="fileInput"
            onChange={handleFileChange}
          />
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted" key={index}>
              <span className="fs-12 fw-bold">File Size: {file.size} KB</span>
            </li>
          ))}
        </ul>
        <div className="text-danger">
          <i className="bi bi-info-circle me-2"></i>
          <span className="fs-14 fw-normal">
            Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX
          </span>
        </div>
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button
          type="button"
          className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="org-btn py-2 d-flex justify-content-center rounded-3 fs-16 fw-normal border-0 w-100"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default AddCustomCakeFlavor;
