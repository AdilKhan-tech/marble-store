"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useMemo, useRef } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
const MemoJoditEditor = React.memo(JoditEditor);

export default function AddProductStatic() {
  const [selectedFile, setSelectedFile] = useState([]);
  const descriptionRef = useRef("");

  const editorConfig = useMemo(
    () => ({
      height: 300,
    }),
    [],
  );

  const handleFileChange = (e) => {
    setSelectedFile(Array.from(e.target.files));
  };

  return (
    <form>
      <div className="">
        <div className="form-group ">
          <label className="form-label text-secondary">Name English</label>
          <input
            type="text"
            className="form-control form-control-lg textarea-hover-dark text-secondary"/>
        </div>

        <div className="form-group  mt-3">
          <label className="form-label text-secondary">Name Arabic</label>
          <input
            type="text"
            className="form-control form-control-lg textarea-hover-dark text-secondary"/>
        </div>
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Description</label>
        <MemoJoditEditor
          config={editorConfig}
          onChange={(content) => {
            descriptionRef.current = content;
          }}
          onBlur={(newContent) => {
            setFormData((prev) => ({
              ...prev,
              description: newContent,
            }));
          }}/>
      </div>

        <div className="form-group mt-3">
          <label className="form-label text-secondary">Gender</label>
          <select className="form-select textarea-hover-dark text-secondary">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label className="form-label text-secondary">Tax Class</label>
          <select className="form-select textarea-hover-dark text-secondary">
            <option>Select Tax Class</option>
            <option>Standard</option>
            <option>Popular</option>
          </select>
        </div>

        <div className="form-group mt-3">
          <label className="form-label text-secondary">Tax Status</label>
          <select className="form-select textarea-hover-dark text-secondary">
            <option>Select Tax Status</option>
            <option>Taxable</option>
            <option>Shipping Only</option>
            <option>None</option>
          </select>
        </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Categories</label>
        <select
          type="select"
          className="form-select textarea-hover-dark text-secondary">
          <option>Select Categories</option>
          <option>Cake</option>
          <option>Ice Cream</option>
          <option>Cute Cake</option>
          <option>Sponge Cake</option>
          <option>Ice Cream Cake</option>
        </select>
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Branches</label>
        <select
          type="select"
          className="form-select textarea-hover-dark text-secondary">
          <option>Select Branches</option>
          <option>Alkhamdiya</option>
          <option>Al Madina</option>
          <option>Dammam Madinat</option>
        </select>
      </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">Occasions</label>
        <select
          type="select"
          className="form-select textarea-hover-dark text-secondary">
          <option>Select Occasions</option>
          <option>Achievement</option>
          <option>Birthday</option>
          <option>Congratulation</option>
        </select>
      </div>


        <div className="form-group mt-3">
            <label className="form-label text-secondary">Regular Price</label>
            <input
            type="text"
            className="form-control form-control-lg textarea-hover-dark text-secondary"/>
        </div>

        <div className="form-group mt-3">
            <label className="form-label text-secondary">Sale Price</label>
            <input
            type="text"
            className="form-control form-control-lg textarea-hover-dark text-secondary"/>
        </div>

        <div className="form-group  mt-3">
            <label className="form-label text-secondary">Product Tags</label>
            <input
            type="text"
            className="form-control form-control-lg textarea-hover-dark text-secondary"/>
        </div>

      <div className="form-group mt-3">
        <label className="form-label text-secondary">File Attachment</label>
        <div className="col-md-12">
          <div
            className="upload-container text-center flex-column"
            style={{ width: 490 }}>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
              className="d-none"/>
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
                <li className="list-unstyled text-muted fnt-color opacity-50 fs-14 fw-normal"key={index}>
                  File Size: {file.size} KB
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button type="button" className="cancle-btn rounded-3 w-100">Cancel</button>
        <button type="submit" className="org-btn w-100">Save</button>
      </div>
    </form>
  );
}
