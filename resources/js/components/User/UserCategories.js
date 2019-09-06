
/**
 * @author Moriso
 * This component contains all categories for the user who is currently logged in
 */

import React, { Component } from 'react'
import axios from 'axios'
import { Link  } from 'react-router-dom'
import Header from './Header';

class UserCategories extends Component{

    constructor () {
        super()
        this.state = {
            categories : [],
            errors:'',
        }

        this.renderError = this.renderError.bind(this)
    }

    componentDidMount () {

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

        // send request to  the API to fetch categories
        axios.get('/api/categories',config)
            .then( response => {

                this.setState({
                    categories : response.data
                })
            }).catch(error => {
                this.setState({
                    errors: error.response.data
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
                        <div className='alert alert-danger'>
                            <em> { errors[key] } </em>
                        </div>

                    )
                }
            }
        }
    }

    render () {
        if(window.localStorage.getItem('user')){
            const { categories } = this.state
            return (
                <div className="row" id="wrapper">
                    <Header />
                    <div className="col-md-10">
                        { this.renderError() }
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/user-home">User</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Categories</li>
                            </ol>
                        </nav>
                        <div className="col-md-10 offset-md-1">
                                {
                                categories.map(category => (
                                    <div key={ category.id } className="card mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">{ category.type }</h5>
                                            <p className="lead">
                                                { category.description }
                                            </p>
                                        </div>
                                        <div className="card-footer">
                                            <Link to={`/category-articles/${ category.id } `} className="btn btn-outline-success btn-sm mr-4">
                                                <i className="fa fa-eye"></i>
                                                Articles
                                                <span className="badge badge-pill badge-dark ml-3">
                                                    { category.articles_count }
                                                </span>
                                            </Link>
                                            <Link to="" className="btn btn-outline-warning btn-sm mr-4">
                                                <i className="fa fa-pencil"></i>
                                                &nbsp;Edit
                                            </Link>
                                            <Link to="#" className="btn btn-outline-danger btn-sm">
                                                <i className="fa fa-trash"></i>
                                                    &nbsp;Delete
                                            </Link>
                                        </div>
                                    </div>
                                ))
                                }
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return (
                <div className="row">
                    <Header />
                    <div className="col-md-10 alert mt-5 text-center text-danger lead">
                        <i className="fa fa-warning fa-4x"></i> <br />
                        Sorry! You don't have access to this page<br/>
                        Please <Link to="/login">login here</Link>
                    </div>
                </div>
            )
        }
    }
}

export default UserCategories
