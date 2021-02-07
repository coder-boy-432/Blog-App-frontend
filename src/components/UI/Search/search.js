import React from 'react';
import classes from './search.module.css';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const search = () => (
    <div className={classes.Icon}>
        <FontAwesomeIcon icon={faThumbsDown} size='2x' />
    </div>
);
export default search;