import React,{Component} from 'react';
import axios2 from '../../axiosInstance';
import BlogPart from './blogPart/blogPart';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './MyBlogs.module.css';

class CatPage extends Component {
    state = {
        loading: false,
        blogsList: [],
        blogsListSuccess: false,
        blogsListFailed: false
    }

    deleteHandler = (blogid) => {
        console.log('Delete over on ' + blogid);
        this.setState((prevState) => {
            let blogsListTemp = [...(prevState.blogsList || [])];
            return {
                ...prevState,
                blogsList: blogsListTemp.filter(blog => {
                    return blog._id !== blogid;
                })
            }
        });
    }

    componentDidMount() {
        this.setState({loading: true,blogsListSuccess: false,blogsListFailed: false});
        if(!this.state.blogsListFailed && !this.state.blogsListFailed) {
            axios2.get('/getmyblogs/' )
            .then(response => {
                this.setState({blogsListSuccess: true, blogsList: response.data, loading: false})
            })
            .catch(error => {
                this.setState({blogsListFailed: true, loading: false})
            })
        }
    }

    componentDidUpdate(prevProps,prevState) {
        // console.log("component updated");
        // console.log("prev id is " + prevProps.match.params.id);
        // console.log("curr id is " + this.props.match.params.id);
        // if(prevProps.match.params.id !== this.props.match.params.id) {
        //     this.setState({loading: true});
        //     axios.get('/blogsbycat/' + this.props.match.params.id )
        //     .then(response => {
        //         this.setState({blogsListSuccess: true, blogsList: response.data, loading: false})
        //     })
        //     .catch(error => {
        //         this.setState({blogsListFailed: true, loading: false})
        //     })
        // }
        // // this.setState((prevState) => {
        // //     if(this.prevState.)
        // // })
        // console.log("loading: " + this.state.loading + " success: " + this.state.blogsListSuccess);
    }

    // getSnapshotBeforeUpdate(prevProps,prevState) {
    //     if(prevProps.match.params.id)
    // }

    componentWillUnmount() {
        console.log('unmounted');
    }

    // componentDidUpdate() {
    //     this.setState({loading: true});
    //     if(!this.state.blogsListFailed && !this.state.blogsListFailed) {
    //         axios.get('/blogsbycat/' + this.props.match.params.id )
    //         .then(response => {
    //             this.setState({blogsListSuccess: true, blogsList: response.data, loading: false})
    //         })
    //         .catch(error => {
    //             this.setState({blogsListFailed: true, loading: false})
    //         })
    //     }
    // }

    render() {
        let content = null;
        if(this.state.blogsListSuccess) {
            let blogslist = this.state.blogsList;
            content = blogslist.map(blogNow => {
                console.log("Blog Now is ...");
                console.log(blogNow);
                return (
                    <BlogPart deleted={this.deleteHandler} key={blogNow._id} history={this.props.history} blogid={blogNow._id} blog={blogNow} />
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

export default CatPage;