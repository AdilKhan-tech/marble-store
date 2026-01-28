"use Client"
import React , { useState , useEffect } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { createTag, updateTagById } from "@/utils/apiRoutes";

function AddTag({ closePopup, tagData = null, onAddTag, onUpdateTag }) {
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    slug: "",
  });

  useEffect(() => {
    if(tagData) {
      setFormData({
        name_en: tagData.name_en || "",
        name_ar: tagData.name_ar || "",
        slug: tagData.slug || "",
      });
    }
  }, [tagData]);

  const validateForm = () => {
    const errors = [];

    if (!formData.name_en) errors.push("Name English is required.");
    if (!formData.name_ar) errors.push("Name Arabic is required.");
    if (!formData.slug) errors.push("Slug is required.");
  
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    try {
      if (tagData) {
        const res = await axios.put(updateTagById(tagData.id), formData);
        toast.success("Tag updated successfully", {
          autoClose: 1000,
          onClose: closePopup,
        });
        onUpdateTag(res.data);
      } else {
        const res = await axios.post(createTag, formData);
        toast.success("Tag created successfully", {
          autoClose: 1000,
          onClose: closePopup,
        });
        onAddTag(res.data);
      }
    }catch (error) {
      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.errors?.[0] ||
        "Something went wrong!";
    
      toast.error(backendMessage);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      errors.forEach(err => toast.error(err));
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
          onChange={(e)=>setFormData({...formData,name_ar:e.target.value})}
        />
      </div>

      <div className='form-group mt-3'>
        <label className="form-label text-secondary">Slug</label>
        <input
          name='slug'
          className='form-control form-control-lg text-secondary'
          value={formData.slug} 
          onChange={(e)=>setFormData({...formData,slug:e.target.value})}
        />
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button type="button" className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100" >Cancel</button>
        <button type="submit" className="org-btn py-2 d-flex justify-content-center rounded-3 fs-16 fw-normal border-0 w-100">Save</button>
      </div>
    </form>
  )
}

export default AddTag;
