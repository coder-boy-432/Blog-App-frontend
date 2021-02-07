import React,{Component} from 'react';
import Comment from '../comment/comment';
import axios from '../../../noAuthaxios';
import axios2 from '../../../axiosInstance';
import Spinner from '../../../components/UI/Spinner/Spinner';

class Comments extends Component {

    state = {
        comment: "",
        commentsList: [],
        commentsListLoading: false,
        commentsListSuccess: false,
        commentsListFailed: false
    }

    componentDidMount() {
        this.setState({commentsListLoading: true});
        if(!this.state.commentsListSuccess && !this.state.commentsListFailed) {
            axios.get('/blog/' + this.props.id + "/comments")
                .then(response => {       
                    console.log('got a response...')
                    console.log(response.data);
                    this.setState({commentsListLoading: false,commentsListSuccess: true,commentsList: response.data});
                })
                .catch(error => {
                    console.log('got an error');
                    console.log(error);
                    this.setState({commentsListLoading: false,commentsListFailed: true});
                });
        }
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const commentBody = {
            content: this.state.comment
        }
        console.log(this.state.comment);
        axios2.post('/blog/' + this.props.id + "/addcomment",commentBody)
            .then(response => {
                console.log("got a comments response");
                console.log(response);
                // this.setState({comment: ""});

                // this.setState(prevState => {
                //     let cList = [...prevState.comments];
                //     return{
                //         ...prevState,
                //         comments: cList.concat(response.data)
                //     }
                // })
                this.setState((prevState) => {
                    let commentsBefore = [...(prevState.commentsList || [])]
                    return {
                        ...prevState,
                        commentsList : commentsBefore.concat(response.data),
                        comment: ""
                    }
                })
            })
            .catch(error => {
                console.log("got a comments error");
                console.log(error)
            })
    }

    commentChangeHandler = (event) => {
        this.setState({comment: event.target.value});
    }

    render() {
        let content = (
            <Spinner />
        )
        let commentsList = this.state.commentsList;
        if(this.state.commentsListSuccess){
            content = commentsList.map(commentNow => {
                return (
                    <Comment
                     content={commentNow.content}
                        name={commentNow.name} 
                        commentId={commentNow._id} 
                        id={this.props.id} 
                        likes={commentNow.likes}
                        dislikes={commentNow.dislikes}
                    />
                )
            });
        }
        let form = null;
        if(this.props.userId) {
            form = (
                <form id="expform" className="form-inline my-2 my-lg-0" onSubmit={this.formSubmitHandler}>
                <input onChange={this.commentChangeHandler} value={this.state.comment} className="form-control mr-sm-2" type="text" id="text" placeholder="Type something"/>
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Add new comment</button>
                </form>
            );
        }
        return (
            <div className="container">
                {form}
                <hr/>
                        {/* <div id="expadd" className="row">
                            
                            <Comment />
                            
                            <div className="col-md-12">
                                <strong>rutuj</strong>
                                <span className="pull-right">10 days ago</span>
                                <p>
                                    hi there i am a filler comment
                                </p>
                            </div>
                            <div className="col-md-12">
                                <strong>rutuj</strong>
                                <span className="pull-right">10 days ago</span>
                                <p>
                                    hi there i am a filler comment
                                </p>
                            </div>
                        </div> */}
                <div id="expadd" className="row">
                    {content}
                </div>
            </div>
        )
    }
};

export default Comments;