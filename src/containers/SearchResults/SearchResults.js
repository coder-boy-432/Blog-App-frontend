import React,{Component} from 'react';
import axios from '../../noAuthaxios';
import BlogPart from '../home/blogPart/blogPart';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './SearchResults.module.css';

class SearchResults extends Component {
    state = {
        loading: false,
        blogsList: [],
        blogsListSuccess: false,
        blogsListFailed: false
    }

    componentDidMount() {
        this.setState({loading: true,blogsListSuccess: false,blogsListFailed: false});
        if(!this.state.blogsListFailed && !this.state.blogsListFailed) {
            axios.get('/search/' + this.props.match.params.id )
            .then(response => {
                this.setState({blogsListSuccess: true, blogsList: response.data, loading: false})
            })
            .catch(error => {
                this.setState({blogsListFailed: true, loading: false})
            })
        }
    }

    componentDidUpdate(prevProps,prevState) {
        console.log("component updated");
        console.log("prev id is " + prevProps.match.params.id);
        console.log("curr id is " + this.props.match.params.id);
        if(prevProps.match.params.id !== this.props.match.params.id) {
            this.setState({loading: true});
            axios.get('/search/' + this.props.match.params.id )
            .then(response => {
                this.setState({blogsListSuccess: true, blogsList: response.data, loading: false})
            })
            .catch(error => {
                this.setState({blogsListFailed: true, loading: false})
            })
        }
        // this.setState((prevState) => {
        //     if(this.prevState.)
        // })
        console.log("loading: " + this.state.loading + " success: " + this.state.blogsListSuccess);
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
                console.log(blogNow);
                return (
                    <BlogPart key={blogNow._id} blog={blogNow} />
                )
            });
        }
        return (
            <div className={classes.home}>
                <div className="container" >
                    <div className="row heading">
                        <h1>Search Results are...</h1>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        {this.props.loading ? <Spinner/> : content}
                    </div>
                </div>
            </div>
        )
    }
}

export default SearchResults;