"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLayout() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  // Add class to body when sidebar is open/closed
  useEffect(() => {
    if (open) {
      document.body.classList.remove("sidebar-closed");
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
      document.body.classList.add("sidebar-closed");
    }
  }, [open]);

  const toggleSubMenu = (menu) => {
    setActiveSubMenu((prev) => (prev === menu ? null : menu));
  };

  const isActive = (path) => pathname === path;
  const isActiveParent = (path) => pathname.startsWith(path);

  return (
    <>
      {/* Toggle Button - Only show when sidebar is closed */}
      {!open && (
        <button className="toggle-btn" onClick={() => setOpen(true)}>
          <i className="bi bi-list"></i>
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          className="sidebar-overlay fade-in"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="sidebar-header">
          <Link href="/dashboard" className="text-decoration-none">
            <h4 className="text-orange">Dashboard</h4>
          </Link>
          <button className="btn btn-light me-2" onClick={() => setOpen(false)}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            <li className="sidebar-menu-item">
              <Link
                href="/dashboard"
                className={`sidebar-link ${
                  isActive("/dashboard") ? "active" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                <span className="">
                  <i className="bi bi-building-dash me-1 sidebar-icon"></i>Dashboard
                </span>
              </Link>
            </li>

            <li className="sidebar-menu-item">
              <div
                className={`sidebar-submenu-header ${
                  isActiveParent("/dashboard/cakes") ? "active" : ""
                }`}
                onClick={() => toggleSubMenu("cakes")}
              >
                <span className="">
                  <i className="bi bi-cake2 me-1  sidebar-icon"></i>Cakes
                </span>
                <i
                  className={`sidebar-chevron bi bi-chevron-${
                    activeSubMenu === "cakes" ? "up" : "down"
                  }`}
                ></i>
              </div>
              {activeSubMenu === "cakes" && (
                <div className="sidebar-submenu ms-3">
                  <Link
                    href="/dashboard/cakes/size"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/cakes/size") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Cake Size</span>
                  </Link>
                  <Link
                    href="/dashboard/cakes/flavour"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/cakes/flavour") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Cake Flavour</span>
                  </Link>
                  <Link
                    href="/dashboard/cakes/customCakeType"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/cakes/customCakeType") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Custom Cake Type</span>
                  </Link>
                  <Link
                    href="/dashboard/cakes/customCakeFlavor"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/cakes/customCakeFlavor") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Custom Cake Flavor</span>
                  </Link>
                </div>
              )}
            </li>

            <li className="sidebar-menu-item">
              <div
                className={`sidebar-submenu-header ${
                  isActiveParent("/dashboard/icecream") ? "active" : ""
                }`}
                onClick={() => toggleSubMenu("icecream")}
              >
                <span className="">
                  <i className="fa fa-ice-cream me-1  sidebar-icon"></i>Ice Cream
                </span>
                <i
                  className={`sidebar-chevron bi bi-chevron-${
                    activeSubMenu === "icecream" ? "up" : "down"
                  }`}
                ></i>
              </div>
              {activeSubMenu === "icecream" && (
                <div className="sidebar-submenu ms-3">
                  <Link
                    href="/dashboard/icecream/iceCreamPortionSize"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/iceCreamPortionSize") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Ice Cream Size</span>
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamAddon"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/icecream/iceCreamAddon") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Ice Cream Addons</span>
                  </Link>
                </div>
              )}
            </li>

            <li className="sidebar-menu-item">
              <div
                className={`sidebar-submenu-header ${
                  isActiveParent("/dashboard/icecream") ? "active" : ""
                }`}
                onClick={() => toggleSubMenu("cookie")}
              >
                <span className="">
                  <i className="bi bi-cookie me-1  sidebar-icon"></i>Cookies
                </span>
                <i
                  className={`sidebar-chevron bi bi-chevron-${
                    activeSubMenu === "cookie" ? "up" : "down"
                  }`}
                ></i>
              </div>
              {activeSubMenu === "cookie" && (
                <div className="sidebar-submenu ms-3">
                  <Link
                    href="/dashboard/cookies/"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/cookies/cookie") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Cookies</span>
                  </Link>
                  <Link
                    href="/dashboard/cookies/boxSize"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/cookies/boxSize") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Cookies Size</span>
                  </Link>
                  <Link
                    href="/dashboard/cookies/boxType"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/cookies/boxType") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Cookies Type</span>
                  </Link>
                </div>
              )}
            </li>

            <li className="sidebar-menu-item">
              <div
                className={`sidebar-submenu-header
               ${isActiveParent("/dashboard/icecream") ? "active" : ""}`}
                onClick={() => toggleSubMenu("setting")}
              >
                <span className="">
                  <i className="bi bi-gear me-1 sidebar-icon"></i>Settings
                </span>
                <i
                  className={`sidebar-chevron bi bi-chevron-${
                    activeSubMenu === "setting" ? "up" : "down"
                  }`}
                ></i>
              </div>
              {activeSubMenu === "setting" && (
                <div className="sidebar-submenu ms-3">
                  <Link
                    href="/dashboard/setting/branches"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/setting/branches") ? "active" : ""

                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Branches</span>
                  </Link>
                </div>
              )}
              {activeSubMenu === "setting" && (
                <div className="sidebar-submenu ms-3">
                  <Link
                    href="/dashboard/setting/occasion"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/setting/occasion") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sidebar-label">Ocassion</span>
                  </Link>
                </div>
              )}
              {activeSubMenu === "setting" && (
                <div className="sidebar-submenu ms-3">
                  <Link
                    href="/dashboard/setting/gender"
                    className={`sidebar-submenu-link ${
                      isActive("/dashboard/setting/gender") ? "active" : ""
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    <span className=""></span>
                    <span className="sidebar-label">Gender</span>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
