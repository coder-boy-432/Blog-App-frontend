import React from 'react';
import classes from './backArrow.module.css';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const backArrow = () => (
    <div className={classes.Icon}>
        <FontAwesomeIcon icon={faAngleLeft} size='3x' />
    </div>
);
export default backArrow;