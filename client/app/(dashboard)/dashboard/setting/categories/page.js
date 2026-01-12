"use client";
import React from "react";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddCategory from "@/components/dashboard/setting/AddCategory";
import { useEffect, useState } from "react";
import { getAllCategories, deleteCategoryById } from "@/utils/apiRoutes";
import Offcanvas from "react-bootstrap/Offcanvas";

export default function CategoryPage() {

  const { token } = useAxiosConfig();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [categoryData, setCategoryData] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(getAllCategories);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchAllCategories();
  }, [token]);

  const showOffcanvasOnAddCategory = () => {
    setCategoryData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditCategory = (category) => {
    setCategoryData(category);
    setShowOffcanvas(true);
  };

  const closePopup = () => {
    setShowOffcanvas(false);
  };

  const handleDelete = async (categoryId) => {
    try {
      const response = await axios.delete(deleteCategoryById(categoryId));
      if (response.status === 200) {
        toast.success("Categories deleted successfully!", { autoClose: 1000 });
        setCategories((prev) =>
          prev.filter((Categories) => Categories.id !== categoryId)
        );
      }
    } catch (error) {
      toast.error("Failed to delete Categories.");
    }
  };

  const showDeleteConfirmation = (categoryId) => {
    if (confirm("Are you sure you want to delete this Categories?")) {
      handleDelete(categoryId);
    }
  };

  const addCategory = (newCategory) => {
    setCategories((prev) => [newCategory, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCategory = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((item) =>
        item.id === updatedCategory.id ? updatedCategory : item
      )
    );
    setShowOffcanvas(false);
  };

  return (
    <>
      <section className="mt-10">
        <div className="">
          <p className="pagetitle mb-0 fnt-color">Categories</p>
          <div className="d-flex justify-content-between mt-4">
            <div className="d-flex">
              <i className="bi bi-search fs-5 px-3 py-2 text-secondary position-absolute"></i>
              <input
                type="text"
                className="form-control px-5 text-dark-custom"
                placeholder="Search here..."
              />
            </div>
            <div>
              <div
                className="btn-orange"
                role="button"
                onClick={showOffcanvasOnAddCategory}
              >
                <i className="bi bi-plus-circle ms-2"></i>
                <span className="ms-1">Create</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-0 pt-0 rounded-2 p-0 mt-3">
          <div className="datatable-wrapper">
            <div className="data-table p-2 rounded-4">
              <table className="table datatable datatable-table">
                <thead className="">
                  <tr className="">
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Slug</th>
                    <th>Count</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={`${category.id}-${index}`}>
                      <td>{category.id}</td>
                      <td>{category.name_en}</td>
                      <td>{category.description || "N/A"}</td>
                      <td>{category.slug}</td>
                      <td>{category.count || "N/A"}</td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() =>
                              showOffcanvasOnEditCategory(category)
                            }
                          >
                            <i className="bi bi-pencil-square text-primary"></i>
                          </button>
                          <button
                            className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                            onClick={() => showDeleteConfirmation(category.id)}
                          >
                            <i className="bi bi-trash text-danger"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Offcanvas
            show={showOffcanvas}
            onHide={() => setShowOffcanvas(false)}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <div className="fs-24 fnt-color">
                  {categoryData ? "Update Category" : "Add Category"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddCategory
                onAddCategory={addCategory}
                onUpdateCategory={updateCategory}
                closePopup={closePopup}
                categoryData={categoryData}
              >
              </AddCategory>
            </Offcanvas.Body>
          </Offcanvas>
          <ToastContainer />
        </div>
      </section>
    </>
  );
}
