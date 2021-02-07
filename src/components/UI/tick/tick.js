import React from 'react';
import classes from './tick.module.css';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const tick = (props) => (
    <div className={props.read ? classes.IconA : classes.IconI}>
        <FontAwesomeIcon icon={faCheckDouble} size='xs' />
    </div>
);
export default tick;