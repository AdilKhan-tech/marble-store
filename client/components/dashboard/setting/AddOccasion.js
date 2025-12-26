"use Client"
import React from 'react'
import { useState } from "react"

function AddOccasions() {

    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };
  return (
    <form className='mt-0'>
        <div className='form-group'>
            <label className='form-label text-secondary'>Name English</label>
            <input 
             name='name_en'
             type='text'
             className='form-control form-control-lg text-secondary'></input>
        </div>
        <div className='form-group mt-3'>
            <label className="form-label text-secondary">Slug</label>
            <input
             name='slug'
             className='form-control form-control-lg text-secondary'></input>
        </div>
        <div className='form-group mt-3'>
            <label className='form-label text-secondary'>Select Parent Occasion</label>
            <select className='form-select'>
                <option value="">Select Parent Occasion</option>
                <option value="1">None</option>
                <option value="2">Achievement</option>
                <option value="3">Birthdays</option>
                <option value="4">Congratulations</option>
                <option value="5">Get Well Soon</option>
                <option value="6">Graduation</option>
                <option value="7">Holidays</option>
                <option value="8">New Born</option>
                <option value="9">Weddings</option>
            </select>
        </div>

        <div className="col-md-12 px-1 mt-2">
        <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">
          File Attachment
        </label>
        <div className="">
          <input
            type="file"
            className="form-control form-control-lg textarea-hover-dark text-secondary"
            id="fileInput"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <ul className="mt-2">
          {selectedFiles.map((file, index) => (
            <li className="list-unstyled text-muted" key={index}>
              <span className="fs-12 fw-bold">File Size: {file.size} KB</span>
            </li>
          ))}
        </ul>
        <div className="text-danger">
          <i className="bi bi-info-circle me-2"></i>
          <span className="fs-14 fw-normal">
            Supported files : GIF ,JPG , PNG, PDF , DOC , or DOCX
          </span>
        </div>
      </div>
      <div className="form-buttons mt-5 d-flex justify-content-between gap-2">
        <button type="button" className="cancle-btn rounded-3 border-1 border-secondary fs-16 py-2 fw-medium w-100">Cancel</button>
        <button type="submit" className="org-btn py-2 d-flex justify-content-center rounded-3 fs-16 fw-normal border-0 w-100">Save</button>
       </div>
    </form>
  )
}

export default AddOccasions;
