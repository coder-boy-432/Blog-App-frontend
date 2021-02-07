import React from 'react';
import classes from './dot.module.css';
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const dot = (props) => (
    <div className={props.online ? classes.IconA : classes.IconI}>
        <FontAwesomeIcon icon={faCircle} size='xs' />
    </div>
);
export default dot;