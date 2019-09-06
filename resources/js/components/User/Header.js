import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

class Header extends Component{
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
                alert(response)
                if(response.status === 200){

                    // remove token and user items from local storage
                    window.localStorage.removeItem('user')
                    window.localStorage.removeItem('token')
                    window.location.href = '127.0.0.1:8000/'

                }
            })
            .catch( error => {
                alert(error.response)
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
            return (
                <ul className="navbar-nav bg-gradient-info sidebar sidebar-dark accordion col-md-2" id="accordionSidebar">
                    { this.renderError() }
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
                        <Link className="nav-link" to="/user-home">
                            <i className="fa fa-fw fa-home"></i>
                            <span>Home</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/categories" >
                            <i className="fa fa-book"></i>
                            <span>All categories</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/create-category" >
                            <i className="fa fa-plus-circle"></i>
                            <span>New categories</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/articles">
                            <i className="fa fa-fw fa-calendar-check-o"></i>
                            <span>All articles</span>
                        </Link>
                    </li>

                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/create-article">
                            <i className="fa fa-fw fa-plus-circle"></i>
                            <span>New article</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/popular-articles">
                            <i className="fa fa-fw fa-line-chart"></i>
                            <span>Popular articles</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/profile">
                            <i className="fa fa-fw fa-user"></i>
                            <span>
                                {
                                    window.localStorage.getItem('user') ? window.localStorage.getItem('user') : 'Guest'
                                }
                            </span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider" />

                    <li className="nav-item active">
                        <a className="nav-link" href="#" onClick= { this.logout }>
                            <i className="fa fa-fw fa-user"></i>
                            Logout
                        </a>
                    </li>

                    <hr className="sidebar-divider d-none d-md-block" />

                    {/* Sidebar Toggler (Sidebar)  */}
                    <div className="text-center d-none d-md-inline">
                        <button className="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>

                </ul>
            )
    }
}

export default Header
