import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios2 from '../../../axiosInstance';

class blogPart extends Component {

    deleteHandler = () => {
        console.log('Delete initialized on ' + this.props.blogid);
        axios2.get('/blog/' + this.props.blogid +'/delete')
            .then(response => {
                console.log('Got a response');
                // this.props.history.push('/getmyblogs');
                this.props.deleted(this.props.blogid);
                console.log(response)
            })
            .catch(err => {
                console.log('got an error');
                console.log(err);
            })
    }

    render() {
        return (
            <div className="col-md-6 col-sm-12 col-12">
                <div className="card rutuj2">
                    <div className="rutuj3">
                        <img className="imgresize border rounded border-0" src={this.props.blog? this.props.blog.image: "https://image.shutterstock.com/image-photo/welsh-pony-running-standing-high-260nw-1175510683.jpg"} alt="Card image cap" />
                    </div>
                    <div className="card-body">
                        <h5 class="card-title">
                            {this.props.blog.title}
                        </h5>
                        <p class="card-text">
                            description.....
                        </p>
                        <Link to={"/blog/" + this.props.blog._id} className="btn">Read More</Link>
                        <button onClick={this.deleteHandler} className="btn-danger mybtn">Delete</button>
                        <Link to={"/blog/" + this.props.blog._id + "/edit"} className="btn-warning mybtn">Edit</Link>
                    </div>
                </div> 
            </div>
        );
    }
}

export default blogPart;