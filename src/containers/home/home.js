import React, { Component } from 'react';
import BlogPart from './blogPart/blogPart';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../noAuthaxios';
// import {Container, Row, Col, Card, Button} from 'react-bootstrap';
// import cx from 'classnames'
// import'bootstrap/dist/css/bootstrap.min.css';
import classes from './home.module.css';

class Home extends Component {
    state = {
        loading: false,
        blogsList: [],
        blogsListSuccess: false,
        blogsListFailed: false
    }

    componentDidMount() {
        // if(!this.props.blogsFetched) {
        //     this.props.onFetchBlogs()
        // }
        this.setState({loading: true,blogsListSuccess: false,blogsListFailed: false});
        if(!this.state.blogsListFailed && !this.state.blogsListFailed) {
            axios.get('/blogsList')
            .then(response => {
                this.setState({blogsListSuccess: true, blogsList: response.data, loading: false})
            })
            .catch(error => {
                this.setState({blogsListFailed: true, loading: false})
            })
        }
    }

    componentDidUpdate() {
        // if(!this.props.blogsFetched && this.props.userId) {
        //     this.props.onFetchBlogs()
        // }
        // if(!this.state.blogsListFailed && !this.state.blogsListFailed) {
        //     this.setState({loading: true,blogsListSuccess: false,blogsListFailed: false});
        //     axios.get('/blogsList')
        //     .then(response => {
        //         this.setState({blogsListSuccess: true, blogsList: response.data, loading: false})
        //     })
        //     .catch(error => {
        //         this.setState({blogsListFailed: true, loading: false})
        //     })
        // }
    }

    render() {
        let content = null;
        // if(this.props.blogsFetched) {
        //     let blogslist = this.props.blogs;
        //     content = blogslist.map(blogNow => {
        //         console.log(blogNow);
        //         return (
        //             <BlogPart key={blogNow._id} blog={blogNow} />
        //         )
        //     });
        // }
        if(this.state.blogsListSuccess) {
            let blogslist = this.state.blogsList;
            content = blogslist.map(blogNow => {
                console.log(blogNow);
                return (
                    <BlogPart key={blogNow._id} blog={blogNow} />
                )
            });
        }
        return (
            <div className={classes.home}>
                <div className="container">
                    <div className="row">
                        {this.state.loading ? <Spinner/> : content}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId,
        blogs: state.blogs.blogsList,
        blogsFetched: state.blogs.blogsFetched,
        loading: state.blogs.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchBlogs: () => dispatch(actions.fetchBlogs())
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Home);