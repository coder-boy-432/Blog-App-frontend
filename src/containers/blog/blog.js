import React, { Component } from 'react';
// import {Container, Row, Col, Card, Button} from 'react-bootstrap';
import Comment from './comment/comment';
import Comments from './comments/comments';
import Spinner from '../../components/UI/Spinner/Spinner';
import Like from '../../components/UI/plus/plus';
import Dislike from '../../components/UI/Search/search';
import axios from '../../noAuthaxios';
import axios2 from '../../axiosInstance';
import {connect} from 'react-redux';
import classes from './blog.module.css';

class Blog extends Component {
    state = {
        blog: null,
        loading: false,
        blogFetchSuccess: false,
        blogFetchFailed: false,
        comment: ""
    }

    formSubmitHandler = (event) => {
        event.preventDefault();
        const commentBody = {
            content: this.state.comment
        }
        console.log(this.state.comment);
        axios2.post('/blog/' + this.state.blog._id + "/addcomment",commentBody)
            .then(response => {
                console.log("got a comments response");
                console.log(response);
                this.setState({comment: ""});
                // this.setState(prevState => {
                //     let cList = [...prevState.comments];
                //     return{
                //         ...prevState,
                //         comments: cList.concat(response.data)
                //     }
                // })
                this.setState((prevState) => {
                    return {
                        ...prevState,
                        comments : [...(prevState.commentsList || []), response.data]
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

    blogLikeHandler = () => {
        if(this.props.token && this.state.blogFetchSuccess) {
            axios2.get('/like/' + this.state.blog._id)
            .then(response => {
                console.log('Got a respnse');
                console.log(response);
                this.setState((prevState) => {
                    let newBlog = {...prevState.blog};
                    newBlog.likes = prevState.blog.likes + 1;
                    return {
                        ...prevState,
                        blog: newBlog
                    }
                })
            })
            .catch(error => {
                console.log('got an error');
                console.log(error);
            });
        }
    }

    blogDislikeHandler = () => {
        if(this.props.token && this.state.blogFetchSuccess) {
            axios2.get('/dislike/' + this.state.blog._id)
            .then(response => {
                console.log('Got a respnse');
                console.log(response);
                this.setState((prevState) => {
                    let newBlog = {...prevState.blog};
                    newBlog.dislikes = prevState.blog.dislikes + 1
                    return {
                        ...prevState,
                        blog: newBlog
                    }
                })
            })
            .catch(error => {
                console.log('got an error');
                console.log(error);
            });
        }
    }

    

    componentDidMount() {
        console.log(this.props.match.params.id);
        console.log('fetching......');
        this.setState({loading: true});

        // if(!this.state.commentsListSuccess && !this.state.commentsListFailed) {
        //     axios.get('http://localhost:5000/blog/' + this.props.match.params.id + "/comments")
        //         .then(response => {       
        //             console.log('got a response...')
        //             console.log(response.data);
        //             this.setState({commentsListLoading: false,commentsListSuccess: true,commentsList: response.data});
        //         })
        //         .catch(error => {
        //             console.log('got an error');
        //             console.log(error);
        //             this.setState({commentsListLoading: false,commentsListFailed: true});
        //         });
        // }

        if(!this.state.blogFetchFailed && !this.state.blogFetchSuccess){
            axios.get('/blog/' + this.props.match.params.id)
            .then(response => {       
                console.log('got a response...')
                console.log(response.data);
                this.setState({loading: false,blogFetchSuccess: true,blog: response.data});
            })
            .catch(error => {
                console.log('got an error');
                console.log(error);
                this.setState({loading: false,blogFetchFailed: true});
            });
        }
    }
    render() {
        let likedislike = null;
        if(this.state.blogFetchSuccess) {
            likedislike = (
                <div className="likedislikes">
                    <span>{this.state.blog.likes}</span>
                    <div onClick={this.blogLikeHandler} className="searchIcon">
                        <Like />
                    </div>

                    <span>{this.state.blog.dislikes}</span>
                    <div onClick={this.blogDislikeHandler} className="searchIcon">
                        <Dislike />
                    </div>

                </div>
            );   
        }
        let blogContent = null;
        if(this.state.loading) {
            blogContent = (
                <div id="scrollbox" className="col-md-9 scrollbox"><Spinner /></div>
            )
        }
        if(this.state.blogFetchSuccess) {
            blogContent = (
                <div id="scrollbox" className="col-md-9 scrollbox">
                    
                <div id="padding" className="container">
                    <div className="card rutuj2 border rounded border-0">
                        <div className="artic-image">
                            <img src={this.state.blog.image} className="imgresize border rounded border-0" alt="Responsive image" />
                        </div>
                        <div className="card-body">
                            <h4 className="card-title">
                                {this.state.blog.title} 
                            </h4>
                            <h5 className="card-text">
                                {this.state.blog.author} <a className="btn btn-dark rounded-pill border-0" href="#">  {this.state.blog.category} </a>
                            </h5>
                            <p className="card-text text-muted">
                                article.publishedAt
                            </p>
                            <div className="card-text">
                                <div dangerouslySetInnerHTML={{__html: this.state.blog.content}} />
                                Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book. It usually begins with:

                                “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
                                The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content.

                                The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
                            </div>
                            <div>
                                {/* <form action="/archives" method="POST">
                                    <input type="text" className="form-control d-none" id="exampleInputEmail1" aria-describedby="emailHelp" name="articleID" value=" article._id "/>
                                    <button type="submit" className="btn btn-warning rounded border-0">
                                        Archive article
                                    </button>
                                </form> */}
                                {likedislike}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container commentbox">
                    <Comments id={this.props.match.params.id} userId={this.props.userId} />
                </div>

                </div>
            );
        }
        return (
            <div id= "upmost" className="row">
                
                {blogContent}
                <div  className="col-md-3 sidebox container">
		
                    <div className="bd-example">
                    <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                        <ol className="carousel-indicators">
                        <li data-target="#carouselExampleCaptions" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
                        <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner rutuj2  border rounded border-0">
                            <a href="/<%= articles[0].category %>/<%= articles[0]._id %>">
                        <div className="carousel-item active car">
                            <img src={this.state.blog === null ? "" :this.state.blog.image} href="/<%= articles[0].category %>/<%= articles[0]._id %>" className="d-block w-100 imgresize" alt="..."/>
                            <div class="carousel-caption d-none d-md-block">
                            <h5> articles[0].category </h5>
                            <p> articles[0].title.substring(0,75)</p>
                            </div>
                        </div>
                        </a>
                            
                            <a href="/<%= articles[1].category %>/<%= articles[1]._id %>">
                        <div classNameName="carousel-item car">
                            <img src="https://fei-fan-production.s3.amazonaws.com/s3fs-public/styles/full_page_image/public/hearing-0303-8.jpg?itok=yV1pksWi" href="/<%= articles[1].category %>/<%= articles[1]._id %>" className="d-block w-100 imgresize" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                            <h5>articles[1].category </h5>
                            <p>articles[1].title.substring(0,75)</p>
                            </div>
                        </div>
                        </a>
                            <a href="/<%= articles[2].category %>/<%= articles[2]._id %>">
                        <div class="carousel-item car">
                            <img src="https://fei-fan-production.s3.amazonaws.com/s3fs-public/styles/full_page_image/public/hearing-0303-8.jpg?itok=yV1pksWi" href="/<%= articles[2].category %>/<%= articles[2]._id %>" className="d-block w-100 imgresize" alt="..."/>
                            <div className="carousel-caption d-none d-md-block">
                            <h5> articles[2].category </h5>
                            <p> articles[2].title.substring(0,75)...</p>
                            </div>
                        </div>
                        </a>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                        </a>
                    </div>
                    </div>
                    
                    <div className="container card rutuj2" style={{backgroundColor: "#30394b"}}>
                        <h4 className="card-title" style={{textAlign: "center", paddingTop: "10px", color: "white"}}>
                            Share this on
                        </h4>
                        <div className="row">
                            <div className="col-md-6 text-center" style={{padding: "10px"}}>
                                <img className="my_icon rounded-circle" src="http://icons.iconarchive.com/icons/danleech/simple/256/facebook-icon.png"/>
                            </div>
                            <div className="col-md-6 text-center" style={{padding: "10px"}}>
                                <img className="my_icon rounded-circle" src="https://icon-library.net/images/instagram-icon/instagram-icon-14.jpg"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 text-center" style={{padding: "10px"}}>
                                <img className="my_icon rounded-circle" src="https://image.flaticon.com/icons/svg/124/124021.svg"/>
                            </div>
                            <div className="col-md-6 text-center" style={{padding: "10px"}}>
                                <img className="my_icon rounded-circle" src="https://cdn2.iconfinder.com/data/icons/social-icons-33/128/Google-512.png"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="container card rutuj2">
                        <h4 className="card-title newsletter" >
                            Subscribe to our newsletter
                        </h4>
                        <form>
                            <div className="form-group">
                                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="username" placeholder="Enter your Email address"/>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}


export default connect(mapStateToProps)(Blog);