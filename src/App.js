import React,{Component} from 'react';
import Home from './containers/home/home';
import Layout from './hoc/Layout/Layout';
import Blog from './containers/blog/blog';
import BlogForm from './containers/blogForm/blogForm';
import EditBlog from './containers/EditBlog/EditBlog';
import CatPage from './containers/catPage/catPage';
import MyBlogs from './containers/MyBlogs/MyBlogs';
import {Route,Switch,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import SearchRes from './containers/SearchResults/SearchResults';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout';
import * as actions from './store/actions/index';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
    console.log('is user authenticated');
    console.log(this.props.userAuthenticated);
    console.log("mounted");
  }

  render() {
    return (
      // <div>
      //   <div>
      //     <div></div>
      //     <div></div>
      //   </div>
      // </div>
      // <button type="button" className="btn btn-danger">Primary</button>
      <Layout>
        <Switch>
            <Route path='/home' component={Home} />
            <Route path='/create-blog' component={BlogForm} />
            <Route path='/getmyblogs' component={MyBlogs} />
            <Route path='/auth' component={Auth} />
            <Route path='/logout' component={Logout} />
            <Route exact path='/search/:id' component={SearchRes} />
            <Route exact path='/blog/:id' exact component={Blog} />
            <Route exact path='/blog/:id/edit' exact component={EditBlog} />
            <Route exact path='/blogs/category/:id' component={CatPage} />
            <Redirect to='/home' />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    userAuthenticated: state.auth.userId !== null,
    username: state.auth.username,
    userId: state.auth.userId,
    usernameSent: state.auth.usernameSent,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetUsernameSent: () => dispatch(actions.setUsernameSent()),
    onTryAutoSignup: () => dispatch(actions.checkAuthState()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
