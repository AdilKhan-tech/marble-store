"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useState } from "react";

const AddProduct = () => {
  const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

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

              {selectedFiles && (
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

            <div className="row">
              <div className="form-group mt-3 col-md-6">
                <label className="form-label text-secondary">
                  Product Category
                </label>
                <select className="form-select text-secondary">
                  <option>Select Product Category</option>
                  <option>Uncategorized</option>
                  <option>Add ons</option>
                  <option>Bonus</option>
                  <option>Cakes</option>
                  <option>Cookies Box</option>
                  <option>Custom Ice Cream</option>
                  <option>DIY</option>
                  <option>Ice Creams</option>
                  <option>Promotions</option>
                  <option>Special Day</option>
                </select>
              </div>
              <div className="form-group mt-3 col-md-6">
                <label className="form-label text-secondary">Branches</label>
                <select className="form-select text-secondary">
                  <option>Select Product Branches</option>
                  <option>Alkhaldiyah</option>
                  <option>Dammam Madinat</option>
                  <option>Laban</option>
                  <option>Mohammadyiah</option>
                  <option>Olaya</option>
                  <option>Other</option>
                  <option>Qurtoba</option>
                  <option>Rabwah</option>
                  <option>Sahafa</option>
                  <option>Sheikh Jaber</option>
                  <option>Sultana</option>
                  <option>Suwaidi</option>
                  <option>Takhassusi</option>
                </select>
              </div>
            </div>

          </div>
          <div className="form-group mt-3">
              <label className="form-label text-secondary">Description</label>
              <JoditEditor />
            </div>
        </div>

        <div className="row">
          <div className="form-group mt-5 col-md-4">
            <label className="form-label text-secondary">
              Custom Cake Type
            </label>
            <select
              name="custom_cake_type"
              type="select"
              className="form-select text-secondary">
              <option>Select Custom Cake Type</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>

          <div className="form-group col-md-4 mt-5">
            <label className="form-label text-secondary">Cookie Box Type</label>
            <select
              name="cookie_box_type"
              type="select"
              className="form-select text-secondary">
              <option>Select Cookie Box Type</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>

          <div className="form-group mt-5 col-md-4">
            <label className="form-label text-secondary">Cookie Box Size</label>
            <select
              name="cookie_box_size"
              type="select"
              className="form-select text-secondary"
            >
              <option>Select Cookie Box Size</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">
              Ice Cream Bucket
            </label>
            <select
              name="icecream_bucket"
              type="select"
              className="form-select text-secondary">
              <option>Select Ice Cream Bucket</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>

          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">
              Ice Cream Addons
            </label>
            <select
              name="icecream_addons"
              type="select"
              className="form-select text-secondary">
              <option>Select Ice Cream Addons</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>

          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">
              Cake Portion Sizes
            </label>
            <select className="form-select text-secondary">
              <option>Select Cake Portion Sizes</option>
              <option>Achievement</option>
              <option>Birthdays</option>
              <option>Congratulation</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">Occasions</label>
            <select className="form-select text-secondary">
              <option>Select Product Occasions</option>
              <option>Achievement</option>
              <option>Birthdays</option>
              <option>Congratulation</option>
              <option>Get well Soon</option>
              <option>Graduation</option>
              <option>Holidays</option>
              <option>New born</option>
              <option>Sports</option>
              <option>Weddings</option>
            </select>
          </div>
          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">Genders</label>
            <select className="form-select text-secondary">
              <option>Select Product Genders</option>
              <option>Boy</option>
              <option>Girl</option>
            </select>
          </div>

          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">Cookies</label>
            <select
              name="cookies"
              type="select"
              className="form-select text-secondary">
              <option>Select Cookies</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
        </div>

        <div className="row mt-4">
          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">Cake Size</label>
            <select
              name="cake_size"
              type="select"
              className="form-select text-secondary">
              <option>Select Cake Size</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>

          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">Cake Flavor</label>
            <select
              name="cake_flavor"
              type="select"
              className="form-select text-secondary">
              <option>Select Cake Flavor</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>

          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">
              Custom Cake Size
            </label>
            <select
              name="custom_cake_size"
              type="select"
              className="form-select text-secondary">
              <option>Select Custom Cake Size</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>
        </div>
        <div className="row mt-4">
            <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">
              Custom Cake Flavor
            </label>
            <select
              name="custom_cake_flavor"
              type="select"
              className="form-select text-secondary">
              <option>Select Custom Cake Flavor</option>
              <option>1</option>
              <option>1</option>
              <option>1</option>
            </select>
          </div>

          <div className="form-group mt-3 col-md-4">
            <label className="form-label text-secondary">
              Ice Cream Portion Sizes
            </label>
            <select className="form-select text-secondary">
              <option>Select Ice Cream Portion Sizes</option>
              <option>Big dipper</option>
              <option>Pint</option>
              <option>Regular</option>
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
