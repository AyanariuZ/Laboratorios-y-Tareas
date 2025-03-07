import React from "react";
import { Outlet, NavLink } from "react-router-dom";
export const Layout = () => {
  return (
    <div className="dashboard-nav">
      <nav className="dashboard-nav-list">     
            <NavLink to="/home" className="dashboard-nav-item">
            <i class="fas fa-home"></i>
            Home
            </NavLink>
            <NavLink to="/dashboard" className="dashboard-nav-item">
            <i class="fas fa-tachometer-alt"></i>
            Dashboard
            </NavLink>
            <NavLink to="/perfil" className="dashboard-nav-item">
            <i class="fas fa-user"></i>
            Perfil
            </NavLink>
            <NavLink to="/login" className="dashboard-nav-item">
            <i class="fas fa-users"></i>
            Login
            </NavLink>
            
      </nav>
      <Outlet />
      <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 fixed-bottom" >
    <div class="col-md-4 d-flex align-items-center">
      <a href="/" class="mb-3 me-2 mb-md-0 text-body-secondary text-decoration-none lh-1">
        <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
      </a>
      <span class="mb-3 mb-md-0" style={{color: '#fff'}}>© 2024 Company, Inc</span>
    </div>

    <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
      <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li>
      <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
      <li class="ms-3"><a class="text-body-secondary" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li>
    </ul>
  </footer>
</div>
  );
};
