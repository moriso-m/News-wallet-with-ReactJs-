import React, { Component } from 'react'
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Article extends Component {

    constructor(){
        super()

        this.state ={
            article : [],
            errors : [],
        }

        this.renderError = this.renderError.bind(this)
    }

    componentDidMount () {

        // get article id passed from Route
        const { id } = this.props.match.params
        // get access token from local storage
        let token = ''
        if(window.localStorage.getItem('token')){
            token  = window.localStorage.getItem('token')
        }
        // set headers
        let config ={
            headers : {
                'Content-Type' : 'application/json',
                'X-Requested-With' : 'XMLHttpRequest',
                'Authorization' : 'Bearer '+ token
            }
        };
        // get articles from API
        axios.get('/api/articles/'+id, config)
            .then(response => {

                if(response.status === 200){

                    this.setState({
                        article : response.data
                    })
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

        const { article } = this.state
        return (
            <div className="row">
                <Header />
                <div className="col-md-10">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/user-home">User</Link></li>
                            <li className="breadcrumb-item"><Link to="/articles">My articles</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Article</li>
                        </ol>
                    </nav>
                    { this.renderError() }
                    <Link to="/create-article" className="btn btn-outline-danger mb-3">
                        New article
                    </Link>
                    {
                    <div className="col-md-10 offset-md-1">
                        <div className="card border-info mb-3" key={article.id}>
                            {/* <div className="card-header alert-info">
                                <h5 className="text-center">
                                    { article.title }
                                </h5>
                            </div> */}
                            <div className="card-body">
                                <h5 className=" card-title text-center">
                                    { article.title }
                                </h5>
                                <em className="text-muted">Author: { article.author }</em><br />
                                <p className="lead">
                                    { article['meta-description'] }
                                </p>
                                <span className="badge badge-pill badge-dark">Website:</span>
                                <a href={ article.website } target="blank" className="card-link mr-4">
                                    { article.website }
                                </a>
                                <span className="badge badge-dark">
                                    Views &nbsp;
                                    <span className="badge badge-pill badge-light">
                                        { article.views }
                                    </span>
                                </span>
                            </div>
                            <div className="card-footer">
                                <button type="button" className="btn btn-warning mr-4">
                                    <i className="fa fa-pencil"></i> Edit
                                </button>
                                <button type="button" className="btn btn-outline-danger">
                                    <i className="fa fa-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        )
    }
}

export default Article
