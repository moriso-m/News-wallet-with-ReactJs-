import React, { Component } from 'react'
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom'

class CategoryArticles extends Component {

    constructor(){
        super()

        this.state ={
            articles : [],
            errors : [],
        }

        this.renderError = this.renderError.bind(this)
    }

    componentDidMount () {

        // get category id passed from the  router link
        const { id } = this.props.match.params
        console.log(id)
        // get access token from local storage
        let token = ''
        if(window.localStorage.getItem('token')){
            token  = window.localStorage.getItem('token')

            // set headers
            let config ={
                headers : {
                    'Content-Type' : 'application/json',
                    'X-Requested-With' : 'XMLHttpRequest',
                    'Authorization' : 'Bearer '+ token
                }
            };
            // get articles from API
            axios.get('/api/category-articles/'+id, config)
                .then(response => {

                    if(response.status === 200){

                        this.setState({
                            articles : response.data
                        })
                    }
                })
                .catch( error => {
                    this.setState({
                        errors : error.response.data
                    })
                })
        }
        else{
            this.setState({
                errors : 'Please login to access your articles'
            })
        }
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
        if(window.localStorage.getItem('user')){
        const { articles } = this.state
        return (
            <div className="row">
                <Header />
                <div className="col-md-10">

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/user-home">User</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Articles</li>
                        </ol>
                    </nav>
                    { this.renderError() }
                    <table className="table table-hovered table-striped table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th>Title</th>
                                <th>Website</th>
                                <th>Views</th>
                                <th>Actions <i className="fa fa-cog"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            { articles.map(article => (
                                <tr key={article.id}>
                                    <td >{ article.title }</td>
                                    <td>
                                        <a href={ article.website } target="blank">
                                        { article.website }
                                        </a>
                                    </td>
                                    <td>{ article.views }</td>
                                    <td>
                                        <Link to={`/article/${ article.id }`} className="btn btn-outline-success btn-sm mr-4 mb-2">
                                            More details&nbsp;
                                            <i className="fa fa-angle-double-right"></i>
                                        </Link>
                                        <Link to={`/articles/${ article.id }`} className="btn btn-warning btn-sm mr-4 mb-2">
                                            <i className="fa fa-pencil"></i> Edit
                                        </Link>
                                        <button type="button" className="btn btn-outline-danger btn-sm">
                                            <i className="fa fa-trash"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default CategoryArticles
