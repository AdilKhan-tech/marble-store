"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { UpdateCategoryById, createCategory } from "@/utils/apiRoutes";

const AddCategory = ({closePopup, categoryData = null, onAddCategory, onUpdateCategory}) => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    slug: "",
    parent_category: "",
    display_type: "",
  });

  useEffect(() => {
    if (categoryData) {
      setFormData({
        name_en: categoryData.name_en || "",
        name_ar: categoryData.name_ar || "",
        slug: categoryData.slug || "",
        parent_category: categoryData.parent_category || "",
        display_type: categoryData.display_type || "",
      });
    }
  }, [categoryData]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };
  
  const validateForm = () => {
    const errors = [];
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.slug) errors.push("slug is required.");
    if (!formData.parent_category) errors.push("Parent Category is required.");
    if (!formData.display_type) errors.push("Display Type is required.");
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
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) =>payload.append(key, value));
      if (selectedFiles.length > 0) {
        payload.append("image_url", selectedFiles[0]);
      }
      if (categoryData) {
        const response = await axios.put(UpdateCategoryById(categoryData.id),payload);
        if (response.status === 200 || response.status === 201) {
          toast.success("Category updated successfully!", {autoClose: 1000,onClose: closePopup,});
            onUpdateCategory(response.data);
        }
      } else {
        const response = await axios.post(createCategory, payload);
        if (response.status === 200 || response.status === 201) {
          toast.success("Category created successfully!", {autoClose: 1000,onClose: closePopup,});
          onAddCategory(response.data);
        }
      }
    } catch (error) {
      setErrors([error?.response?.data?.message || "Something went wrong!"]);
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
      <div className="form-group mt-3">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Name English
        </label>
        <input
          name="name_en"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_en}
          onChange={(e) =>
            setFormData({ ...formData, name_en: e.target.value })
          }
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Name Arabic
        </label>
        <input
          name="name_ar"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar}
          onChange={(e) =>
            setFormData({ ...formData, name_ar: e.target.value })
          }
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Slug
        </label>
        <input
          name="slug"
          type="text"
          className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Parent Category
        </label>
        <select
          name="parent_category"
          type="text"
          className="form-select textarea-hover-dark text-secondary"
          value={formData.parent_category}
          onChange={(e) =>
            setFormData({ ...formData, parent_category: e.target.value })
          }
        >
          <option value="">Select Parent Category</option>
          <option value="None">None</option>
          <option value="Cakes">Cakes</option>
          <option value="Addons">Addons</option>
          <option value="Bonus">Bonus</option>
        </select>
      </div>

      <div className="form-group mt-3">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          Display Type
        </label>
        <select
          name="display_type"
          className="form-select textarea-hover-dark text-secondary"
          value={formData.display_type}
          onChange={(e) =>
            setFormData({ ...formData, display_type: e.target.value })
          }
        >
          <option value="">Select Display Type</option>
          <option value="Default">Default</option>
          <option value="Product">Product</option>
          <option value="Subcategories">Subcategories</option>
          <option value="Both">Both</option>
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

export default AddCategory;
