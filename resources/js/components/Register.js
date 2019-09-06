
/**
 * @author Moriso
 * @description Component used to register new users into the system
 */

import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Header from './Header';

class Register extends Component{

    constructor () {
        super()
        this.state = {
            name : '',
            email : '',
            password : '',
            password_confirmation : '',
            errors :[],
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.valueChanged = this.valueChanged.bind(this)
        this.hasErrorFor = this.hasErrorFor.bind(this)
        this.renderError = this.renderError.bind(this)


    }

        // save field value to state
        valueChanged (event) {

            this.setState({
                [event.target.name] : event.target.value
            })
        }


    // handle onSubmit
    handleSubmit (event) {
        event.preventDefault()

        const { history } = this.props
        // information to be sent to laravel backend for processing
        const  user  = {
            name : this.state.name,
            email : this.state.email,
            password : this.state.password,
            password_confirmation : this.state.password_confirmation,
        }

        const { headers } = {
            'Content-Type': 'application/json',
            'X-Requested-With' : 'XMLHttpRequest',
        }
        // send data to laravel backend
        axios.post('/api/register',user)
            .then( response => {
                // redirect to the homepage
                history.push('/')
            })
            .catch(error => {

                this.setState({
                    errors : error.response.data.errors,
                })
            })

    }


    hasErrorFor (field) {
        return !!this.state.errors[field]
      }

    // display errors
    renderError(){
        for (var key in this.state.errors) {
            if (this.state.errors.hasOwnProperty(key)) {
                return (
                    <div className='alert alert-danger alert-dismissible'>
                        <a href="#" data-dismiss="alert" className="close">&times;</a>
                    <em> { this.state.errors[key] } </em>
                    </div>

                )
            }
        }
    }


    render () {
        return (
            <div className="row">
                <Header />
                <div className="col-md-10">

                        { this.renderError() }

                    <div className="col-md-6 offset-md-3 mt-5">
                        <div className="card">
                            <div className="card-header text-center text-white bg-gradient-info">
                                Register
                            </div>
                            <div className="card-body">
                                <form onSubmit = { this.handleSubmit } novalidate>
                                    <div className="form-group col-md-8 offset-md-2">
                                        <label htmlFor="name">Name:</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-user"></i>
                                                </span>
                                            </div>
                                            <input type="text" name="name" className="form-control"
                                                placeholder="Your name" onChange ={ this.valueChanged }
                                                aria-label="Username" aria-describedby="basic-addon1"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-8 offset-md-2">
                                        <label htmlFor="email">Email address:</label>
                                        <input type="email" name="email" className="form-control"
                                            placeholder="youremail@example.com" required onChange ={ this.valueChanged }/>
                                                  <div class="valid-feedback">
                                                        Looks good!
                                                    </div>
                                        {/* {this.renderError('email')} */}
                                    </div>
                                    <div className="form-group col-md-8 offset-md-2">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name="password" className="form-control" required
                                            onChange ={ this.valueChanged }/>
                                        {/* {this.renderError('password')} */}
                                    </div>
                                    <div className="form-group col-md-8 offset-md-2">
                                        <label htmlFor="confirm_password">Confirm password:</label>
                                        <input type="password" name="password_confirmation" className="form-control"
                                            required onChange ={ this.valueChanged }/>
                                    </div>
                                    <button type="submit" className="btn btn-outline-success col-md-4 offset-md-4">
                                        Register
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
