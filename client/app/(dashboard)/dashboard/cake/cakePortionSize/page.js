import React from "react";

function page() {
  return (
    <>
      <section className="mt-10">
        <div className="">
          <p className="pagetitle mb-0 fnt-color">Cake Portion Sizes</p>
          <div className="dd-flex justify-content-between mt-4">
            <div className="d-flex">
              <i className="bi bi-search fs-5 px-3 py-1 text-secondary position-absolute"></i>
              <input
                type="text"
                className="form-control px-5 text-dark-custom"
                placeholder="Search here..."
              />
            </div>
            <div style={{ marginInlineEnd: "20px" }}>
              <div className="btn-orange" role="button">
                <i className="bi bi-plus-circle ms-2"></i>
                <span className="ms-1">Create</span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-0 pt-0 rounded-2 p-0 mt-3">
          <div className="">
            <div className="data-table">
              <table className="table datatable-wrapper">
                <thead className="">
                  <tr className="">
                    <th onClick={() => handleSort("id")}>
                      ID <span>{renderSortIcon("id")}</span>
                    </th>
                    <th onClick={() => handleSort("id")}>
                      ID <span>{renderSortIcon("id")}</span>
                    </th>
                    <th onClick={() => handleSort("id")}>
                      ID <span>{renderSortIcon("id")}</span>
                    </th>
                    <th onClick={() => handleSort("id")}>
                      ID <span>{renderSortIcon("id")}</span>
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default page;
