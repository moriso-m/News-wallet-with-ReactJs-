import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <ul className="navbar-nav bg-gradient-info sidebar sidebar-dark accordion col-md-2" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fa fa-calendar-alt"></i>
                </div>
                <div className="sidebar-brand-text mx-3">
                    <span className="fa fa-newspaper-o"></span>
                    News wallet
                </div>
            </Link>
            <hr className="sidebar-divider my-0" />

            <li className="nav-item active">
                <Link className="nav-link" to="/">
                    <i className="fa fa-fw fa-home"></i>
                    <span>Home</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <li className="nav-item active">
                <Link className="nav-link" to="/all-categories" >
                    <i className="fa fa-address-book"></i>
                    <span>All categories</span>
                </Link>
            </li>

            <hr className="sidebar-divider" />

            <li className="nav-item active">
                <Link className="nav-link" to="/all-articles">
                    <i className="fa fa-fw fa-calendar-check-o"></i>
                    <span>All articles</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />

            <li className="nav-item active">
                <Link className="nav-link" to="/register">
                    <i className="fa fa-fw fa-user"></i>
                    <span>Register account</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />

            <li className="nav-item active">
                <Link className="nav-link" to="/login">
                    <i className="fa fa-fw fa-sign-in"></i>
                    <span>Login</span>
                </Link>
            </li>

            <hr className="sidebar-divider d-none d-md-block" />

            {/* Sidebar Toggler (Sidebar)  */}
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle"></button>
            </div>

        </ul>
    )
}
