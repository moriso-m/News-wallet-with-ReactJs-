import React, { Component } from 'react'
import Header from './Header';
import axios from 'axios';
import { Link } from 'react-router-dom'

class CreateCategory extends Component {

    constructor () {
        super()
        this.state = {
            type : '',
            description : '',
            errors : '',
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
            type : this.state.type,
            description : this.state.description,
        }

        axios.post('/api/categories',details,this.getHeaders())
            .then(response => {

                if(response.status === 200){
                    history.push('/categories')
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
            return (
                <div className="row">
                    <Header />
                    <div className="col-md-10 ">
                        { this.renderError() }
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="/user-home">User</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Create category</li>
                            </ol>
                        </nav>
                        <form onSubmit={ this.submitArticle } encType="multipart/form-data" className="col-md-6 offset-md-3 card">
                            <div className="form-group col-md-8 offset-md-2">
                                <label htmlFor="type">Type of category:</label>
                                <input type="text" name="type" placeholder="eg. politics,code, ..."
                                    onChange= { this.saveInput } className="form-control" required />
                            </div>
                            <div className="form-group col-md-8 offset-md-2">
                                <label htmlFor="description">Description:</label>
                                <textarea name="description" className="form-control"
                                    onChange= { this.saveInput } placeholder="short description">

                                </textarea>
                            </div>
                            <button className="btn btn-outline-info bg-gradient-info text-white col-md-4 offset-md-4" type="submit">
                                <i className="fa fa-plus-circle"></i>
                                Create category
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

export default CreateCategory
