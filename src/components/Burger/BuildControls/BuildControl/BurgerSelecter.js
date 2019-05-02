import React from 'react';
import PropTypes from 'prop-types';
import classes from './BurgerSelector.module.css';

const selectType = (props) => (
    <div className={classes.BurgerSelector}>
        <label className={classes.Label}>{props.label}</label>
        <input 
            type='radio' 
            id={props.name.concat('_radio')}
            onChange={props.handleChangeType}
            checked={props.typeBurgerCheck === props.name} 
            onClick={props.changeType}
            readOnly            
            />
    </div>
);
    selectType.propTypes = {
        name: PropTypes.string.isRequired
    };

export default selectType;