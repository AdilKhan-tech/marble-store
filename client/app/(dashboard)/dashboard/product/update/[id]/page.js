"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import { useRouter } from "next/navigation";
import useAxiosConfig from "@/hooks/useAxiosConfig"
import {
  getAllGenders,
  getAllBranches,
  getAllCategories,
  getAllTags,
  getAllOcassions,
  updateProductByIdRoute,
  getProductByIdRoute
} from "@/utils/apiRoutes";
import MultiSelectDropdown from "@/components/dashboard/MultiSelectDropdown";
import { toast, ToastContainer } from "react-toastify";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const MemoJoditEditor = React.memo(JoditEditor);

export default function EditProduct() {
  const { token } = useAxiosConfig()
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const router = useRouter();
  const descriptionRef = useRef("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [genders, setGenders] = useState([]);
  const [branches, setBranches] = useState([]);
  const [categories, setCategories] = useState([]);
  const [occasions, setOccasions] = useState([]);
  const [tags, setTags] = useState([]);

  const [branchIds, setBranchIds] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [occasionIds, setOccasionIds] = useState([]);
  const [tagIds, setTagIds] = useState([]);
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

  // fetchProduct
  useEffect(() => {
    if (!token || !id) return;

    const fetchProduct = async () => {
      try {
        const res = await axios.get(getProductByIdRoute(id));
        setProductData(res.data);
      } catch (error) {
        console.error("Product fetch failed", error);
      }
    };

    fetchProduct();
  }, [token, id]);

  /* ===== FETCH ALL ===== */
  const fetchGenders = async () => {
    try {
      const res = await axios.get(getAllGenders);
      setGenders(res?.data?.data);
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
    if (!token) return;
    fetchGenders();
    fetchBranches();
    fetchCategories();
    fetchOccasions();
    fetchTags();
  }, [token]);


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
        payload.append("image_url", file); // ✅ FIX
      });

      // ✅ ID + PUT/PATCH
      await axios.put(
        updateProductByIdRoute(productData.id), payload,);
      toast.success("Product added successfully!", {
        autoClose: 500,
        onClose: () => {
        setTimeout(() => router.push("/dashboard/product"), 500);
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(Array.from(e.target.files));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="card p-4 rounded-4">
        <div className="row mt-3">
          <div className="col-md-4 mt-3">
            <div className="">
              <div
                className="position-relative w-100 bg-white d-flex justify-content-center"
                style={{
                  border: "2px dashed #e6e6e6",
                  borderRadius: "20px",
                  minHeight: "10px",
                }}
              >
                <div className="d-flex flex-column align-items-center justify-content-center h-75 text-center p-2">
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
                  onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
                  className="form-control form-control-lg textarea-hover-dark text-secondary"
                />
              </div>

              <div className="form-group col-md-6">
                <label className="form-label text-secondary">Name Arabic</label>
                <input
                  name="name_ar"
                  type="text"
                  value={formData.name_ar}
                  onChange={(e) => setFormData({ ...formData, name_ar: e.target.value })}
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
        </div>

        <div className="form-group mt-3">
          <label className="form-label text-secondary">Description</label>
          <MemoJoditEditor
            value={formData.description}
            config={editorConfig}
            onBlur={(c) => setFormData((p) => ({ ...p, description: c }))}
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
              onChange={(e) => setFormData({ ...formData, regular_price: e.target.value })}
              className="form-control form-control-lg textarea-hover-dark text-secondary"
            />
          </div>

          <div className="form-group col-md-6">
            <label className="form-label text-secondary">Sale Price</label>
            <input
              name="sale_price"
              type="text"
              value={formData.sale_price}
              onChange={(e) => setFormData({ ...formData, sale_price: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, tax_class: e.target.value })}
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
              onChange={(e) => setFormData({ ...formData, tax_status: e.target.value })}
            >
              <option value="">Select Tax Status</option>
              <option value="Taxable">Taxable</option>
              <option value="Shipping only">Shipping only</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        <div className="row mt-3">
          <div className="form-group col-md-6">
            <MultiSelectDropdown
              label="Product Categories"
              items={categories}
              selectedIds={categoryIds}
              setSelectedIds={setCategoryIds}
              placeholder="Select Categories"
            />
          </div>

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

        <div className="row mt-3">
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
            <label className="form-label text-secondary">Genders</label>
            <select
              className="form-select"
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
        </div>

        <div className="form-buttons mt-5 d-flex justify-content-end gap-2">
        <button type="submit" className="org-btn rounded-3 border-0 py-2 fs-16 fw-bold w-25">Save</button>
      </div>
        <ToastContainer />
      </div>
    </form>
  );
}
