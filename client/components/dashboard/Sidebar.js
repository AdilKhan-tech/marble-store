"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarLayout() {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    if (open && !collapsed) {
      document.body.classList.add("sidebar-open");
      document.body.classList.remove("sidebar-collapsed", "sidebar-closed");
    } else if (collapsed) {
      document.body.classList.add("sidebar-collapsed");
      document.body.classList.remove("sidebar-open", "sidebar-closed");
    } else {
      document.body.classList.add("sidebar-closed");
      document.body.classList.remove("sidebar-open", "sidebar-collapsed");
    }
  }, [open, collapsed]);

  const toggleFull = () => setOpen(!open);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const toggleSubMenu = (menu) => {
    setActiveSubMenu((prev) => (prev === menu ? null : menu));
  };

  const toggleDropdown = (menu) => {
    setDropdownOpen((prev) => (prev === menu ? null : menu));
  };

  const closeMobile = () => setOpen(false);

  const isActive = (path) => pathname === path;
  const isActiveParent = (path) => pathname.startsWith(path);

  return (
    <>
      {/* Toggle button when fully closed */}
      {!open && !collapsed && (
        <button className="toggle-btn full-toggle" onClick={toggleFull}>
          <i className="bi bi-list fs-3 text-muted"></i>
        </button>
      )}

      {/* Toggle button when collapsed */}
      {collapsed && (
        <button className="toggle-btn collapse-toggle" onClick={toggleCollapse}>
          <i className="bi bi-arrow-bar-right fs-3 text-muted"></i>
        </button>
      )}

      {/* Overlay for mobile */}
      {open && <div className="sidebar-overlay" onClick={toggleFull} />}

      {/* Sidebar */}
      <aside
        className={`sidebar ${open ? "open" : ""} ${
          collapsed ? "collapsed" : ""
        }`}
      >
        <div className="sidebar-header d-flex align-items-center justify-content-between p-3">
          <Link
            href="/dashboard"
            className="text-decoration-none d-flex align-items-center gap-2"
          >
            <i className="bi bi-grid-fill fs-4 text-orange"></i>
            <h5
              className={`mb-0 text-dark fw-semibold ${
                collapsed ? "d-none" : ""
              }`}
            >
              Dashboard
            </h5>
          </Link>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-light me-3" onClick={toggleFull}>
              <i className="bi bi-arrow-left text-muted"></i>
            </button>
          </div>
        </div>

        <nav className="sidebar-nav px-3" style={{marginTop:"60px"}}>
          <ul className="sidebar-menu list-unstyled">
            {/* Dashboard */}
            <li className="sidebar-menu-item mb-2">
              <Link
                href="/dashboard"
                className={`sidebar-link d-flex align-items-center gap-3 px-3 py-2 ${
                  isActive("/dashboard") ? "active" : ""
                }`}
                onClick={closeMobile}
              >
                <i className="bi bi-speedometer2 sidebar-icon text-muted"></i>
                <span
                  className={`sidebar-text fw-medium ${
                    collapsed ? "d-none" : ""
                  }`}
                >
                  Dashboard
                </span>
              </Link>
            </li>

            {/* Product */}
            <li className="sidebar-menu-item mb-2">
              <Link
                href="/dashboard/product"
                className={`sidebar-link d-flex align-items-center gap-3  px-3 py-2 ${
                  isActive("/dashboard/product") ? "active" : ""
                }`}
                onClick={closeMobile}
              >
                <i className="bi bi-box-seam sidebar-icon text-muted"></i>
                <span
                  className={`sidebar-text fw-medium ${
                    collapsed ? "d-none" : ""
                  }`}
                >
                  Product
                </span>
              </Link>
            </li>

            {/* Cakes */}
            <li className="sidebar-menu-item mb-2 position-relative">
              <div
                className={`sidebar-link sidebar-submenu-header d-flex align-items-center justify-content-between gap-3 px-3 py-2 ${
                  isActiveParent("/dashboard/cake") ? "active" : ""
                }`}
                onClick={() =>
                  collapsed ? toggleDropdown("cakes") : toggleSubMenu("cakes")
                }
              >
                <div className="d-flex align-items-center gap-3">
                  <i className="bi bi-cake2 sidebar-icon text-muted"></i>
                  <span
                    className={`sidebar-text fw-medium ${
                      collapsed ? "d-none" : ""
                    }`}
                  >
                    Cakes
                  </span>
                </div>
                {!collapsed && (
                  <i
                    className={`sidebar-chevron bi bi-chevron-${
                      activeSubMenu === "cakes" ? "up" : "down"
                    } text-muted`}
                  ></i>
                )}
              </div>

              {!collapsed && activeSubMenu === "cakes" && (
                <div className="sidebar-submenu mt-2 ps-4">
                  <Link
                    href="/dashboard/cake/cakeSize"
                    className={`sidebar-submenu-link mt-3 d-block py-1 ${
                      isActive("/dashboard/cake/cakeSize") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Cake Size
                  </Link>
                  <Link
                    href="/dashboard/cake/cakeFlavour"
                    className={`sidebar-submenu-link mt-1 d-block py-1 ${
                      isActive("/dashboard/cake/cakeFlavour") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Cake Flavour
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeType"
                    className={`sidebar-submenu-link d-block mt-1 py-1 ${
                      isActive("/dashboard/cake/customCakeType") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Custom Cake Type
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeFlavor"
                    className={`sidebar-submenu-link mt-1 d-block py-1 ${
                      isActive("/dashboard/cake/customCakeFlavor")
                        ? "active"
                        : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Custom Cake Flavor
                  </Link>
                </div>
              )}

              {collapsed && dropdownOpen === "cakes" && (
                <div className="collapsed-dropdown rounded shadow">
                  <Link
                    href="/dashboard/cake/cakeSize"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Cake Size
                  </Link>
                  <Link
                    href="/dashboard/cake/cakeFlavour"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Cake Flavour
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeType"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Custom Cake Type
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeFlavor"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Custom Cake Flavor
                  </Link>
                </div>
              )}
            </li>

            {/* Ice Cream */}
            <li className="sidebar-menu-item mb-2 position-relative">
              <div
                className={`sidebar-link sidebar-submenu-header d-flex align-items-center justify-content-between gap-3 px-3 py-2 ${
                  isActiveParent("/dashboard/icecream") ? "active" : ""
                }`}
                onClick={() =>
                  collapsed
                    ? toggleDropdown("icecream")
                    : toggleSubMenu("icecream")
                }
              >
                <div className="d-flex align-items-center gap-3">
                  <i className="bi bi-cone-striped sidebar-icon text-muted"></i>
                  <span
                    className={`sidebar-text fw-medium ${
                      collapsed ? "d-none" : ""
                    }`}
                  >
                    Ice Cream
                  </span>
                </div>
                {!collapsed && (
                  <i
                    className={`sidebar-chevron bi bi-chevron-${
                      activeSubMenu === "icecream" ? "up" : "down"
                    } text-muted`}
                  ></i>
                )}
              </div>

              {!collapsed && activeSubMenu === "icecream" && (
                <div className="sidebar-submenu mt-2 ps-4">
                  <Link
                    href="/dashboard/icecream/iceCreamPortionSize"
                    className={`sidebar-submenu-link mt-1 d-block py-1 ${
                      isActive("/dashboard/icecream/iceCreamPortionSize")
                        ? "active"
                        : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Ice Cream Size
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamAddon"
                    className={`sidebar-submenu-link mt-1 d-block py-1 ${
                      isActive("/dashboard/icecream/iceCreamAddon")
                        ? "active"
                        : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Ice Cream Addons
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamBucket"
                    className={`sidebar-submenu-link mt-1 d-block py-1 ${
                      isActive("/dashboard/icecream/iceCreamBucket")
                        ? "active"
                        : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Ice Cream Bucket
                  </Link>
                </div>
              )}

              {collapsed && dropdownOpen === "icecream" && (
                <div className="collapsed-dropdown rounded shadow">
                  <Link
                    href="/dashboard/icecream/iceCreamPortionSize"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Ice Cream Size
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamAddon"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Ice Cream Addons
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamBucket"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Ice Cream Bucket
                  </Link>
                </div>
              )}
            </li>

            {/* Cookies */}
            <li className="sidebar-menu-item mb-2 position-relative">
              <div
                className={`sidebar-link sidebar-submenu-header d-flex align-items-center justify-content-between gap-3 px-3 py-2 ${
                  isActiveParent("/dashboard/cookie") ? "active" : ""
                }`}
                onClick={() =>
                  collapsed ? toggleDropdown("cookie") : toggleSubMenu("cookie")
                }
              >
                <div className="d-flex align-items-center gap-3">
                  <i className="bi bi-cookie sidebar-icon text-muted"></i>
                  <span
                    className={`sidebar-text fw-medium ${
                      collapsed ? "d-none" : ""
                    }`}
                  >
                    Cookies
                  </span>
                </div>
                {!collapsed && (
                  <i
                    className={`sidebar-chevron bi bi-chevron-${
                      activeSubMenu === "cookie" ? "up" : "down"
                    } text-muted`}
                  ></i>
                )}
              </div>

              {!collapsed && activeSubMenu === "cookie" && (
                <div className="sidebar-submenu mt-2 ps-4">
                  <Link
                    href="/dashboard/cookie/"
                    className={`sidebar-submenu-link mt-1 d-block py-1 ${
                      isActive("/dashboard/cookie/") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Cookies
                  </Link>
                  <Link
                    href="/dashboard/cookie/boxSize"
                    className={`sidebar-submenu-link mt-1 d-block py-1 ${
                      isActive("/dashboard/cookie/boxSize") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Cookie Box Size
                  </Link>
                  <Link
                    href="/dashboard/cookie/boxType"
                    className={`sidebar-submenu-link mt-1 d-block py-1 ${
                      isActive("/dashboard/cookie/boxType") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Cookie Box Type
                  </Link>
                </div>
              )}

              {collapsed && dropdownOpen === "cookie" && (
                <div className="collapsed-dropdown rounded shadow">
                  <Link
                    href="/dashboard/cookie/"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Cookies
                  </Link>
                  <Link
                    href="/dashboard/cookie/boxSize"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Box Size
                  </Link>
                  <Link
                    href="/dashboard/cookie/boxType"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Box Type
                  </Link>
                </div>
              )}
            </li>

            {/* Settings */}
            <li className="sidebar-menu-item mb-2 position-relative">
              <div
                className={`sidebar-link sidebar-submenu-header d-flex align-items-center justify-content-between gap-3 px-3 py-2 ${
                  isActiveParent("/dashboard/setting") ? "active" : ""
                }`}
                onClick={() =>
                  collapsed
                    ? toggleDropdown("setting")
                    : toggleSubMenu("setting")
                }
              >
                <div className="d-flex align-items-center gap-3">
                  <i className="bi bi-gear sidebar-icon text-muted"></i>
                  <span
                    className={`sidebar-text fw-medium ${
                      collapsed ? "d-none" : ""
                    }`}
                  >
                    Settings
                  </span>
                </div>
                {!collapsed && (
                  <i
                    className={`sidebar-chevron bi bi-chevron-${
                      activeSubMenu === "setting" ? "up" : "down"
                    } text-muted`}
                  ></i>
                )}
              </div>

              {!collapsed && activeSubMenu === "setting" && (
                <div className="sidebar-submenu mt-2 ps-4">
                  <Link
                    href="/dashboard/setting/branches"
                    className={`sidebar-submenu-link d-block py-1 ${
                      isActive("/dashboard/setting/branches") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Branches
                  </Link>
                  <Link
                    href="/dashboard/setting/occasion"
                    className={`sidebar-submenu-link d-block py-1 ${
                      isActive("/dashboard/setting/occasion") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Occasion
                  </Link>
                  <Link
                    href="/dashboard/setting/gender"
                    className={`sidebar-submenu-link d-block py-1 ${
                      isActive("/dashboard/setting/gender") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Gender
                  </Link>
                  <Link
                    href="/dashboard/setting/categories"
                    className={`sidebar-submenu-link d-block py-1 ${
                      isActive("/dashboard/setting/categories") ? "active" : ""
                    }`}
                    onClick={closeMobile}
                  >
                    Categories
                  </Link>
                </div>
              )}

              {collapsed && dropdownOpen === "setting" && (
                <div className="collapsed-dropdown rounded shadow">
                  <Link
                    href="/dashboard/setting/branches"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Branches
                  </Link>
                  <Link
                    href="/dashboard/setting/occasion"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Occasion
                  </Link>
                  <Link
                    href="/dashboard/setting/gender"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Gender
                  </Link>
                  <Link
                    href="/dashboard/setting/categories"
                    className="dropdown-item py-2 px-3"
                    onClick={closeMobile}
                  >
                    Categories
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
