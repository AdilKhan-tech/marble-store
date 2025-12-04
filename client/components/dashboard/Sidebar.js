"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLayout() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggleSubMenu = (menu) => {
    setActiveSubMenu((prev) => (prev === menu ? null : menu));
  };

  const isActive = (path) => pathname === path;

  return (
    <div className="">
      {/* Toggle Button */}
      <button className="btn btn-dark toggle-btn" onClick={() => setOpen(true)}>
        <i className="bi bi-list"></i>
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        {/* Header */}
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
          <a href="/dashboard" className="text-decoration-none">
            <h4 className="mt-3 text-dark">Dashboard</h4>
          </a>
          <i
            className="bi bi-x-lg text-dark p-3 rounded-4"
            onClick={() => setOpen(false)}
            style={{ cursor: "pointer" }}
          ></i>
        </div>

        {/* Sidebar Menu */}
        <ul className="list-group mt-5">

          {/* === Cakes (submenu like Room Management) === */}
          <li>
            <div
              className={`list-group-item list-item bg-white list-unstyled border-0 text-dark d-flex justify-content-between ${
                activeSubMenu === "cakes" ? "active" : ""
              }`}
              onClick={() => toggleSubMenu("cakes")}
              style={{ cursor: "pointer" }}
            >
              <span className="fs-18 fw-medium sidebar-submenu-header"><i className="bi bi-cake2"></i> Cakes</span>
              <i className={`bi bi-chevron-${activeSubMenu === "cakes" ? "up" : "down"}`}></i>
            </div>

            {activeSubMenu === "cakes" && (
              <div className="ps-4">
                <Link
                  href="/dashboard/cakes"
                  className={`list-item text-decoration-none px-3 border-0 ${
                    isActive("/dashboard/cakes") ? "active" : ""
                  }`}
                >
                  Cake Size
                </Link>

                <Link
                  href="#"
                  className={`list-group-item bg-transparent border-0 ${
                    isActive("/cakes/create") ? "active" : ""
                  }`}
                >Cake Flavour</Link>
              </div>
            )}
          </li>

          {/* Simple Items */}
          <a href="#" className="list-group-item bg-transparent border-0 text-dark">
            <i className="bi bi-info-circle"></i> About
          </a>

          <a href="#" className="list-group-item bg-transparent border-0 text-dark">
            <i className="bi bi-gear"></i> Services
          </a>
        </ul>
      </div>
    </div>
  );
}
