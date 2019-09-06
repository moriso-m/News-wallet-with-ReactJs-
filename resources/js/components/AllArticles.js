import React, { Component } from 'react'
import axios from 'axios'
import { Link  } from 'react-router-dom'
import Header from './Header';

class Articles extends Component{

    constructor () {
        super()
        this.state = {
            articles : []
        }
    }

    componentDidMount () {
        axios.get('/api/all-articles').then( response => {

            this.setState({
                articles : response.data
            })
        })
    }

    render () {
        const { articles } = this.state
        return (
            <div className="row" id="wrapper">
                <Header />
                <table className="table table-hovered table-striped col-md-9">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Article category</th>
                            <th>Article title</th>
                            <th>Website</th>
                            <th>Action <i className="fa fa-cogs"></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            articles.map(article => (
                                <tr key={ article.id }>
                                    <td>{ article.id }</td>
                                    <td>{ article.category.type }</td>
                                    <td> { article.title } </td>
                                    <td>
                                        <a href={ article.website }>{ article.website }</a>
                                    </td>
                                    <td>
                                        <Link to="/article" key ={ article.id } className="btn btn-outline-success btn-sm">
                                            <i className="fa fa-eye"></i>&nbsp;
                                            Details
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

export default Articles
