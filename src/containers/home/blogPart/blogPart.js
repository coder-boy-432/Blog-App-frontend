import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class blogPart extends Component {
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
                    </div>
                </div>
            </div>
        );
    }
}

export default blogPart;