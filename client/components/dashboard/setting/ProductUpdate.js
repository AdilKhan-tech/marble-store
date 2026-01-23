"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  getAllGenders,
  getAllBranches,
  getAllCategories,
  getAllTags,
  getAllOcassions,
  updateProductByIdRoute,
} from "@/utils/apiRoutes";
import MultiSelectDropdown from "@/components/dashboard/MultiSelectDropdown";
import { toast, ToastContainer } from "react-toastify";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const MemoJoditEditor = React.memo(JoditEditor);

export default function EditProduct({ productData, closePopup }) {
  const router = useRouter();
  const descriptionRef = useRef("");

  const [genders, setGenders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [tags, setTags] = useState([]);

  const [branchIds, setBranchIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [occasionIds, setOccasionIds] = useState([]);
  const [tagIds, setTagIds] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description: "",
    gender_id: "",
    regular_price: "",
    sale_price: "",
    tax_status: "Taxable",
    tax_class: "Standard",
  });

  /* ===== PREFILL (IMPORTANT PART) ===== */
  useEffect(() => {
    if (!productData) return;

    setFormData({
      name_en: productData.name_en || "",
      name_ar: productData.name_ar || "",
      description: productData.description || "",
      gender_id: productData.gender_id || "",
      regular_price: productData.regular_price || "",
      sale_price: productData.sale_price || "",
      tax_status: productData.tax_status || "",
      tax_class: productData.tax_class || "",
    });

    setBranchIds(productData.branches?.map((b) => b.id) || []);
    setCategoryIds(productData.categories?.map((c) => c.id) || []);
    setOccasionIds(productData.occasions?.map((o) => o.id) || []);
    setTagIds(productData.tags?.map((t) => t.id) || []);
  }, [productData]);

  /* ===== FETCH ALL ===== */
  const fetchGenders = async () => {
    try {
      const res = await axios.get(getAllGenders);
      setGenders(res?.data?.data || []);
    } catch (err) {
      console.error("Gender fetch error", err);
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

  const fetchCategories = async () => {
    try {
      const res = await axios.get(getAllCategories);
      setCategories(res?.data?.data || []);
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

  const fetchTags = async () => {
    try {
      const res = await axios.get(getAllTags);
      setTags(res?.data?.data || []);
    } catch (err) {
      console.error("Tag fetch error", err);
    }
  };

  useEffect(() => {
    fetchGenders();
    fetchBranches();
    fetchCategories();
    fetchOccasions();
    fetchTags();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(Array.from(e.target.files));
  };

  const editorConfig = useMemo(() => ({ height: 300 }), []);

  /* ===== SUBMIT ===== */
  /* ===== SUBMIT (FIXED) ===== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      // normal fields
      Object.entries(formData).forEach(([k, v]) => {
        payload.append(k, v);
      });

      // multiselect ids
      branchIds.forEach((id) => payload.append("branch_ids[]", id));
      categoryIds.forEach((id) => payload.append("category_ids[]", id));
      occasionIds.forEach((id) => payload.append("occasion_ids[]", id));
      tagIds.forEach((id) => payload.append("tag_ids[]", id));

      // ✅ FILES (missing part)
      selectedFile.forEach((file) => {
        payload.append("images[]", file);
      });

      // ✅ ID + PUT/PATCH
      await axios.put(
        updateProductByIdRoute(productData.id),payload,);


      toast.success("Branch Updated successfully!", {
        autoClose: 1000,
        onClose: closePopup,
      });
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mt-3">
        <label className="form-label text-secondary">Name English</label>
        <input
          value={formData.name_en}
          onChange={(e) =>
            setFormData({ ...formData, name_en: e.target.value })
          }
          className="form-control mb-2"
          placeholder="Name English"
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Name Arabic</label>
        <input
          value={formData.name_ar}
          onChange={(e) =>
            setFormData({ ...formData, name_ar: e.target.value })
          }
          className="form-control mb-2"
          placeholder="Name Arabic"
        />
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Description</label>
        <MemoJoditEditor
          value={formData.description}
          config={editorConfig}
          onBlur={(c) => setFormData((p) => ({ ...p, description: c }))}
        />
      </div>

      <div className="form-group mt-3">
        <MultiSelectDropdown
          label="Product Categories"
          items={categories}
          selectedIds={categoryIds}
          setSelectedIds={setCategoryIds}
          placeholder="Select Categories"
        />
      </div>

      <div className="form-group mt-3">
        <MultiSelectDropdown
          label="Product Branches"
          items={branches}
          selectedIds={branchIds}
          setSelectedIds={setBranchIds}
          placeholder="Select Branches"
        />
      </div>

      <div className="form-group mt-3">
        <MultiSelectDropdown
          label="Product Occasions"
          items={occasions}
          selectedIds={occasionIds}
          setSelectedIds={setOccasionIds}
          placeholder="Select Occasions"
        />
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

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Genders</label>
        <select
          className="form-select mt-2"
          value={formData.gender_id}
          onChange={(e) =>
            setFormData({ ...formData, gender_id: e.target.value })
          }
        >
          <option>Select Gender</option>
          {genders.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name_en}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">File Attachment</label>
        <div className="col-md-12">
          <div
            className="upload-container text-center flex-column"
            style={{ width: 490 }}
          >
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="d-none"
            />
            <label role="button" className="d-block cursor-pointer">
              <div className="mb-1">
                <span className="fs-16 fw-medium">Upload File</span>
              </div>
              <div className="upload-text fs-16 fw-normal">
                <img src="/assets/images/Group.png" className="me-1" />
                Drag & drop or
                <span className="text-decoration-underline">browse files</span>
              </div>
            </label>
            <ul className="mt-2">
              {selectedFile.map((file, index) => (
                <li
                  className="list-unstyled text-muted fnt-color opacity-50 fs-14 fw-normal"
                  key={index}
                >
                  File Size: {file.size} KB
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <button className="org-btn mt-4 w-100">Update</button>
      <ToastContainer />
    </form>
  );
}
