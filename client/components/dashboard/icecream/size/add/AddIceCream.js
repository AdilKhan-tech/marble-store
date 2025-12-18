import React from 'react'

function page() {
  return (
    <form className="mt-0">
      <div className="form-group">
          <label className="form-label fs-14 fw-bold text-dark-custom text-secondary">Name English</label>
          <input name ="name_en" type= "text" className="form-control form-control-lg textarea-hover-dark text-secondary"/>
     </div>
      <div className="form-group mt-2">
            <label className='form-label fs-14 fw-bold text-dark-custom text-secondary'>Name Arabic</label>
        <input name ="name_ar" type= "text" className="form-control form-control-lg textarea-hover-dark text-secondary"/>
      </div>

        <div className="form-group mt-2">
          <label className='form-label fs-14 fw-bold text-dark-custom text-secondary'>Slug</label>
          <input name ="slug" type='text' className='form-control form-control-lg textarea-hover-dark text-secondary0'/>
    </div>
        <div className="form-group mt-2">
          <label className='form-label fs-14 fw-bold text-dark-custom text-secondary'>Add On Type</label>
          <select name='add_on_type' className='form-select fs-12 fw-normal textarea-hover-dark text-secondary'>
            <option value="" className="fs-14 fw-normal text-secondary">Select Add On Type</option>
            <option value="Flavour" className="fs-14 fw-normal text-secondary">Flavour</option>
            <option value="Mix-Ins" className="fs-14 fw-normal text-secondary">Mix-Ins</option>
            <option value="Sauces" className="fs-14 fw-normal text-secondary">Sauces</option>
          </select>
    </div>
        <div className="form-group mt-2">
          <label className='form-label fs-14 fw-bold text-dark-custom text-secondary'>Add On Status</label>
          <input name="add_on_status" type="text" className='form-control form-control-lg textarea-hover-dark text-secondary'/>
    </div>
        <div className="form-group mt-2">
          <label className='form-label fs-14 fw-bold text-dark-custom text-secondary'>Image Url</label>
          <input name='image_url' type='text' className='form-control form-control-lg textarea-hover-dark text-secondary'/>
    </div>
    </form>
  )
}

export default page