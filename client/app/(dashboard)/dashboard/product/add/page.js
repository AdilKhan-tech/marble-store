"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import {getAllGenders, getAllBranches, getCategory, getAllOcassions} from "@/utils/apiRoutes";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import axios from "axios";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const AddProduct = () => {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [genders , setGenders] = useState([]);
  const [branchId, setBranchId] = useState([]);
  const [isBrancheOpen, setIsBrancheOpen] = useState(false);
  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const [occasionId, setOccasionId] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryId, setCategoryId] = useState([]);
  const {token} = useAxiosConfig();
  const [branches, setBranches] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name_en:"",
    name_ar:"",
    product_tag :"",
    description:"",
    product_category_id:"",
    product_branch_id:"",
    occasions_id:"",
    genders_id:"",
    regular_price:"",
    sale_price:"",
    tax_status:"Active for Both",
    tax_class:"Taxable",
    image_url:"",
  })

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const fetchAllGenders = async () => {
    try {
      const response = await axios.get(getAllGenders);
      setGenders(response?.data);  
    } catch (error) {
      console.error("Error fetching Genders", error);
    }
  };
  const fetchAllBranchesRoute = async () => {
    try {
      const response = await axios.get(getAllBranches);
      setBranches(response?.data);  
    } catch (error) {
      console.error("Error fetching Branches", error);
    }
  };

  const fetchAllCategoriesRoute = async () => {
    try {
      const response = await axios.get(getCategory);
      setCategories(response?.data?.categories);
    } catch (error) {
      console.error("Error fetching Categories", error);
    }
  };

  const fetchAllOccasionsRoute = async () => {
    try {
      const response = await axios.get(getAllOcassions);
      setOccasions(response?.data?.occasions);      
    } catch (error) {
      console.error("Error fetching Occasions", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAllGenders();
    fetchAllBranchesRoute();
    fetchAllCategoriesRoute();
    fetchAllOccasionsRoute();
  }, [token]);

  const toggleBranch = (id) => {
    setBranchId((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleAllBranches = () => {
    if (branchId.length === branches.length) {
      setBranchId([]);
    } else {
      setBranchId(branches.map((b) => b.id));
    }
  };

  const selectedBranchNames = branches
  .filter(b => branchId.includes(b.id))
  .map(b => b.name_en);

  const toggleOccasions = (id) => {
    setOccasionId((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleAllOccasions = () => {
    if (occasionId.length === occasions.length) {
      setOccasionId([]);
    } else {
      setOccasionId(occasions.map((b) => b.id));
    }
  };

  const selectedOccasionNames = occasions
  .filter(b => occasionId.includes(b.id))
  .map(b => b.name_en);


    const toggleCategory = (id) => {
    setCategoryId((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleAllCategories = () => {
    if (categoryId.length === categories.length) {
      setCategoryId([]);
    } else {
      setCategoryId(categories.map((b) => b.id));
    }
  };

  const selectedCategoryNames = categories
  .filter(b => categoryId.includes(b.id))
  .map(b => b.name_en);



  return (
    <form className="content-contianer">
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
                }}>
                  <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center p-4">
                    <i className="bi bi-image fs-1 text-secondary"></i>
                    <div className="mt-2 fs-16 fw-bold">
                      <span className="text-primary">Click here</span>
                      <span className="fnt-color"> or drag n' drop</span>
                    </div>
                    <div className="mt-4 fs-14 opacity-75">JPG, JPEG or PNG</div>
                    <div className="fs-14 fw-bold opacity-75">Maximum 2 MB</div>
                  </div>

                <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleFileChange}
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{ opacity: 0, cursor: "pointer" }}/>
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
                  className="form-control form-control-lg textarea-hover-dark text-secondary"/>
              </div>

              <div className="form-group col-md-6">
                <label className="form-label text-secondary">Name Arabic</label>
                <input
                  name="name_ar"
                  type="text"
                  className="form-control form-control-lg textarea-hover-dark text-secondary"/>
              </div>
            </div>

            <div className="form-group col-md-12 mt-3">
              <label className="form-label text-secondary">Product Tag</label>
              <input
                name="product_tag"
                type="text"
                className="form-control form-control-lg textarea-hover-dark text-secondary"/>
            </div>

          </div>
          <div className="form-group mt-3">
              <label className="form-label text-secondary">Description</label>
              <JoditEditor 
                config={{height: 300, readonly: false}}/>
            </div>
            
            <div className="row">
              <div className="form-group mt-3 col-md-6">
                <label className="form-label text-secondary">
                  Product Category
                </label>
                <div
                  className="form-control d-flex justify-content-between align-items-center"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  style={{ cursor: "pointer" }}>
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
                      <input type="checkbox" checked={categoryId.length === categories.length}
                        onChange={toggleAllCategories}/>
                      <label className="ps-2 fs-14 fw-bold">Select All</label>
                    </div>

                     {categories.map((b) => (
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
                      <input type="checkbox" checked={branchId.length === branches.length}
                        onChange={toggleAllBranches}/>
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
                      <input type="checkbox" checked={occasionId.length === occasions.length}
                        onChange={toggleOccasions}/>
                      <label className="ps-2 fs-14 fw-bold">Select All</label>
                    </div>

                     {occasions.map((b) => (
                      <div key={b.id} className="form-check py-1">
                        <input
                          type="checkbox"
                          checked={occasionId.includes(b.id)}
                          onChange={() => toggleAllOccasions(b.id)}
                        />
                        <label className="ps-2 fs-14">{b.name_en || b.name}</label>
                      </div>
                    ))}
                  </div>
                )}
          </div>
          <div className="form-group mt-3 col-md-6">
            <label className="form-label text-secondary">Genders</label>
            <select className="form-select text-secondary">
              <option>Select Product Category</option>
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
    </form>
  );
};

export default AddProduct;
