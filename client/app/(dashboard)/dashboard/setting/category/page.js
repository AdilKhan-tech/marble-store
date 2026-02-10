"use client";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddCategory from "@/components/dashboard/setting/AddCategory";
import { useEffect, useState } from "react";
import {getAllCategories,deleteCategoryById,} from "@/utils/apiRoutes";
import Offcanvas from "react-bootstrap/Offcanvas";
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";
import Common from "@/utils/Common"

export default function Category() {
  const { token } = useAxiosConfig();
  const [categories, setCategories] = useState([]);
  console.log("cccccccccc", categories)
  const [categoryData, setCategoryData] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchCategories = async () => {
    if (!token) return;
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      };
      const response = await axios.get(getAllCategories, { params });

      const tree = Common.buildCategoryTree(response.data.data);
      const flatList = Common.flattenCategories(tree);

      setCategories(flatList);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };
  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchCategories();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchCategories();
    }
  }, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

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

  const handleLimitChange = (newLimit) => {
    setPageLimit(newLimit);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleDelete = async (categoryid) => {
    try {
      const response = await axios.delete(
        deleteCategoryById(categoryid)
      );
      if (response.status === 200) {
        toast.success("Category deleted successfully", {
          autoClose: 1000,
        });
        setCategories((prev) =>
          prev.filter((item) => item.id !== categoryid)
        );
      }
    } catch (error) {
      console.error("Error deleting category", error);
    }
  };

  const showDeleteConfirmation = (categoryId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Category?"
    );
    if (confirmed) {
      handleDelete(categoryId);
    }
  };
  const addCategory = (newCategory) => {
    setCategories((prev) => [newCategory, ...prev]);
    setShowOffcanvas(false);
  };

  const updateCategory = (updatedCategory) => {
    setCategories((prev) =>
      prev.map((Category) =>
        Category.id === updatedCategory.id ? updatedCategory : Category
      )
    );
    setShowOffcanvas(false);
  };

  const handleSortChange = (field) =>
    Common.handleSortingChange(field, setSortField, setSortOrder);

  return (
    <>
      <section className="mt-3">
        <div className="">
        <div className="d-flex justify-content-between mb-3">
          <p className="pagetitle mb-0 fnt-color">Categories</p>
          <div>
            <div
              className="btn-orange text-center"
              onClick={showOffcanvasOnAddCategory}
              role="button"
            >
              <i className="bi bi-plus-circle ms-2"></i>
              <span className="ms-1">Create</span>
          </div>
        </div>
        </div>
            <div className="d-flex">
              <i className="bi bi-search fs-5 px-3 py-1 text-secondary position-absolute"></i>
              <input
                type="text"
                className="form-control px-5 text-dark-custom"
                style={{height:"44px", width:"300px"}}
                placeholder="Search here..."
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
          </div>
        <div className="px-0 pt-0 rounded-2 p-0 mt-3">
          <div className="">
            <div className="data-table">
              <table className="table datatable-wrapper">
                <thead className="">
                  <tr className="">
                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("id")}>
                      ID
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "id" &&
                        (sortOrder === "asc" ? "↑" : "↓")) ||
                        "↑↓"}
                    </span>
                    </th>
                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("image_url")}>
                      Image
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "image_url" &&
                        (sortOrder === "asc" ? "↑" : "↓")) ||
                        "↑↓"}
                    </span>
                    </th>
                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("name_en")}>
                      Name
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "name_en" &&
                        (sortOrder === "asc" ? "↑" : "↓")) ||
                        "↑↓"}
                    </span>
                    </th>
                    <th 
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("slug")}>
                      Slug
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "slug" &&
                        (sortOrder === "asc" ? "↑" : "↓")) ||
                        "↑↓"}
                    </span>
                    </th>
                    <th
                      className="fw-medium fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("parent_id")}>
                      Parent Category
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "parent_id" &&
                        (sortOrder === "asc" ? "↑" : "↓")) ||
                        "↑↓"}
                    </span>
                    </th>
                    <th className="fw-medium fs-14 fnt-color">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <tr key={category?.id}>
                      <td className="fw-normal fs-14 fnt-color">
                        {category?.id}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        <img
                          src={category.image_url}
                          className="table-img rounded-5"
                        />
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {category?.name_en}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {category?.slug}
                      </td>
                      <td>
                        {category?.parent ? category.parent.name_en : "-"}
                      </td>
                      <td className="d-flex gap-2">
                        <div
                          className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                          onClick={() =>showOffcanvasOnEditCategory(category)}>
                          <i className="bi bi-pencil-square text-primary"></i>
                        </div>
                        <div
                          className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                          onClick={() =>showDeleteConfirmation(category?.id) }>
                          <i className="bi bi-trash text-danger"></i>
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
                  {categoryData
                    ? "Update Category"
                    : "Add Category"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddCategory
                categoryData={categoryData}
                onAddCategory={addCategory}
                onUpdateCategory={updateCategory}
                closePopup={closePopup}
              />
            </Offcanvas.Body>
          </Offcanvas>
          <ToastContainer />
        </div>
      </section>
      <div className="d-flex align-items-center justify-content-between mt-0">
        <Pagination
          currentPage={currentPage}
          pageCount={pageCount}
          onPageChange={handlePageChange}
          pageLimit={pageLimit}
          totalEntries={totalEntries}
        />
        <EntriesPerPageSelector
          pageLimit={pageLimit}
          onPageLimitChange={handleLimitChange}
        />
      </div>
    </>
  );
}
