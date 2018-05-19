import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {

    //Turns the props.ingredients passed object into an array of key value pairs with .keys()
    //Next executes a function on each object in the array with .map()
    const transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //Creates an array of each pair in the paired array, with the length of the value of each item
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        });

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;