"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setActiveDropdown(null);
  };

  useEffect(() => {
    if (isCollapsed) {
      document.body.classList.add("sidebar-collapsed");
      document.body.classList.remove("sidebar-open");
    } else {
      document.body.classList.add("sidebar-open");
      document.body.classList.remove("sidebar-collapsed");
    }
  }, [isCollapsed]);

  const isActive = (path) => pathname === path;

  return (
    <>
      {/* Floating Toggle Button when collapsed */}
      {isCollapsed && (
        <button 
          onClick={toggleCollapse} 
          className="sidebar-toggle-btn border-none d-flex align-items-center position-fixed justify-content-center text-dark org-btn"
          aria-label="Expand sidebar"
        >
          <i className="bi bi-list fs-4"></i>
        </button>
      )}

      {/* Sidebar */}
      <aside className="dashboard-sidebar position-fixed bg-white">
        <div className="sidebar-header bg-white position-sticky d-flex align-items-center justify-content-between p-4">
          <Link href="/dashboard" className="logo-link text-decoration-none">
            {isCollapsed ? (
              <div className="text-dark org-btn w-100"><i className="bi bi-list fs-3"></i></div>
            ) : (
              <div className="d-flex text-dark gap-1 fs-24">
              <i className="bi bi-grid text-orange"></i>
              Dashboard</div>
            )}
          </Link>

          {!isCollapsed && (
            <button 
              onClick={toggleCollapse} 
              className="bg-light border-none p-2 btn"
              aria-label="Collapse sidebar"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="list-unstyled m-0 p-2">
            {/* Dashboard */}
            <li className="mb-2 position-relative">
              <Link
                href="/dashboard"
                className={`d-flex align-items-center ${isActive("/dashboard") ? "active" : ""}`}
              >
                <i className="bi bi-speedometer text-center fs-5"></i>
                {!isCollapsed && <span className="ms-2">Dashboard</span>}
              </Link>
            </li>

            {/* Product */}
            <li>
              <Link
                href="/dashboard/product"
                className={`d-flex align-items-center ${isActive("/dashboard/product") ? "active" : ""}`}
              >
                <i className="bi bi-box fs-5"></i>
                {!isCollapsed && <span className="ms-2">Product</span>}
              </Link>
            </li>

            {/* Cakes */}
            <li className="mb-2 position-relative">
              <button
                className={`dropdown-toggle ${activeDropdown === "Cakes" ? 'active' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === "Cakes" ? null : "Cakes")}
                aria-expanded={activeDropdown === "Cakes"}
              >
                <i className="bi bi-cake2 fs-4"></i>
                {!isCollapsed && (
                  <>
                    <span className="ms-2">Cakes</span>
                    <i
                      className={`bi bi-chevron-${activeDropdown === "Cakes" ? "up" : "down"} ms-auto`}
                    ></i>
                  </>
                )}
              </button>

              {/* submenu*/}
              {!isCollapsed && activeDropdown === "Cakes" && (
                <div className="submenu mt-2 d-flex align-items-center fs-14 text-decoration-none flex-column">
                  <Link
                    href="/dashboard/cake/cakeSize"
                    className={`d-flex align-items-center ${isActive("/dashboard/cake/cakeSize") ? "active" : ""}`}
                  >
                    Cake Sizes
                  </Link>
                  <Link
                    href="/dashboard/cake/cakeFlavour"
                    className={`d-flex align-items-center ${isActive("/dashboard/cake/cakeFlavour") ? "active" : ""}`}
                  >
                    Cake Flavors
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeSize"
                    className={`d-flex align-items-center ${isActive("/dashboard/cake/customCakeSize") ? "active" : ""}`}
                  >
                    Custom Cake Sizes
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeFlavor"
                    className={`d-flex align-items-center ${isActive("/dashboard/cake/customCakeFlavor") ? "active" : ""}`}
                  >
                    Custom Cake Flavors
                  </Link>
                  <Link
                    href="/dashboard/cake/customCakeType"
                    className={`d-flex align-items-center ${isActive("/dashboard/cake/customCakeType") ? "active" : ""}`}
                  >
                    Custom Cake Types
                  </Link>
                  <Link
                    href="/dashboard/cake/cakePortionSize"
                    className={`d-flex align-items-center ${isActive("/dashboard/cake/cakePortionSize") ? "active" : ""}`}
                  >
                    Cake Portion Sizes
                  </Link>
                </div>
              )}

              {/* Collapsed dropdown */}
              {isCollapsed && activeDropdown === "Cakes" && (
                <div className="collapse-dropdown rounded-4 p-3 position-fixed fs-14">
                  <div className="dropdown-header p-2">Cakes</div>
                  <Link 
                    href="/dashboard/cake/cakeSize" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Cake Sizes
                  </Link>
                  <Link 
                    href="/dashboard/cake/cakeFlavour" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Cake Flavors
                  </Link>
                  <Link 
                    href="/dashboard/cake/customCakeSize" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Custom Cake Sizes
                  </Link>
                  <Link 
                    href="/dashboard/cake/customCakeFlavor" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Custom Cake Flavors
                  </Link>
                  <Link 
                    href="/dashboard/cake/customCakeType" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Custom Cake Types
                  </Link>
                   <Link 
                    href="/dashboard/cake/cakePortionSize" 
                    className="dropdown-link"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Cake Portion Sizes
                  </Link>
                </div>
              )}
            </li>

            {/* Ice Cream */}
            <li className="mb-2 position-relative">
              <button
                className={`dropdown-toggle ${activeDropdown === "IceCream" ? 'active' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === "IceCream" ? null : "IceCream")}
                aria-expanded={activeDropdown === "IceCream"}
              >
                <i className="bi bi-cone fs-4"></i>
                {!isCollapsed && (
                  <>
                    <span className="ms-2">Ice Cream</span>
                    <i
                      className={`bi bi-chevron-${activeDropdown === "IceCream" ? "up" : "down"} ms-auto`}
                    ></i>
                  </>
                )}
              </button>

              {!isCollapsed && activeDropdown === "IceCream" && (
                <div className="submenu mt-2 d-flex align-items-center fs-14 text-decoration-none flex-column">
                  <Link
                    href="/dashboard/icecream/iceCreamAddon"
                    className={`d-flex align-items-center ${isActive("/dashboard/icecream/iceCreamAddon") ? "active" : ""}`}
                  >
                    Ice Cream Add-Ons
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamBucket"
                    className={`d-flex align-items-center ${isActive("/dashboard/icecream/iceCreamBucket") ? "active" : ""}`}
                  >
                    Ice Cream Buckets
                  </Link>
                  <Link
                    href="/dashboard/icecream/iceCreamPortionSize"
                    className={`d-flex align-items-center ${isActive("/dashboard/icecream/iceCreamPortionSize") ? "active" : ""}`}
                  >
                    Ice Cream Portion Sizes
                  </Link>
                </div>
              )}

              {isCollapsed && activeDropdown === "IceCream" && (
                <div className="collapse-dropdown rounded-4 p-3 position-fixed fs-14">
                  <div className="dropdown-header">Ice Cream</div>
                  <Link 
                    href="/dashboard/icecream/iceCreamAddon" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Ice Cream Add-Ons
                  </Link>
                  <Link 
                    href="/dashboard/icecream/iceCreamBucket" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Ice Cream Buckets
                  </Link>
                  <Link 
                    href="/dashboard/icecream/iceCreamPortionSize" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Ice Cream Portion Sizes
                  </Link>
                </div>
              )}
            </li>

            {/* Cookies */}
            <li className="mb-2 position-relative">
              <button
                className={`dropdown-toggle ${activeDropdown === "Cookies" ? 'active' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === "Cookies" ? null : "Cookies")}
                aria-expanded={activeDropdown === "Cookies"}
              >
                <i className="bi bi-cookie fs-4"></i>
                {!isCollapsed && (
                  <>
                    <span className="ms-2">Cookies</span>
                    <i
                      className={`bi bi-chevron-${activeDropdown === "Cookies" ? "up" : "down"} ms-auto`}
                    ></i>
                  </>
                )}
              </button>

              {!isCollapsed && activeDropdown === "Cookies" && (
                <div className="submenu mt-2 d-flex align-items-center fs-14 text-decoration-none flex-column">
                  <Link
                    href="/dashboard/cookie/boxSize"
                    className={`d-flex align-items-center ${isActive("/dashboard/cookie/boxSize") ? "active" : ""}`}
                  >
                    Cookie Box Sizes
                  </Link>
                  <Link
                    href="/dashboard/cookie/boxType"
                    className={`d-flex align-items-center ${isActive("/dashboard/cookie/boxType") ? "active" : ""}`}
                  >
                    Cookie Box Types
                  </Link>
                  <Link
                    href="/dashboard/cookie"
                    className={`d-flex align-items-center ${isActive("/dashboard/cookie") ? "active" : ""}`}
                  >
                    Cookies
                  </Link>
                </div>
              )}

              {isCollapsed && activeDropdown === "Cookies" && (
                <div className="collapse-dropdown rounded-4 p-3 position-fixed fs-14">
                  <div className="dropdown-header">Cookies</div>
                  <Link 
                    href="/dashboard/cookie/boxSize" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Cookie Box Sizes
                  </Link>
                  <Link 
                    href="/dashboard/cookie/boxType" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Cookie Box Types
                  </Link>
                  <Link 
                    href="/dashboard/cookie" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Cookies
                  </Link>
                </div>
              )}
            </li>

            {/* Settings */}
            <li className="mb-2 position-relative">
              <button
                className={`dropdown-toggle ${activeDropdown === "Settings" ? 'active' : ''}`}
                onClick={() => setActiveDropdown(activeDropdown === "Settings" ? null : "Settings")}
                aria-expanded={activeDropdown === "Settings"}
              >
                <i className="bi bi-gear fs-4"></i>
                {!isCollapsed && (
                  <>
                    <span className="ms-2">Settings</span>
                    <i
                      className={`bi bi-chevron-${activeDropdown === "Settings" ? "up" : "down"} ms-auto`}
                    ></i>
                  </>
                )}
              </button>

              {!isCollapsed && activeDropdown === "Settings" && (
                <div className="submenu mt-2 d-flex align-items-center fs-14 text-decoration-none flex-column">
                  <Link
                    href="/dashboard/setting/branches"
                    className={`d-flex align-items-center ${isActive("/dashboard/setting/branches") ? "active" : ""}`}
                  >
                    Branches
                  </Link>
                  <Link
                    href="/dashboard/setting/category"
                    className={`d-flex align-items-center ${isActive("/dashboard/setting/category") ? "active" : ""}`}
                  >
                    Categories
                  </Link>
                  <Link
                    href="/dashboard/setting/gender"
                    className={`d-flex align-items-center ${isActive("/dashboard/setting/gender") ? "active" : ""}`}
                  >
                    Gender
                  </Link>
                  <Link
                    href="/dashboard/setting/occasion"
                    className={`d-flex align-items-center ${isActive("/dashboard/setting/occasion") ? "active" : ""}`}
                  >
                    Occasions
                  </Link>
                  <Link
                    href="/dashboard/setting/productTags"
                    className={`d-flex align-items-center ${isActive("/dashboard/setting/productTags") ? "active" : ""}`}
                  >
                    Product Tags
                  </Link>
                </div>
              )}

              {isCollapsed && activeDropdown === "Settings" && (
                <div className="collapse-dropdown rounded-4 p-3 position-fixed fs-14">
                  <div className="dropdown-header">Settings</div>
                  <Link 
                    href="/dashboard/setting/branches" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Branches
                  </Link>
                  <Link 
                    href="/dashboard/setting/category" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Categories
                  </Link>
                  <Link 
                    href="/dashboard/setting/gender" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Gender
                  </Link>
                  <Link 
                    href="/dashboard/setting/occasion" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Occasions
                  </Link>
                  <Link 
                    href="/dashboard/setting/productTags" 
                    className="dropdown-link d-block align-items-center text-decoration-none fs-14"
                    onClick={() => setActiveDropdown(null)}
                  >
                    Product Tags
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