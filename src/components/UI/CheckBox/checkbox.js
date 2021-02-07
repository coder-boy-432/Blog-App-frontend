import React from 'react';
import classes from './checkbox.module.css';
import { faSquare,faCheckSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const checkBox = (props) => (
    <div className={classes.Icon}>
        <FontAwesomeIcon icon={!props.isChecked?faSquare:faCheckSquare} size='3x' />
    </div>
);
export default checkBox;