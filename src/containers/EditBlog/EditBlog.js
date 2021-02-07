import React,{Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/input/input';
import classes from './EditBlog.module.css';
import axios from '../../axiosInstance';
// import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            title: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Blog Title'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            image: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Image URL'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            blogContent: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Blog Content in form of HTML(mostly <p></p> tags)'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            category: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'Science',displayValue: 'Science'},
                        {value: 'Technology',displayValue: 'Technology'},
                        {value: 'Politics',displayValue: 'Politics'}
                    ]
                },
                value: 'Science',
                validation: {},
                valid: true
            }
        },
        formIsValid: false,
        loading: false,
        blog: null,
        blogloading: false,
        blogFetchSuccess: false,
        blogFetchFailed: false,
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        formData._id = this.state.blog._id;
        console.log('form ddddta i ....');
        console.log(formData);
        const url = '/blog/' + this.props.match.params.id + '/edit';
        axios.post(url,formData)
            .then(response => {
                console.log('Got a response');
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/getmyblogs');
            })
            .catch(err => {
                console.log(err);
            });
        // const order = {
        //     ingredients: this.props.ings,
        //     price: this.props.price,
        //     orderData: formData,
        //     userId: this.props.userId
        // }
        // this.props.onOrderBurger(order,this.props.token);
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        // console.log(updatedFormElement);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;

        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }

        this.setState({orderForm: updatedOrderForm,formIsValid: formIsValid});
    }

    componentDidMount() {
        console.log('fetching......');
        this.setState({blogloading: true});

        if(!this.state.blogFetchFailed && !this.state.blogFetchSuccess){
            axios.get('/blog/' + this.props.match.params.id)
            .then(response => {       
                console.log('got a response...')
                console.log(response.data);
                this.setState({blogloading: false,blogFetchSuccess: true,blog: response.data});
                this.setState((prevState) => {
                    let orderFormTemp = {...prevState.orderForm};
                    orderFormTemp.title.value = response.data.title;
                    orderFormTemp.title.valid = true;
                    orderFormTemp.image.value = response.data.image;
                    orderFormTemp.image.valid = true;
                    orderFormTemp.blogContent.value = response.data.content;
                    orderFormTemp.blogContent.valid = true;
                    orderFormTemp.category.value = response.data.category;
                    orderFormTemp.category.valid = true;

                    return {
                        ...prevState,
                        orderForm: orderFormTemp,
                        formIsValid: true
                        // blogsList: blogsListTemp.filter(blog => {
                        //     return blog._id !== blogid;
                        // }),
                        
                    }
                });
            })
            .catch(error => {
                console.log('got an error');
                console.log(error);
                this.setState({blogloading: false,blogFetchFailed: true});
            });
        }
    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                <h4>Edit your Blog Data</h4>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event,formElement.id)} />
                ))}
                {/* <div>
                    <textarea></textarea>
                </div> */}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Submit</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // ings: state.burgerBuilder.ingredients,
        // price: state.burgerBuilder.totalPrice,
        // loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);