"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import {getAllGenders} from "@/utils/apiRoutes";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import axios from "axios";

const AddProduct = () => {

  const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

  const [selectedFiles, setSelectedFiles] = useState([]);
  // const [categories , setCategories] = useState([]);
  const [genders , setGenders] = useState([]);
  const [branchIds, setBranchIds] = useState([]);
  const [isBranchesOpen, setIsBranchesOpen] = useState(false);

  const [isOccasionOpen, setIsOccasionOpen] = useState(false);
  const [occasionIds, setOccasionIds] = useState([]);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const {token} = useAxiosConfig();
  const [branches, setBranches] = useState([
  { id: 1, name: "Alkhaldiyah" },
  { id: 2, name: "Dammam Madinat" },
  { id: 3, name: "Laban" },
  { id: 4, name: "Mohammadyiah" },
  { id: 5, name: "Olaya" },
]);
  const [occasions, setOccasions] = useState([
  { id: 1, name: "Achievement" },
  { id: 2, name: "Birthday" },
  { id: 3, name: "Sports" },
  { id: 4, name: "Holiday" },
  { id: 5, name: "Congratulation" },
]);

  const [categories, setCategories] = useState([
  { id: 1, name: "Uncategorized" },
  { id: 2, name: "Add ons" },
  { id: 3, name: "Bonus" },
  { id: 4, name: "Cakes" },
  { id: 5, name: "Cookies Box" },
  { id: 6, name: "Custom Ice Cream" },
  { id: 7, name: "DIY" },
  { id: 8, name: "Ice Creams" },
  { id: 9, name: "Promotions" },
  { id: 10, name: "Special Day" },
]);

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

  useEffect(() => {
    if (!token) return;
    fetchAllGenders();
  }, [token]);

  const toggleBranch = (id) => {
    setBranchIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleAllBranches = () => {
    if (branchIds.length === branches.length) {
      setBranchIds([]);
    } else {
      setBranchIds(branches.map((b) => b.id));
    }
  };

  const selectedBranchNames = branches
  .filter(b => branchIds.includes(b.id))
  .map(b => b.name);

  const toggleOccasions = (id) => {
    setOccasionIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleAllOccasions = () => {
    if (occasionIds.length === occasions.length) {
      setOccasionIds([]);
    } else {
      setOccasionIds(occasions.map((b) => b.id));
    }
  };

  const selectedOccasionNames = occasions
  .filter(b => occasionIds.includes(b.id))
  .map(b => b.name);


    const toggleCategory = (id) => {
    setCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const toggleAllCategories = () => {
    if (categoryIds.length === categories.length) {
      setCategoryIds([]);
    } else {
      setCategoryIds(categories.map((b) => b.id));
    }
  };

  const selectedCategoryNames = categories
  .filter(b => categoryIds.includes(b.id))
  .map(b => b.name);



  return (
    <form className="" style={{ marginTop: "100px" }}>
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
                    {selectedCategoryNames.length ? selectedCategoryNames.map(n => (
                          <span key={n} className="px-2 py-1 border rounded small">{n}</span>
                        )): "Select Categories"}
                  </div>

                  <i className={`bi bi-chevron-${isCategoryOpen ? "up" : "down"}`} />
                </div>
                {isCategoryOpen && (
                  <div className="border bg-white p-2 position-absolute mt-1 rounded-3" style={{ width: 470 }}>
                    
                    <div className="form-check border-bottom pb-1">
                      <input type="checkbox" checked={categoryIds.length === categories.length}
                        onChange={toggleAllCategories}/>
                      <label className="ps-2 fs-14 fw-bold">Select All</label>
                    </div>

                    {categories.slice().map(b => (
                      <div key={b.id} className="form-check py-1">
                        <input type="checkbox" checked={categoryIds.includes(b.id)}
                          onChange={() => toggleCategory(b.id)}/>
                        <label className="ps-2 fs-14">{b.name}</label>
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
                  onClick={() => setIsBranchesOpen(!isBranchesOpen)}
                  style={{ cursor: "pointer" }}>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedBranchNames.length ? selectedBranchNames.map(n => (
                          <span key={n} className="px-2 py-1 border rounded small">{n}</span>
                        )): "Select Branches"}
                  </div>

                  <i className={`bi bi-chevron-${isBranchesOpen ? "up" : "down"}`} />
                </div>
                {isBranchesOpen && (
                  <div className="border bg-white p-2 position-absolute mt-1 rounded-3" style={{ width: 470 }}>
                    
                    <div className="form-check border-bottom pb-1">
                      <input type="checkbox" checked={branchIds.length === branches.length}
                        onChange={toggleAllBranches}/>
                      <label className="ps-2 fs-14 fw-bold">Select All</label>
                    </div>

                    {branches.slice().map(b => (
                      <div key={b.id} className="form-check py-1">
                        <input type="checkbox" checked={branchIds.includes(b.id)}
                          onChange={() => toggleBranch(b.id)}/>
                        <label className="ps-2 fs-14">{b.name}</label>
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
                    {selectedOccasionNames.length ? selectedOccasionNames.map(n => (
                          <span key={n} className="px-2 py-1 border rounded small">{n}</span>
                        )): "Select Occasions"}
                  </div>

                  <i className={`bi bi-chevron-${isOccasionOpen ? "up" : "down"}`} />
                </div>
                {isOccasionOpen && (
                  <div className="border bg-white p-2 position-absolute mt-1 rounded-3" style={{ width: 470 }}>
                    
                    <div className="form-check border-bottom pb-1 gap-2">
                      <input type="checkbox" checked={occasionIds.length === occasions.length}
                        onChange={toggleAllOccasions}/>
                      <label className="ps-2 fs-14 fw-bold">Select All</label>
                    </div>

                    {occasions.slice().map(b => (
                      <div key={b.id} className="form-check py-1">
                        <input type="checkbox" checked={occasionIds.includes(b.id)}
                          onChange={() => toggleOccasions(b.id)}/>
                        <label className="ps-2 fs-14">{b.name}</label>
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
