"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {getAllGenders, getAllBranches, getCategoryTree, getAllTags, getAllOcassions, createProductRoute} from "@/utils/apiRoutes";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import MultiSelectDropdown from "@/components/dashboard/MultiSelectDropdown";
import axios from "axios";
import Common from "@/utils/Common"
import { toast, ToastContainer } from "react-toastify";
import { useRef } from "react";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const MemoJoditEditor = React.memo(JoditEditor);

const AddProduct = ({ onAddProduct }) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const {token} = useAxiosConfig();
  const [parentCategories, setParentCategories] = useState([]);
  const descriptionRef = useRef("");
  const [genders , setGenders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const [branchIds, setBranchIds] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [occasionIds, setOccasionIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  
  const [formData, setFormData] = useState({
    name_en:"",
    name_ar:"",
    tag_ids: [], 
    description:"",
    occasion_ids: [], 
    gender_id:"",
    regular_price:"",
    sale_price:"",
    tax_status:"Taxable",
    tax_class:"Standard",
    branch_ids: [],
    category_ids: []
  });

  const handleFileChange = (e) => {
    setSelectedFile(Array.from(e.target.files));
  };

  const fetchGenders = async () => {
    try {
      const response = await axios.get(getAllGenders);
      setGenders(response?.data?.data);  
    } catch (error) {
      console.error("Error fetching Genders", error);
    }
  };

  const fetchBranches = async () => {
    try {
      const res = await axios.get(getAllBranches);
      setBranches(res?.data?.data || []);
    } catch (err) {
      console.error("Branch fetch error", err);
    }
  };

  const fetchTags = async () => {
    try {
      const res = await axios.get(getAllTags);
      setTags(res?.data?.data || []);
    } catch (err) {
      console.error("Tag fetch error", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get(getCategoryTree);
      const flatCategories = Common.flattenCategories(res.data.data);
      setParentCategories(flatCategories);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };

  const fetchOccasions = async () => {
    try {
      const res = await axios.get(getAllOcassions);
      setOccasions(res?.data?.data || []);
    } catch (err) {
      console.error("Occasion fetch error", err);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchGenders();
    fetchBranches();
    fetchTags();
    fetchCategories();
    fetchOccasions();
  }, [token]);

  const editorConfig = useMemo(() => ({
    height: 300,
  }), []);

  const validateForm = () => {
    const errors = [];
    if (!formData.name_en) errors.push("Name English is required");
    if (!formData.name_ar) errors.push("Name Arabic is required");
    if (!formData.description) errors.push("Description is required");
    if (!formData.gender_id) errors.push("Gender is required");
  
    if (!formData.branch_ids.length)
      errors.push("At least one branch is required");
  
    if (!formData.category_ids.length)
      errors.push("At least one category is required");
  
    if (!formData.occasion_ids.length)
      errors.push("At least one occasion is required");

    if (!formData.tag_ids.length)
      errors.push("At least one tag is required");
  
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      // normal fields
      Object.entries(formData).forEach(([k, v]) => {
        payload.append(k, v);
      });

      // // multiselect ids
      branchIds.forEach((id) => payload.append("branch_ids[]", id));
      categoryIds.forEach((id) => payload.append("category_ids[]", id));
      occasionIds.forEach((id) => payload.append("occasion_ids[]", id));
      tagIds.forEach((id) => payload.append("tag_ids[]", id));

      selectedFile.forEach((file) => {
        payload.append("image_url", file); 
      });

      const res = await axios.post(createProductRoute, payload);
      toast.success("Product added successfully!", {
        autoClose: 500,
        onClose: () => {
        setTimeout(() => router.push("/dashboard/product"), 500);
        },
      });

      if (onAddProduct) onAddProduct(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => toast.error(err));
      setErrors([]);
    }
  }, [errors]);

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div className="card p-4 rounded-4">
        <div className="row">
          <div className="col-md-4">
            <div className="">
              <div
                className="position-relative w-100 bg-white d-flex justify-content-center"
                style={{
                  border: "2px dashed #e6e6e6",
                  borderRadius: "20px",
                  minHeight: "10px",
                }}
              >
                <div className="d-flex flex-column align-items-center justify-content-center h-75 text-center p-3">
                  <i className="bi bi-image fs-1 text-secondary"></i>
                  <div className="mt-2 fs-16 fw-bold">
                    <span className="text-primary">Click here</span>
                    <span className="fnt-color"> or drag n' drop</span>
                  </div>
                  <div className="mt-4 fs-14 opacity-75">JPG, JPEG or PNG</div>
                  <div className="fs-14 fw-bold opacity-75">Maximum 2 MB</div>
                </div>

                <input 
                  type="file" 
                  accept="image/png, image/jpeg, image/jpg" 
                  onChange={handleFileChange}
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ opacity: 0, cursor: "pointer" }}
                />
              </div>

              {selectedFile.length > 0 && (
                <div className="mt-2 text-success fs-12">
                  <i className="bi bi-check-circle me-1"></i>Image uploaded successfully</div>
              )}
            </div>
          </div>

          <div className="col-md-8">
            <div className="row">
              <div className="form-group col-md-6">
                <label className="form-label text-secondary">
                  Name English
                </label>
                <input
                  name="name_en"
                  type="text"
                  value={formData.name_en}
                  onChange={(e)=>setFormData({...formData,name_en:e.target.value})}
                  className="form-control form-control-lg textarea-hover-dark text-secondary"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="form-label text-secondary">Name Arabic</label>
                <input
                  name="name_ar"
                  type="text"
                  value={formData.name_ar}
                  onChange={(e)=>setFormData({...formData,name_ar:e.target.value})}
                  className="form-control form-control-lg textarea-hover-dark text-secondary"
                />
              </div>
            </div>

            <div className="form-group mt-3">
              <MultiSelectDropdown
                label="Product Tags"
                items={tags}
                selectedIds={tagIds}
                setSelectedIds={setTagIds}
                placeholder="Select Tags"
              />
            </div>
          </div>

          <div className="form-group mt-3">
            <label className="form-label text-secondary">Description</label>
            <MemoJoditEditor
              value={formData.description}
              config={editorConfig}
              onChange={(content) => {
                descriptionRef.current = content;
              }}
              onBlur={(newContent) => {
                setFormData(prev => ({
                  ...prev,
                  description: newContent
                }));
              }}
            />
          </div>

          <div className="row mt-3">
            <div className="form-group col-md-6">
              <label className="form-label text-secondary">
                Regular Price
              </label>
              <input
                name="regular_price"
                type="text"
                value={formData.regular_price}
                onChange={(e)=>setFormData({...formData,regular_price:e.target.value})}
                className="form-control form-control-lg textarea-hover-dark text-secondary"
              />
            </div>

            <div className="form-group col-md-6">
              <label className="form-label text-secondary">Sale Price</label>
              <input
                name="sale_price"
                type="text"
                value={formData.sale_price}
                onChange={(e)=>setFormData({...formData,sale_price:e.target.value})}
                className="form-control form-control-lg textarea-hover-dark text-secondary"
              />
            </div>
          </div>

          <div className="row mt-3">

            <div className="form-group col-md-6">
              <label className="form-label text-secondary">
                Tax Class
              </label>
              <select
                name="tax_class"
                className="form-select textarea-hover-dark text-secondary"
                value={formData.tax_class}
                onChange={(e)=>setFormData({...formData,tax_class:e.target.value})}
              >
                <option value="">Select Tax Class</option>
                <option value="Standard">Standard</option>
                <option value="Popular">Popular</option>
              </select>
            </div>

            <div className="form-group col-md-6">
              <label className="form-label text-secondary">
                Tax Status
              </label>
              <select
                name="tax_status"
                className="form-select textarea-hover-dark text-secondary"
                value={formData.tax_status}
                onChange={(e)=>setFormData({...formData,tax_status:e.target.value})}
              >
                <option value="">Select Tax Status</option>
                <option value="Taxable">Taxable</option>
                <option value="Shipping only">Shipping only</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
            
          <div className="row">
            {/* ===== Categories Dropdown ===== */}
            <div className="form-group col-md-6">
              <MultiSelectDropdown
                label="Product Categories"
                items={parentCategories}
                selectedIds={categoryIds}
                setSelectedIds={setCategoryIds}
                placeholder="Select Categories"
              />
            </div>

            {/* ===== Branches Dropdown ===== */}
            <div className="form-group col-md-6">
              <MultiSelectDropdown
                label="Product Branches"
                items={branches}
                selectedIds={branchIds}
                setSelectedIds={setBranchIds}
                placeholder="Select Branches"
              />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="form-group col-md-6">
            <MultiSelectDropdown
              label="Product Occasions"
              items={occasions}
              selectedIds={occasionIds}
              setSelectedIds={setOccasionIds}
              placeholder="Select Occasions"
            />
          </div>
          
          <div className="form-group mt-3 col-md-6">
            <label className="form-label text-secondary">Gender</label>
            <select 
              className="form-select text-secondary"
              value={formData.gender_id}
              onChange={(e) =>
                setFormData({ ...formData, gender_id: e.target.value })
              }
            >
              <option>Select Gender</option>
                {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
              {gender.name_en}</option>))}
            </select>
          </div>
        </div>

        <div className="form-buttons mt-5 d-flex justify-content-end gap-2">
        <button type="submit" className="org-btn rounded-3 border-0 py-2 fs-16 fw-bold w-25">Save</button>
      </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default AddProduct;
