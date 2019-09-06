
/**
 * @author Moriso
 * the component will display all components from all users of the App
 */

import React, { Component } from 'react'
import axios from 'axios'
import { Link  } from 'react-router-dom'
import Header from './Header';

class Categories extends Component{

    constructor () {
        super()
        this.state = {
            categories : []
        }
    }

    // to run when component loads
    componentDidMount () {
        axios.get('/api/all-categories').then( response => {

            this.setState({
                categories : response.data
            })
        })
    }

    render () {
        const { categories } = this.state
        return (
            <div className="row" id="wrapper">
                <Header />
                <table className="table table-hovered table-striped col-md-10">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category type</th>
                            <th>Category description</th>
                            <th>No. of articles</th>
                            <th>Action <i className="fa fa-cogs"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(category => (
                                <tr key={ category.id }>
                                    <td> { category.id } </td>                                    <td> { category.type } </td>
                                    <td> { category.description } </td>
                                    <td> { category.articles_count }</td>
                                    <td>
                                        <Link to={`/api/all-articles/${ category.id } `} key ={ category.id } className="badge badge-pill badge-success">
                                            View articles
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Categories
