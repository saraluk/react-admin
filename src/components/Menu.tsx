import React from "react";

export function Menu() {
  return (
    <nav className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
      <div
        className="offcanvas-md offcanvas-end bg-body-tertiary"
        tabIndex={-1}
        id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="sidebarMenuLabel">
            Company name
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            data-bs-target="#sidebarMenu"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                className="nav-link d-flex align-items-center gap-2 active"
                aria-current="page"
                href="#"
              >
                <svg className="bi" aria-hidden="true">
                  <use xlinkHref="#house-fill"></use>
                </svg>
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi" aria-hidden="true">
                  <use xlinkHref="#file-earmark"></use>
                </svg>
                Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi" aria-hidden="true">
                  <use xlinkHref="#cart"></use>
                </svg>
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi" aria-hidden="true">
                  <use xlinkHref="#people"></use>
                </svg>
                Customers
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center gap-2" href="#">
                <svg className="bi" aria-hidden="true">
                  <use xlinkHref="#graph-up"></use>
                </svg>
                Reports
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
