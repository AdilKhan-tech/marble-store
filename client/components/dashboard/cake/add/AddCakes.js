import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { createCakesSizes, updateCakesSizes } from "@/utils/apiRoutes";

const CakeData = ({ closePopup, cakeData = null,onAddCake }) => {
  const [errors, setErrors] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const [formData, setFormData] = useState({
    category_id: "",
    name_en: "",
    name_ar: "",
    slug: "",
    scoop_size: "",
    additional_price: "",
    symbol: "",
    calories: "",
    status: false,
  });

  // Load existing data
  useEffect(() => {
    if (cakeData) {
      setFormData({
        category_id: cakeData.category_id || "",
        name_en: cakeData.name_en || "",
        name_ar: cakeData.name_ar || "",
        slug: cakeData.slug || "",
        scoop_size: cakeData.scoop_size || "",
        additional_price: cakeData.additional_price || "",
        symbol: cakeData.symbol || "",
        calories: cakeData.calories || "",
        status: cakeData.status || false,
      });
    }
  }, [cakeData]);

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
    if (!formData.scoop_size) errors.push("Scoop size is required.");
    if (!formData.additional_price)
      errors.push("Additional price is required.");
    if (!formData.symbol) errors.push("Symbol is required.");
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    try {
      if (cakeData) {
        const res = await axios.put(updateCakesSizes(cakeData.id), formData);

        if (res.status === 200) {
          toast.success("Cake size updated successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
        }
      } else {
        const res = await axios.post(createCakesSizes, formData);

        if (res.status === 201 || res.status === 200) {
          const createdCake = res.data.cakesizes;
          toast.success("Cake Size added successfully!", {
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
        <input name="name_en" type="text" className="form-control"
        value={formData.name_en} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Name Arabic</label>
        <input name="name_ar" type="text" className="form-control"
          value={formData.name_ar} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Slug</label>
        <input name="slug" type="text" className="form-control"
          value={formData.slug} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Scoop Size</label>
        <input name="scoop_size" type="text" className="form-control"
          value={formData.scoop_size} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Additional Price</label>
        <input name="additional_price" type="text" className="form-control"
          value={formData.additional_price} onChange={handleChange}/>
      </div>

      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Symbol</label>
        <input name="symbol" type="text" className="form-control"
          value={formData.symbol} onChange={handleChange}/>
      </div>
      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Calories</label>
        <input name="calories" type="text" className="form-control"
          value={formData.calories} onChange={handleChange}/>
      </div>
      <div className="form-group mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">Category</label>
        <select name="category_id" className="form-select"
          value={formData.category_id} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="1">Cakes</option>
          <option value="2">Ice Cream</option>
          <option value="3">Bakery</option>
        </select>
      </div>

      <label className="fs-14 fw-bold fnt-color opacity-75 mt-2 mb-1">Status</label>
      <div className="form-check form-switch ms-4">
        <input className="form-check-input fs-4" type="checkbox" role="switch"
          name="status" checked={formData.status} onChange={handleChange}/>
      </div>
      <div className="col-md-12 px-1 mt-3">
        <label className="fs-14 fw-bold fnt-color opacity-75 mb-1">File Attachment</label>
        <div className="">
          <input type="file" className="form-control bg-light" id="fileInput"
            multiple onChange={handleFileChange}/>
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted" key={index}><span className="fs-12 fw-bold">File Size: {file.size} KB</span></li>
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

export default CakeData;
