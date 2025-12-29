import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { createCakesSize, updateCakeSizeById } from "@/utils/apiRoutes";

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
        const res = await axios.put(updateCakeSizeById(cakeData.id), formData);

        if (res.status === 200) {
          toast.success("Cake size updated successfully!", {
            autoClose: 1000,
            onClose: closePopup,
          });
        }
      } else {
        const res = await axios.post(createCakesSize, formData);

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
    <form className="mt-0" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Name English</label>
        <input name="name_en" type="text" className="form-control form-control-lg textarea-hover-dark text-secondary"
        value={formData.name_en} onChange={handleChange}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Name Arabic</label>
        <input name="name_ar" type="text" className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.name_ar} onChange={handleChange}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Slug</label>
        <input name="slug" type="text" className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.slug} onChange={handleChange}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Scoop Size</label>
        <input name="scoop_size" type="text" className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.scoop_size} onChange={handleChange}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Additional Price</label>
        <input name="additional_price" type="text" className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.additional_price} onChange={handleChange}/>
      </div>

      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Symbol</label>
        <input name="symbol" type="text" className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.symbol} onChange={handleChange}/>
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Calories</label>
        <input name="calories" type="text" className="form-control form-control-lg textarea-hover-dark text-secondary"
          value={formData.calories} onChange={handleChange}/>
      </div>
      <div className="form-group mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Category</label>
        <select name="category_id" className="form-select textarea-hover-dark text-secondary"
          value={formData.category_id} onChange={handleChange}>
          <option value="" className="fs-14 fw-normal text-secondary">Select Category</option>
          <option value="12 Inch" className="fs-14 fw-normal text-secondary">12 Inch</option>
          <option value="16 Inch" className="fs-14 fw-normal text-secondary">16 Inch</option>
          <option value="Large" className="fs-14 fw-normal text-secondary">Large</option>
          <option value="Medium" className="fs-14 fw-normal text-secondary">Medium</option>
          <option value="Small" className="fs-14 fw-normal text-secondary">Small</option>
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
      <div className="col-md-12 px-1 mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">File Attachment</label>
        <div className="">
          <input type="file" className="form-control form-control-lg textarea-hover-dark text-secondary" id="fileInput"
            multiple onChange={handleFileChange}/>
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

export default CakeData;
