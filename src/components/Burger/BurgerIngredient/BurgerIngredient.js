import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css'


class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

            switch (this.props.type) {
                case ('bread-bottom'):
                    ingredient = <div className={classes.BreadBottom}></div>
                    break;

                case ('bread-bottom-black'):
                    ingredient = <div className={classes.BreadBottomBlack}></div>
                break;
                case ('bread-top'):
                    ingredient = (
                        <div className={classes.BreadTop}>
                            <div className={classes.Seeds1}></div>
                            <div className={classes.Seeds2}></div>
                        </div>
                    );

                    break;
                case ('bread-top-black'):
                    ingredient = (
                        <div className={classes.BreadTopBlack}>
                            <div className={classes.Seeds1}></div>
                            <div className={classes.Seeds2}></div>
                        </div>
                    );
                    break;
                case ('meat'):
                    ingredient = <div className={classes.Meat}></div>
                break;
                case ('crabbypatty'):
                    ingredient = <div className={classes.CrabbyPatty}></div>
                break;
                case ('cheese'):
                    ingredient = <div className={classes.Cheese}></div>
                break;
                case ('crabbycheese'):
                    ingredient = <div className={classes.CrabbyCheese}></div>
                break;
                case ('swisscheese'):
                    ingredient = (
                        <div className={classes.Cheese}></div>
                );
                break;
                case ('bacon'):
                    ingredient = <div className={classes.Bacon}></div>
                break;
                case ('crabbybacon'):
                ingredient = <div className={classes.CrabbyBacon}></div>
            break;
                case ('salad'):
                    ingredient = <div className={classes.Salad}></div>
                break;
                case ('crabbysalad'):
                    ingredient = <div className={classes.CrabbySalad}></div>
                break;
                case ('pickle'):
                    ingredient = <div className={classes.Pickle}></div>        
                break;
                case ('crabbypickle'):
                    ingredient = <div className={classes.CrabbyPickle}></div>        
                break;
            default:
            ingredient = null;
            }
        return ingredient;     
        }
    }

    BurgerIngredient.propTypes = {
        type: PropTypes.string.isRequired
    };
export default BurgerIngredient;