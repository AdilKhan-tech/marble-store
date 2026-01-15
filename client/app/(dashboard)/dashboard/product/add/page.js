"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {getAllGenders, getAllBranches, getAllCategories, getAllOcassions, createProductRoute} from "@/utils/apiRoutes";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddProduct = ({ productData, onAddProduct }) => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const {token} = useAxiosConfig();
  const [genders , setGenders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState([]);
  const router = useRouter();
  const [branchId, setBranchId] = useState([]);
  const [isBrancheOpen, setIsBrancheOpen] = useState(false);
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const [occasionId, setOccasionId] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryId, setCategoryId] = useState([]);
  
  const [formData, setFormData] = useState({
    name_en:"",
    name_ar:"",
    product_tag :"",
    description:"",
    occasion_ids: [], 
    gender_id:"",
    regular_price:"",
    sale_price:"",
    tax_status:"Taxable",
    tax_class:"Standard",
    branch_ids: [],
    category_ids: []
  })

  const safeCategories = Array.isArray(categories) ? categories : [];

  useEffect(() => {
    if (productData) {
      setFormData({
        name_en: productData.name_en || "",
        name_ar: productData.name_ar || "",
        description: productData.description || "",
        product_tag: productData.product_tag || "",
        occasion_ids:  productData.occasions?.map(o => o.id) || [],
        gender_id: productData.gender_id || "",
        regular_price: productData.regular_price || "",
        sale_price: productData.sale_price || "",
        tax_status: productData.tax_status || "",
        tax_class: productData.tax_class || "",
        branch_ids: productData.branches?.map(b => b.id) || [],
        category_ids: productData.categories?.map(c => c.id) || [],
      });
    }
  }, [productData]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
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
      const response = await axios.get(getAllBranches);
      setBranches(response?.data?.data);  
    } catch (error) {
      console.error("Error fetching Branches", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(getAllCategories);
      setCategories(response?.data?.data);      
    } catch (error) {
      console.error("Error fetching Categories", error);
    }
  };

  const fetchOccasions = async () => {
    try {
      const response = await axios.get(getAllOcassions);
      setOccasions(response?.data?.data);      
    } catch (error) {
      console.error("Error fetching Occasions", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchGenders();
    fetchBranches();
    fetchCategories();
    fetchOccasions();
  }, [token]);

  const toggleBranch = (id) => {
    setBranchId((prev) => {
      const updated = prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id];
  
      setFormData(prevForm => ({
        ...prevForm,
        branch_ids: updated
      }));
  
      return updated;
    });
  };
  
  const toggleAllBranches = () => {
    const updated =
      branchId.length === branches.length
        ? []
        : branches.map(b => b.id);
  
    setBranchId(updated);
    setFormData(prev => ({ ...prev, branch_ids: updated }));
  };

  const selectedBranchNames = branches
  .filter(b => branchId.includes(b.id))
  .map(b => b.name_en);

  const toggleOccasions = (id) => {
    setOccasionId((prev) => {
      const updated = prev.includes(id)
        ? prev.filter(o => o !== id)
        : [...prev, id];
  
      setFormData(prevForm => ({
        ...prevForm,
        occasion_ids: updated
      }));
  
      return updated;
    });
  };
  
  const toggleAllOccasions = () => {
    const updated =
      occasionId.length === occasions.length
        ? []
        : occasions.map(o => o.id);
  
    setOccasionId(updated);
    setFormData(prev => ({ ...prev, occasion_ids: updated }));
  };
  

  const selectedOccasionNames = occasions
  .filter(b => occasionId.includes(b.id))
  .map(b => b.name_en);


  const toggleCategory = (id) => {
    setCategoryId((prev) => {
      const updated = prev.includes(id)
        ? prev.filter(c => c !== id)
        : [...prev, id];
  
      setFormData(prevForm => ({
        ...prevForm,
        category_ids: updated
      }));
  
      return updated;
    });
  };
  
  const toggleAllCategories = () => {
    const updated =
      categoryId.length === safeCategories.length
        ? []
        : safeCategories.map(c => c.id);
  
    setCategoryId(updated);
    setFormData(prev => ({ ...prev, category_ids: updated }));
  };

  const selectedCategoryNames = safeCategories
  .filter(b => categoryId.includes(b.id))
  .map(b => b.name_en);

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
  
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);
    if (validationErrors.length > 0) return;

    try {
      const payload = new FormData();

      // normal fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "branch_ids" && key !== "category_ids" && key !== "occasion_ids") {
          payload.append(key, value);
        }
      });

      // image
      if (selectedFiles.length > 0) {
        payload.append("image_url", selectedFiles[0]);
      }

      // branches
      formData.branch_ids.forEach(id =>
        payload.append("branch_ids[]", id)
      );

      // occasions
      formData.occasion_ids.forEach(id =>
        payload.append("occasion_ids[]", id)
      );

      // categories
      formData.category_ids.forEach(id =>
        payload.append("category_ids[]", id)
      );

         const res = await axios.post(createProductRoute, payload);

        toast.success("Product added successfully!", {
          autoClose: 500,
          onClose: () => {
          setTimeout(() => router.push("/dashboard/product"), 500);
          },
        });


        if (onAddProduct) onAddProduct(res.data);
    } catch (error) {
      setErrors([
        error?.response?.data?.message || "Something went wrong",
      ]);
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
          <div className="col-md-5">
            <div className="fs-14 w-100">
              <div
                className="position-relative w-100 bg-white d-flex justify-content-center"
                style={{
                  border: "2px dashed #e6e6e6",
                  borderRadius: "20px",
                  minHeight: "270px",
                }}
              >
                <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
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

              {selectedFiles.length > 0 && (
                <div className="mt-2 text-success fs-12">
                  <i className="bi bi-check-circle me-1"></i>Image uploaded successfully</div>
              )}
            </div>
          </div>

          <div className="col-md-7">
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

            <div className="form-group col-md-12 mt-3">
              <label className="form-label text-secondary">Product Tags</label>
              <input
                name="product_tag"
                type="text"
                value={formData.product_tag}
                onChange={(e)=>setFormData({...formData,product_tag:e.target.value})}
                className="form-control form-control-lg textarea-hover-dark text-secondary"
              />
            </div>
          </div>

          <div className="form-group mt-3">
            <label className="form-label text-secondary">Description</label>
            <JoditEditor
              value={formData.description}
              config={{ height: 300, readonly: false }}
              onChange={(content) =>
                setFormData({ ...formData, description: content })
              }
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
            <div className="form-group mt-3 col-md-6">
              <label className="form-label text-secondary">
                Product Categories 
              </label>
              <div
                className="form-control d-flex justify-content-between align-items-center"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex flex-wrap gap-1">
                  {selectedCategoryNames.length ? selectedCategoryNames.map((name, index) => (
                    <span key={`${name}-${index}`} className="px-2 py-1 border rounded small">{name}</span>
                  )): "Select Categories"}
                </div>

                <i className={`bi bi-chevron-${isCategoryOpen ? "up" : "down"}`} />
              </div>
              {isCategoryOpen && (
                <div className="border bg-white p-2 position-absolute mt-1 rounded-3" style={{ width: 470 }}>
                  
                  <div className="form-check border-bottom pb-1">
                    <input 
                      type="checkbox" 
                      checked={categoryId.length === safeCategories.length}
                      onChange={toggleAllCategories}
                    />
                    <label className="ps-2 fs-14 fw-bold">Select All</label>
                  </div>

                    {safeCategories.map((b) => (
                    <div key={b.id} className="form-check py-1">
                      <input
                        type="checkbox"
                        checked={categoryId.includes(b.id)}
                        onChange={() => toggleCategory(b.id)}
                      />
                      <label className="ps-2 fs-14">{b.name_en || b.name}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ===== Branches Dropdown ===== */}
            <div className="form-group mt-3 col-md-6">
              <label className="form-label text-secondary">Product Branches</label>
              <div
                className="form-control d-flex justify-content-between align-items-center"
                onClick={() => setIsBrancheOpen(!isBrancheOpen)}
                style={{ cursor: "pointer" }}>
                <div className="d-flex flex-wrap gap-1">
                  {selectedBranchNames.length ? selectedBranchNames.map((name, index) => (
                        <span key={`${name}-${index}`} className="px-2 py-1 border rounded small">{name}</span>
                      )): "Select Branches"}
                </div>

                <i className={`bi bi-chevron-${isBrancheOpen ? "up" : "down"}`} />
              </div>
              {isBrancheOpen && (
                <div className="border bg-white p-2 position-absolute mt-1 rounded-3" style={{ width: 470 }}>
                  
                  <div className="form-check border-bottom pb-1">
                    <input 
                      type="checkbox" 
                      checked={branchId.length === branches.length}
                      onChange={toggleAllBranches}
                    />
                    <label className="ps-2 fs-14 fw-bold">Select All</label>
                  </div>

                  {branches.map((b) => (
                    <div key={b.id} className="form-check py-1">
                      <input
                        type="checkbox"
                        checked={branchId.includes(b.id)}
                        onChange={() => toggleBranch(b.id)}
                      />
                      <label className="ps-2 fs-14">{b.name_en || b.name}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="form-group mt-3 col-md-6">
            <label className="form-label text-secondary">Product Occasions</label>
            <div
                  className="form-control d-flex justify-content-between align-items-center"
                  onClick={() => setIsOccasionOpen(!isOccasionOpen)}
                  style={{ cursor: "pointer" }}>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedOccasionNames.length ? selectedOccasionNames.map((name, index) => (
                          <span key={`${name}-${index}`} className="px-2 py-1 border rounded small">{name}</span>
                        )): "Select Occasions"}
                  </div>

                  <i className={`bi bi-chevron-${isOccasionOpen ? "up" : "down"}`} />
                </div>
                {isOccasionOpen && (
                  <div className="border bg-white p-2 position-absolute mt-1 rounded-3" style={{ width: 470 }}>
                    
                    <div className="form-check border-bottom pb-1 gap-2">
                      <input 
                        type="checkbox" 
                        checked={occasionId.length === occasions.length}
                        onChange={toggleOccasions}
                      />
                      <label className="ps-2 fs-14 fw-bold">Select All</label>
                    </div>

                     {occasions.map((b) => (
                      <div key={b.id} className="form-check py-1">
                        <input
                          type="checkbox"
                          checked={occasionId.includes(b.id)}
                          onChange={() => toggleAllOccasions()}
                        />
                        <label className="ps-2 fs-14">{b.name_en || b.name}</label>
                      </div>
                    ))}
                  </div>
                )}
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
