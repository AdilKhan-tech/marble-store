"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { createIcecreamSizes,  } from "@/utils/apiRoutes";
import CakeData from "./icecreamaddons/add/AddType";
import { updateIcecreamSizes } from "@/utils/apiRoutes";
const AddIceCream = ({ closePopup, iceCreamData, onAddIceCream }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    icecream_bucket_id: "",
    slug: "",
    additional_price: "",
    calorie: "",
    image_url: "",
    status: "active",
  });
  // Load existing data
  useEffect(() => {
    if (iceCreamData) {
      setFormData({
        name_en: iceCreamData.name_en || "",
        name_ar: iceCreamData.name_ar || "",
        icecream_bucket_id: iceCreamData.icecream_bucket_id || "",
        slug: iceCreamData.slug || "",
        additional_price: iceCreamData.additional_price || "",
        calorie: iceCreamData.calorie || "",
        image_url: iceCreamData.image_url || "",
        status: iceCreamData.status || false,
      });
    }
  }, [iceCreamData]);
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
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.icecream_bucket_id)
      errors.push("Icecream Bucket ID is required.");
    if (!formData.slug) errors.push("Slug is required.");
    if (!formData.additional_price)
      errors.push("Additional price is required.");
    if (!formData.calorie) errors.push("Calorie is required.");
    return errors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
     if(iceCreamData){
        const res = await axios.put(updateIcecreamSizes(iceCreamData.id), formData);
      if (res.status === 201 || res.status === 200) {
        const createdIceCream = res.data;

        toast.success("IceCream Size updated successfully!", {
          autoClose: 1000,
          onClose: closePopup,
        });

         onAddIceCream(createdIceCream);
      }
      } else {
        const res = await axios.post(createIcecreamSizes, formData);
      if (res.status === 201 || res.status === 200) {
        const createdIceCream = res.data;

        toast.success("IceCream Size added successfully!", {
          autoClose: 1000,
          onClose: closePopup,
        });

         onAddIceCream(createdIceCream);
      }
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Something went wrong!";
      setErrors([msg]);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach((err) => toast.error(err));
      setErrors([]);
    }
  }, [errors]);
  return (
    <form className="mt-0" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Name English
        </label>
        <input
          name="name_en"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_en}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Name Arabic
        </label>
        <input
          name="name_ar"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Select Icecream Bucket
        </label>
        <select
          name="icecream_bucket_id"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.icecream_bucket_id}
          onChange={handleChange}
        >
          <option value="" className="fs-14 fw-normal text-secondary">
            Select Icecream Bucket
          </option>
          <option value="1" className="fs-14 fw-normal text-secondary">
            Big Dipper
          </option>
          <option value="2" className="fs-14 fw-normal text-secondary">
            Pint
          </option>
          <option value="3" className="fs-14 fw-normal text-secondary">
            Quart
          </option>
          <option value="4" className="fs-14 fw-normal text-secondary">
            Regular
          </option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Slug
        </label>
        <input
          name="slug"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Additional Price
        </label>
        <input
          name="additional_price"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.additional_price}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Calorie
        </label>
        <input
          name="calorie"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.calorie}
          onChange={handleChange}
        />
      </div>
      <div className="col-md-12 mt-3">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            style={{ width: "50px", height: "26px" }}
            type="checkbox"
            role="switch"
            checked={formData.status === "active"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                status: e.target.checked ? "active" : "inactive",
              }))
            }
          />
          <label className="form-check-label ms-2 mt-1 fs-14 fw-normal text-secondary">
            {formData.status === "active" ? "Active" : "Inactive"}
          </label>
        </div>
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
            multiple
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
          onClick={closePopup}
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
};

export default AddIceCream;
