"use client";
import useAxiosConfig from "@/hooks/useAxiosConfig";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import AddProductTag from "@/components/dashboard/setting/AddProductTag";
import { useEffect, useState } from "react";
import { getAllProductTags, deleteProductTagById } from "@/utils/apiRoutes";
import Offcanvas from "react-bootstrap/Offcanvas";
import Pagination from "@/components/dashboard/Pagination";
import EntriesPerPageSelector from "@/components/dashboard/EntriesPerPageSelector";
import Common from "@/utils/Common";

export default function productTags() {
  const { token } = useAxiosConfig();
  const [productTags, setProductTags] = useState([]);
  const [productTagData, setProductTagData] = useState(null);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("DESC");
  const [pageLimit, setPageLimit] = useState(25);
  const [keywords, setKeywords] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalEntries, setTotalEntries] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const fetchProductTags = async () => {
    if (!token) return;
    try {
      const params = {
        page: currentPage,
        limit: pageLimit,
        keywords: keywords,
        sortOrder,
        sortField,
      };
      const response = await axios.get(getAllProductTags, { params });
      setProductTags(response.data.data);
      setTotalEntries(response.data.pagination.total);
      setPageCount(response.data.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching product tags", error);
    }
  };
  useEffect(() => {
    if (keywords != "") {
      if (keywords.trim() == "") return;
      const delay = setTimeout(() => {
        fetchProductTags();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchProductTags();
    }
  }, [currentPage, pageLimit, keywords, sortOrder, sortField, token]);

  const showOffcanvasOnAddProductTags = () => {
    setProductTagData(null);
    setShowOffcanvas(true);
  };

  const showOffcanvasOnEditProductTags = (productTag) => {
    setProductTagData(productTag);
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
  const handleDelete = async (productTagid) => {
    try {
      const response = await axios.delete(deleteProductTagById(productTagid));
      if (response.status === 200) {
        toast.success("Product Tag deleted successfully", {
          autoClose: 1000,
        });
        setProductTags((prev) =>
          prev.filter((item) => item.id !== productTagid)
        );
      }
    } catch (error) {
      console.error("Error deleting product tag", error);
    }
  };

  const showDeleteConfirmation = (productTagId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Product Tag?"
    );
    if (confirmed) {
      handleDelete(productTagId);
    }
  };
  const addProductTag = (newProductTag) => {
    setProductTags((prev) => [newProductTag, ...prev]);
    setShowOffcanvas(false);
  };

  const updateProductTag = (updatedProductTag) => {
    setProductTags((prev) =>
      prev.map((productTag) =>
        productTag.id === updatedProductTag.id
          ? { ...productTag, ...updatedProductTag }
          : productTag
      )
    );
    setShowOffcanvas(false);
  };
  const handleSortChange = (field) =>
    Common.handleSortingChange(field, setSortField, setSortOrder);

  return (
    <>
      <section className="mt-5">
        <div className="">
          <div className="d-flex justify-content-between mb-3">
            <p className="pagetitle mb-0 fnt-color">Product Tags</p>
            <div>
              <div
                className="btn-orange text-center"
                role="button"
                onClick={showOffcanvasOnAddProductTags}
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
              style={{ height: "44px", width: "300px" }}
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
                      className="fw-bold fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("id")}
                    >
                      ID
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "id" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>
                    <th
                      className="fw-bold fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("name_en")}
                    >
                      Name
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "name_en" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>
                    <th
                      className="fw-bold fs-14 fnt-color nowrap"
                      onClick={() => handleSortChange("slug")}
                    >
                      Slug
                      <span className="fs-10 text-secondary ms-1">
                        {(sortField === "slug" &&
                          (sortOrder === "asc" ? "↑" : "↓")) ||
                          "↑↓"}
                      </span>
                    </th>
                    <th className="fw-bold fs-14 fnt-color">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productTags.map((productTag, index) => (
                    <tr key={productTag?.id}>
                      <td className="fw-normal fs-14 fnt-color">
                        {productTag?.id}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {productTag?.name_en}
                      </td>
                      <td className="fw-normal fs-14 fnt-color">
                        {productTag?.slug}
                      </td>
                      <td className="d-flex gap-2">
                        <div
                          className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                          onClick={() =>
                            showOffcanvasOnEditProductTags(productTag)
                          }
                        >
                          <i className="bi bi-pencil-square text-primary"></i>
                        </div>
                        <div
                          className="action-btn d-flex justify-content-center align-items-center bg-transparent rounded-2"
                          onClick={() => showDeleteConfirmation(productTag?.id)}
                        >
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
                  {productTagData ? "Update Product Tag" : "Add Product Tag"}
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <hr className="mt-0" />
            <Offcanvas.Body>
              <AddProductTag
                productTagData={productTagData}
                onAddProductTag={addProductTag}
                onUpdateProductTag={updateProductTag}
                closePopup={closePopup}
              />
            </Offcanvas.Body>
          </Offcanvas>
          <ToastContainer />
        </div>
      </section>
      <div className="datatable-bottom">
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
