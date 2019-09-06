import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Categories from './Categories';
import Articles from './AllArticles';
import Register from './Register';
import Login from './Login';
import UserCategories from './User/UserCategories';
import UserHome from './User/UserHome';
import UserArticles from './User/UserArticles';
import CreateArticle from './User/CreateArticle';
import CreateCategory from './User/CreateCategory';
import CategoryArticles from './User/CategoryArticles';
import Article from './User/Article';
import PopularArticles from './User/PopularArticles';


export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path='/' component= { Home }/>
                        <Route path='/all-categories' component= { Categories } />
                        <Route path='/all-articles' component= { Articles } />
                        <Route path='/article/:id' component= { Article } />
                        <Route path='/categories' component = { UserCategories } />
                        <Route path='/create-category' component={ CreateCategory } />
                        <Route path='/category-articles/:id' component= { CategoryArticles } />
                        <Route path='/articles' component= { UserArticles} />
                        <Route path='/create-article' component= { CreateArticle } />
                        <Route path='/popular-articles' component= { PopularArticles } />
                        <Route path='/user-home' component= { UserHome } />
                        <Route path='/register' component= { Register } />
                        <Route path='/login' component= { Login } />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}


    ReactDOM.render(<App />, document.getElementById('app'));

