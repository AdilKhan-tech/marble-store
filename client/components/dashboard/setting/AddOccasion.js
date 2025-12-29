"use Client"
import React , { useState , useEffect } from 'react'
import {createOccasion} from "@/utils/apiRoutes"
import { toast } from 'react-toastify';
import axios from 'axios';

function AddOccasions({closePopup, occasions = null, addOccasion}) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    parent_ocassion: "",
    slug: "",
  });
  useEffect(() => {
    if (occasions) {
      setFormData({
        name_en: occasions.name_en || "",
        name_ar: occasions.name_ar || "",
        parent_ocassion: occasions.parent_ocassion || "",
        slug: occasions.slug || "",
      });
    }
  }, [occasions]);

    const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const validateForm = () => {
    const errors = [];
    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.parent_ocassion) errors.push("Parent Ocassion is required.");
    if (!formData.slug) errors.push("Slug is required.");
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
      const res = await axios.post(createOccasion, formData);

      if (res.status === 201 || res.status === 200) {
        const createdOcoasion = res.data.occasions;

        toast.success("Occasion added successfully!", {
          autoClose: 1000,
          onClose: closePopup,
        });

        if (addOccasion) addOccasion(createdOcoasion);
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
    <form className='mt-0' onSubmit={handleSubmit}>
        <div className='form-group'>
            <label className='form-label text-secondary'>Name English</label>
            <input 
             name='name_en'
             type='text'
             className='form-control form-control-lg text-secondary'
             value={formData.name_en} 
             onChange={(e)=>setFormData({...formData,name_en:e.target.value})}
             />
        </div>
        <div className='form-group mt-3'>
            <label className="form-label text-secondary">Name Arabic</label>
            <input
             name='name_ar'
             className='form-control form-control-lg text-secondary'
             value={formData.name_ar} 
             onChange={(e)=>setFormData({...formData,name_ar:e.target.value})}/>
        </div>
        <div className='form-group mt-3'>
            <label className="form-label text-secondary">Slug</label>
            <input
             name='slug'
             className='form-control form-control-lg text-secondary'
             value={formData.slug} 
             onChange={(e)=>setFormData({...formData,slug:e.target.value})}/>
        </div>
        <div className='form-group mt-3'>
            <label className='form-label text-secondary'
             value={formData.parent_ocassion} 
             onChange={(e)=>setFormData({...formData,parent_ocassion:e.target.value})}
            >Select Parent Occasion</label>
            <select className='form-select'>
                <option value="">Select Parent Occasion</option>
                <option value="None">None</option>
                <option value="Achievement">Achievement</option>
                <option value="Birthdays">Birthdays</option>
                <option value="Congratulations">Congratulations</option>
                <option value="Get Well Soon">Get Well Soon</option>
                <option value="Graduation">Graduation</option>
                <option value="Holidays">Holidays</option>
                <option value="New Born">New Born</option>
                <option value="Weddings">Weddings</option>
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
        <button type="button" className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100" onClick={closePopup}>Cancel</button>
        <button type="submit" className="org-btn py-2 d-flex justify-content-center rounded-3 fs-16 fw-normal border-0 w-100">Save</button>
       </div>
    </form>
  )
}

export default AddOccasions;
