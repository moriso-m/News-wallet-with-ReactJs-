
/**
 * @author Moriso
 * This component is the homepage of the logged in user.
 * After logging in, the user is redirected here
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class UserHome extends Component {
    constructor(){
        super()
        this.state ={
            errors : []
        }
        this.logout = this.logout.bind(this)
    }

    // logout user
    logout (){
        const { history } = this.props
        // get access token from local storage
        let token = window.localStorage.getItem('token')
        // set headers
        let config ={
            headers : {
                'Content-Type' : 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization' : 'Bearer '+ token
            }
        };
        // revoke access token on API
        axios.get('/api/logout',config)
            .then(response => {
                if(response.status === 200){
                    // remove token and user items from local storage
                    window.localStorage.removeItem('user')
                    window.localStorage.removeItem('token')
                    window.location('/')
                }
            })
            .catch( error => {
                 this.setState({
                     errors : error.response.data
                 })
            })


    }

    // display errors
    renderError(){
        if(this.state.errors){
            const errors = this.state.errors
            for(const key in this.state.errors){
                if(errors.hasOwnProperty(key)){
                    return (
                        <div className='alert alert-danger container'>
                            <em> { errors[key] } </em>
                        </div>

                    )
                }
            }
        }
    }

    render() {
        const user = window.localStorage.getItem('user')
        return (
            <div className="App">
            {/* Page Wrapper */}
            <div id="wrapper">
                {/* Sidebar */}
                <ul className="navbar-nav bg-gradient-info sidebar sidebar-dark accordion" id="accordionSidebar">

                    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fa fa-fw fa-newspaper-o"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">
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
                        <Link className="nav-link" to="/categories">
                            <i className="fa fa-fw fa-book"></i>
                            <span>All categories</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/categories">
                            <i className="fa fa-fw fa-plus-circle"></i>
                            <span>New category</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/articles">
                            <i className="fa fa-fw fa-tasks"></i>
                            <span>All Articles</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/create-article">
                            <i className="fa fa-fw fa-plus-circle"></i>
                            <span>New Articles</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/popular-articles">
                            <i className="fa fa-fw fa-chart"></i>
                            <span>Popular articles</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/login">
                            <i className="fa fa-fw fa-sign-in"></i>
                            <span>
                               {
                                   window.localStorage.getItem('user') ? window.localStorage.getItem('user') : 'Guest'
                                }
                            </span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider" />

                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick= { this.logout }>
                            <i className="fa fa-fw fa-sign-out"></i>
                            Logout
                        </a>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />

                    {/* Sidebar Toggler (Sidebar)  */}
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>

                </ul>
                {/*  Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">

                    {/* Main Content  */}
                    <div id="content">
                        {/* <!-- Topbar --> */}
                        <nav className="navbar navbar-expand navbar-inverse topbar mb-4 static-top shadow">

                            {/* Sidebar Toggle (Topbar) */}
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars"></i>
                            </button>

                            {/* Topbar Navbar */}
                            <button className="navbar-toggler" data-toggle="collapse" data-target="top-bar">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {/* <Link to="#" className="navbar-brand">Todo list</Link> */}
                            <div className="collapse navbar-collapse" id="top-bar">
                                <ul className="navbar-nav mr-auto">
                                    <li className="active nav-item">
                                        <Link to="/" className="nav-link">Home</Link>
                                        </li>
                                    <li className="nav-item">

                                    </li>
                                </ul>
                            </div>
                            <ul className="navbar-nav ml-auto">

                                {/* <!-- Nav Item - Search Dropdown (Visible Only XS) --> */}
                                <li className="nav-item dropdown no-arrow d-sm-none">
                                    <Link className="nav-link dropdown-toggle" to="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fa fa-search fa-fw"></i>
                                    </Link>
                                    {/* Dropdown - Messages */}
                                    <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
                                        <form method="POST" action="#" className="form-inline mr-auto w-100 navbar-search">
                                        <div className="input-group">
                                            <input name="patient_id" type="number" className="form-control bg-light border-0 small" placeholder="Search Patient" aria-label="Search" aria-describedby="basic-addon2" />
                                            <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="fa fa-search fa-sm"></i>
                                            </button>
                                            </div>
                                        </div>
                                        </form>
                                    </div>
                                </li>

                                    {/* <!-- Nav Item - User Information --> */}
                                <li className="nav-item dropdown">

                                <Link className="nav-link dropdown-toggle" to="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small"><i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400">
                                    </i>{ user }</span>
                                </Link>
                                {/* <!-- Dropdown - User Information --> */}
                                <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                                    <Link className="dropdown-item" to="/">
                                    <i className="fa fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Profile
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" to="#">
                                        <i className="fa fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                        Logout
                                    </a>
                                </div>
                                </li>
                            </ul>

                        </nav>
                        <div className="row container">
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-primary shadow h-100 py-2">
                                <Link className="card-body" to="/categories">
                                    <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            My Categories
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa fa-list fa-2x text-gray-300"></i>
                                    </div>
                                    </div>
                                </Link>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-info shadow h-100 py-2">
                                    <Link className="card-body" to="/articles">
                                        <div className="row no-gutters align-items-center">
                                        <div className="col mr-2">
                                            <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                Articles
                                            </div>
                                            <div className="row no-gutters align-items-center">
                                            <div className="col-auto">
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-auto">
                                            <i className="fa fa-calendar-check-o fa-2x text-gray-300"></i>
                                        </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6 mb-4">
                                <div className="card border-left-danger shadow h-100 py-2">
                                <Link className="card-body" to="/popular-articles">
                                    <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                                            Popular articles
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fa fa-line-chart fa-2x text-gray-300"></i>
                                    </div>
                                    </div>
                                </Link>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card border-left-warning shadow h-100 py-2">
                            <Link className="card-body" to="/">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                    Manage categories
                                </div>
                                </div>
                                <div className="col-auto">
                                <i className="fa fa-tasks fa-2x text-gray-300"></i>
                                </div>
                            </div>
                            </Link>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default UserHome
