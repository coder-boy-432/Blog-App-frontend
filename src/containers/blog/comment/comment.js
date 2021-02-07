import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import axios2 from '../../../axiosInstance';
import './comment.css';

class Comment extends Component {
    state={
        likes: 0,
        dislikes: 0,
        ldFetchSuccess: false,
        ldFetchFailed: false
    }

    componentDidMount() {
        this.setState({likes: this.props.likes, dislikes: this.props.dislikes});
    }

    commentLikeHandler = () => {
        console.log('liked ....');
        axios2.get('/comment/like/' + this.props.commentId)
            .then(response => {
                console.log('Got a respnse');
                console.log(response);
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        likes: prevState.likes + 1
                    }
                });
                // this.setState((prevState) => {
                //     let newBlog = {...prevState.blog};
                //     newBlog.dislikes = prevState.blog.dislikes + 1
                //     return {
                //         ...prevState,
                //         blog: newBlog
                //     }
                // })
            })
            .catch(error => {
                console.log('got an error');
                console.log(error);
            });
    }

    commentDislikeHandler = () => {
        console.log("disliked....");
        axios2.get('/comment/dislike/' + this.props.commentId)
            .then(response => {
                console.log('Got a respnse');
                console.log(response);
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        dislikes: prevState.dislikes + 1
                    }
                });
                // this.setState((prevState) => {
                //     let newBlog = {...prevState.blog};
                //     newBlog.dislikes = prevState.blog.dislikes + 1
                //     return {
                //         ...prevState,
                //         blog: newBlog
                //     }
                // })
            })
            .catch(error => {
                console.log('got an error');
                console.log(error);
            });
    }
    render() {
        let likedislike = null;
        if(this.props.id) {
            likedislike = (
                <div>
                    <span>{this.state.likes}</span>
                <button onClick={this.commentLikeHandler} className='Success Button'>
                    Like
                </button>
                <span>{this.state.dislikes}</span>
                <button onClick={this.commentDislikeHandler}  className='Danger Button'>
                    Disike
                </button>
                </div>
            );   
        }
        return (
            <div className="col-md-12">
                <strong>{this.props.name}</strong>
                {/* <span className="pull-right">10 days ago</span> */}
                {likedislike}
                <p>
                    {this.props.content}
                </p>
                <hr/>
            </div>
        );
    }
};

export default Comment;