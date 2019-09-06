
/**
 * @author Moriso
 * Create new articles from this component
 */

import React, { Component } from 'react'
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom'

class CreateArticle extends Component {

    constructor () {
        super()
        this.state = {
            title : '',
            meta_description : '',
            // image : '',
            website : '',
            author : null,
            category_id : '',
            errors : '',
            categories : []
        }

        this.saveInput = this.saveInput.bind(this)
        this.submitArticle = this.submitArticle.bind(this)
        this.renderError = this.renderError.bind(this)
        this.getHeaders = this.getHeaders.bind(this)

    }

    // get headers
    getHeaders(){
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
        return config
    }


    componentDidMount(){

        if(window.localStorage.getItem('user')){
            axios.get('/api/categories',this.getHeaders())
                .then( response => {

                    this.setState({
                        categories : response.data
                    })
                })
                .catch( error => {
                    this.setState({
                        errors : error.response.data.error
                    })
                })
        }
        else{
            this.setState({
                errors : 'You need to be logged in first'
            })
            return false
        }
    }

    // save input
    saveInput (event){

        this.setState({
            [event.target.name] : event.target.value,
        })
    }

    // submit article
    submitArticle (event) {
        event.preventDefault()



        const { history } = this.props
        const details = {
            title : this.state.title,
            meta_description : this.state.meta_description,
            // image : this.state.image,
            website : this.state.website,
            author : this.state.author,
            category_id : this.state.category_id,
        }

        axios.post('/api/articles',details,this.getHeaders())
            .then(response => {

                if(response.status === 200){
                    history.push('/articles')
                }
            })
            .catch( error => {
                this.setState({
                    errors : error.response.data.errors
                })
            })
    }

    // display errors
    renderError(){
        if(this.state.errors ){
        const errors = this.state.errors
        return (
            <div className='alert alert-danger col-md-4 offset-md-4'>
                <em> { JSON.stringify(errors) } </em>
            </div>

        )
        }
    }


    render() {
        if(window.localStorage.getItem('user')){
            const { categories } = this.state
            return (
                <div className="row">
                    <Header />
                    <div className="col-md-10">
                        { this.renderError() }
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/user-home">User</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Create articles</li>
                            </ol>
                        </nav>
                        <Link to="/create-category" className="btn btn-outline-danger col-md-2">
                            New category
                        </Link>
                        <form onSubmit={ this.submitArticle } encType="multipart/form-data" className="col-md-6 offset-md-3 card">
                            <div className="form-group col-md-6 offset-md-3">
                                <label htmlFor="category_id">Category:</label>
                                <select name="category_id" onChange= { this.saveInput } className="form-control" required>
                                    <option value="">----</option>
                                    {
                                        categories.map(category => (
                                            <option value= { category.id } key={category.id}>{ category.type }</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-group col-md-8 offset-md-2">
                                <label htmlFor="title">Title:</label>
                                <input type="text" name="title" placeholder="title"
                                    onChange= { this.saveInput } className="form-control" required />
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-8 offset-md-2">
                                    <label htmlFor="meta_description">Description:</label>
                                    <textarea name="meta_description" className="form-control"
                                        onChange= { this.saveInput } placeholder="short description">

                                    </textarea>
                                </div>
                                {/* <div className="form-group">
                                    <label htmlFor="image">Image:</label>
                                    <input type="file" name="image" onChange= { this.saveInput } className="form-control"/>
                                </div> */}
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="website">Website url:</label>
                                    <input type="url" name="website" className="form-control"
                                        onChange= { this.saveInput } placeholder="https://example.com" required />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="author">Author:</label>
                                    <input type="text" name="author" onChange= { this.saveInput } className="form-control" />
                                </div>
                            </div>
                            <button className="btn btn-outline-info bg-gradient-info text-white col-md-4 offset-md-4" type="submit">
                                <i className="fa fa-plus-circle"></i>
                                Create article
                            </button>
                        </form>
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

export default CreateArticle
