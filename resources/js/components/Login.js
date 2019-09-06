
/**
 * @author Moriso
 * @description Users of the system will utilize this login component when login into the news wallet app
 */

import React, { Component } from 'react'
import Header from './Header';

class Login extends Component {

    constructor () {
        super()
        this.state = {
            email : '',
            password : '',
            errors :'',
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.valueChanged = this.valueChanged.bind(this)
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
            email : this.state.email,
            password : this.state.password,
        }

        const { headers } = {
            'Content-Type': 'application/json',
            'X-Requested-With' : 'XMLHttpRequest',
        }
        // send data to laravel backend
        axios.post('/api/login',user)
            .then( response => {
                let token = response.data.token
                let user = response.data.user
                if( response.status === 200){

                    // store access token and user info in local storage
                    window.localStorage.setItem('token', token)
                    window.localStorage.setItem('user', user)
                     // redirect to the homepage
                    history.push('/user-home')

                }

            })
            .catch(error => {
                this.setState({
                    errors : error.response.data.error,
                })
            })

    }

    // display errors
    renderError(){
        if(this.state.errors){
            return (
                <div className='alert alert-danger'>
                <em> { this.state.errors } </em>
                </div>

            )
        }
    }


    render() {
        return (
            <div className="row">
                <Header />
                <div className="col-md-10">

                    <div className="col-md-6 offset-md-3 mt-5">
                        <div className="card">
                            <div className="card-header text-center text-white bg-gradient-info">
                                <i className="fa fa-lock"></i>
                                Login
                            </div>
                            <div className="card-body">
                                { this.renderError() }
                                <form onSubmit = { this.handleSubmit }>
                                    <div className="form-group col-md-8 offset-md-2">
                                        <label htmlFor="name">Email address:</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-envelope"></i>
                                                </span>
                                            </div>
                                            <input type="email" name="email" className="form-control"
                                               placeholder="youremail@example.com" onChange ={ this.valueChanged }
                                                aria-label="email" aria-describedby="basic-addon1" required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group col-md-8 offset-md-2">
                                        <label htmlFor="password">Password</label>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1">
                                                    <i className="fa fa-lock"></i>
                                                </span>
                                            </div>
                                            <input type="password" name="password" className="form-control"
                                               placeholder="password" onChange ={ this.valueChanged }
                                                aria-label="password" aria-describedby="basic-addon1" required
                                            />
                                        </div>
                                        {/* {this.renderError('password')} */}
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

export default Login
