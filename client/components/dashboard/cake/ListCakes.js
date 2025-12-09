'use client';

import useAxiosConfig from "../../../hooks/useAxiosConfig";
import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getCakesSizes } from '../../../utils/apiRoutes';

export default function ListCakes() {
  const {token} = useAxiosConfig();
  const [cakes, setCakes] = useState([]);

  const fetchCakeSizes = async () => {
    try {
      const response = await axios.get(getCakesSizes);
      setCakes(response.data)
    } catch (error) {
      console.error("Error fetching cakes", error);
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchCakeSizes();
  }, [token]);

  return (
    <>
    <section className='' style={{marginInlineStart:"270px", marginTop:"100px"}}>
      <div className=""> 
      <p className="fs-20">Cakes Sizes</p>
      <div className='d-flex justify-content-between'>
        <div className='d-flex'>
            <input type="text" className="form-control rounded-2 border px-3 py-2" placeholder="Search here..." style={{height:"43px", width:"300px"}}/>
            </div>
            <div style={{marginInlineEnd:"20px"}}>
              <div className='org-btn py-2 px-4 rounded-3'><i className='bi bi-plus-circle ms-2'></i><span className='ms-1'>Create</span></div>
            </div>
        </div>
        </div>
      <div className="px-0 pt-0 rounded-2 p-0 mt-5">

        <div className="datatable-wrapper">
          <div className="data-table p-2 rounded-4">
            <table className="table border-2  datatable-table structure">
              <thead>
                <tr>
                  <th className="bg-secondary fw-20">#</th>
                  <th className="bg-secondary fw-20">Name</th>
                  <th className="bg-secondary fw-20">Category</th>
                  <th className="bg-secondary fw-20">Slug</th>
                  <th className="bg-secondary fw-20">Scope/Size</th>
                  <th className="bg-secondary fw-20">Additional Price</th>
                  <th className="bg-secondary fw-20">Symbol</th>
                  <th className="bg-secondary fw-20">Calories</th>
                  <th className="bg-secondary fw-20">Status</th>
                  <th className="bg-secondary fw-20">Action</th>
                </tr>
              </thead>

              <tbody>
                {cakes.map((cake) => (
                  <tr key={cake.id}>

                    <td className="text-secondary fs-16">{cake.id}</td>
                    <td className="text-secondary fs-16">{cake.name_en}</td>
                    <td className="text-secondary fs-16">{cake.category_id}</td>
                    <td className="text-secondary fs-16">{cake.slug}</td>
                    <td className="text-secondary fs-16">{cake.scoop_size}</td>
                    <td className="text-secondary fs-16">{cake.additional_price}</td>
                    <td className="text-secondary fs-16">{cake.symbol}</td>
                    <td className="text-secondary fs-16">{cake.calories}</td>
                    <td className="text-secondary fs-16">{cake.status}</td>

                    <td>
                      <div className="d-flex gap-1">
                        <button className="btn btn-sm btn-light p-2">
                          <i className="bi bi-eye text-primary"></i>
                        </button>
                        <button className="btn btn-sm btn-light p-2">
                          <i className="bi bi-trash3 text-danger"></i>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>

      </div>
    </section>
    </>
    
  )
}