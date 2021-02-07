import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {connect} from 'react-redux';
import {Navbar,Nav, NavDropdown, Form, FormControl, Button, NavItem} from 'react-bootstrap';

class Layout extends Component {
    state ={
        redirectStatus: false,
        redirectSearchTerm: ""
    }
    
    searchHandler = (event) => {
        event.preventDefault();
        this.setState({redirectSearchTerm: ""});
    }

    searchChangeHandler = (event) => {
        this.setState({redirectSearchTerm: event.target.value});
    }

    clickHandler = () => {
        this.setState({redirectSearchTerm: ""});
    }

    render() {
        let optionalContent = (
            <Nav.Link as={Link} to="/auth">Sign Up</Nav.Link>
        )
        let optionalContent2 = null;
        if(this.props.userId !== null) {
            optionalContent = (
                <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
            )
            optionalContent2 = (
                <Nav.Link as={Link} to="/getmyblogs">My Blogs</Nav.Link>
            )
        }
        return (
            // <div>
            //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
            //         <a className="navbar-brand" href="#">Navbar</a>
            //         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            //             <span className="navbar-toggler-icon"></span>
            //         </button>

            //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
            //             <ul className="navbar-nav mr-auto">
            //             <li className="nav-item active">
            //                 <a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            //             </li>
            //             <li className="nav-item">
            //                 <a className="nav-link" href="#">Link</a>
            //             </li>
            //             <li className="nav-item dropdown">
            //                 <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            //                 Dropdown
            //                 </a>
            //                 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            //                 <a className="dropdown-item" href="#">Action</a>
            //                 <a className="dropdown-item" href="#">Another action</a>
            //                 <div className="dropdown-divider"></div>
            //                 <a className="dropdown-item" href="#">Something else here</a>
            //                 </div>
            //             </li>
            //             <li className="nav-item">
            //                 <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
            //             </li>
            //             </ul>
            //             <form className="form-inline my-2 my-lg-0">
            //             <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            //             <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            //             </form>
            //         </div>
            //         </nav>
            //         {this.props.children}
            // </div>


            
            <div>
                <Navbar bg="dark" variant="dark" fixed="top" expand="md">
                    <Navbar.Brand >BlogApp</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create-blog">Create Blog</Nav.Link>
                        <NavDropdown title="By Category" eventKey={3} id="basic-nav-dropdown">
                            <LinkContainer to="/blogs/category/Science">
                                <NavItem id='dropwala'>Science</NavItem>    
                            </LinkContainer>
                            <LinkContainer to="/blogs/category/Technology">
                                <NavItem id='dropwala'>Technology</NavItem>    
                            </LinkContainer>
                            <LinkContainer to="/blogs/category/Politics">
                                <NavItem id='dropwala'>Politics</NavItem>    
                            </LinkContainer>     
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                        {optionalContent2}
                        {optionalContent}
                        </Nav>
                        {/* <Form onSubmit inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                        </Form> */}
                        <form onSubmit={this.searchHandler} className="form-inline my-2 my-lg-0">
                         <input onChange={this.searchChangeHandler} value={this.state.redirectSearchTerm} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                         <Link to={"/search/" + this.state.redirectSearchTerm} onClick={this.clickHandler} ><button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button></Link>
                         </form>
                    </Navbar.Collapse>
                </Navbar>
                {this.props.children}
            </div>
        );
    };
};

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    }
}


export default connect(mapStateToProps)(Layout);