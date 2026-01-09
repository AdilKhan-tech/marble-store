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
  const isParentActive = (paths) => paths.some((p) => pathname.startsWith(p));

  const menuData = [
    { key: "dashboard", icon: "bi bi-speedometer", label: "Dashboard", path: "/dashboard" },
    { key: "product", icon: "bi bi-box", label: "Product", path: "/dashboard/product" },
    {
      key: "Cakes",
      icon: "bi bi-cake2",
      label: "Cakes",
      path: null,
      submenu: [
        { label: "Cake Sizes", path: "/dashboard/cake/cakeSize" },
        { label: "Cake Flavors", path: "/dashboard/cake/cakeFlavour" },
        { label: "Custom Cake Sizes", path: "/dashboard/cake/customCakeFlavor" },
        { label: "Custom Cake Types", path: "/dashboard/cake/customCakeType" },
      ],
    },
    {
      key: "Ice Cream",
      icon: "bi bi-cone-streaked",
      label: "Ice Cream",
      path: null,
      submenu: [
        { label: "Ice Cream Addons", path: "/dashboard/icecream/iceCreamAddon" },
        { label: "Ice Cream Buckets", path: "/dashboard/icecream/iceCreamBucket" },
        { label: "Portion Sizes", path: "/dashboard/icecream/iceCreamPortionSize" },
      ],
    },
    {
      key: "Cookies",
      icon: "bi bi-cookie",
      label: "Cookies",
      path: null,
      submenu: [
        { label: "Cookie Box Size", path: "/dashboard/cookie/boxSize" },
        { label: "Cookie Box Type", path: "/dashboard/cookie/boxType" },
        { label: "Cookie List", path: "/dashboard/cookie" },
      ],
    },
    {
      key: "Settings",
      icon: "bi bi-gear",
      label: "Settings",
      path: null,
      submenu: [
        { label: "Branches", path: "/dashboard/setting/branches" },
        { label: "Categories", path: "/dashboard/setting/categories" },
        { label: "Gender", path: "/dashboard/setting/gender" },
        { label: "Occasion", path: "/dashboard/setting/occasion" },
      ],
    },
  ];

  return (
    <>
      {/* Floating Toggle Button when collapsed */}
      {isCollapsed && (
        <button 
          onClick={toggleCollapse} 
          className="sidebar-toggle-btn btn"
          aria-label="Expand sidebar"
        >
          <i className="bi bi-arrow-right fs-4"></i>
        </button>
      )}

      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link href="/dashboard" className="logo-link text-decoration-none">
            {isCollapsed ? (
              <div className="logo-collapsed"></div>
            ) : (
              <div className="logo-full"></div>
            )}
          </Link>

          {!isCollapsed && (
            <button 
              onClick={toggleCollapse} 
              className="sidebar-close-btn btn"
              aria-label="Collapse sidebar"
            >
              <i className="bi bi-arrow-left"></i>
            </button>
          )}
        </div>

        <nav className="sidebar-nav">
          <ul className="list-unstyled">
            {menuData.map((item) => (
              <li key={item.key}>
                {item.submenu ? (
                  <>
                    <button
                      className={`dropdown-toggle ${activeDropdown === item.key ? 'active' : ''}`}
                      onClick={() => setActiveDropdown(activeDropdown === item.key ? null : item.key)}
                      aria-expanded={activeDropdown === item.key}
                    >
                      <i className={`${item.icon} fs-3`}></i>
                      {!isCollapsed && (
                        <>
                          <span className="ms-2 fs-5 fw-normal">{item.label}</span>
                          <i
                            className={`bi bi-chevron-${activeDropdown === item.key ? "up" : "down"} ms-auto`}
                          ></i>
                        </>
                      )}
                    </button>

                    {/* Submenu when expanded */}
                    {!isCollapsed && activeDropdown === item.key && (
                      <div className="submenu">
                        {item.submenu.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.path}
                            className={`d-flex align-items-center ${isActive(sub.path) ? "active" : ""}`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Collapsed dropdown */}
                    {isCollapsed && activeDropdown === item.key && (
                      <div className="collapse-dropdown">
                        <div className="dropdown-header">{item.label}</div>
                        {item.submenu.map((sub, idx) => (
                          <Link 
                            key={idx} 
                            href={sub.path} 
                            className="dropdown-link"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.path}
                    className={`d-flex align-items-center ${isActive(item.path) ? "active" : ""}`}
                  >
                    <i className={`${item.icon} fs-5`}></i>
                    {!isCollapsed && <span className="ms-2">{item.label}</span>}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}