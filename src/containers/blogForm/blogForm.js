import React,{Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/input/input';
import classes from './blogForm.module.css';
import axios from '../../axiosInstance';
// import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

class ContactData extends Component {
    // state = {
    //     orderForm: {
    //         name: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: 'Your Name'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         street: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: 'Street'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         zipcode: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: 'ZIP Code'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true,
    //                 minlength: 5,
    //                 maxlength: 5
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         country: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'text',
    //                 placeholder: 'Country'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         email: {
    //             elementType: 'input',
    //             elementConfig: {
    //                 type: 'email',
    //                 placeholder: 'Your E-Mail'
    //             },
    //             value: '',
    //             validation: {
    //                 required: true
    //             },
    //             valid: false,
    //             touched: false
    //         },
    //         deliveryMethod: {
    //             elementType: 'select',
    //             elementConfig: {
    //                 options: [
    //                     {value: 'fastest',displayValue: 'Fastest'},
    //                     {value: 'cheapest',displayValue: 'Cheapest'}
    //                 ]
    //             },
    //             value: 'fastest',
    //             validation: {},
    //             valid: true
    //         }
    //     },
    //     formIsValid: false
    // }

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
        loading: false
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
        console.log('form ddddta i ....');
        console.log(formData);
        const url = '/createblog';
        axios.post(url,formData)
            .then(response => {
                console.log('Got a response');
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
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
                <h4>Enter your Blog Data</h4>
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
                <Button btnType="Success" disabled={!this.state.formIsValid}>Create</Button>
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