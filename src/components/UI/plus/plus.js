import React from 'react';
import classes from './plus.module.css';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const plus = () => (
    <div className={classes.Icon}>
        <FontAwesomeIcon icon={faThumbsUp} size='2x' />
    </div>
);
export default plus;