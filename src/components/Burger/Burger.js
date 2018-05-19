import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {

    //Turns the props.ingredients passed object into an array of key value pairs with .keys()
    //Next executes a function on each object in the array with .map()
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            //Creates an array of each pair in the paired array, with the length of the value of each item
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey} />
            });
        })
        //Flattens out the array of arrays into 1 array of objects
        .reduce((arr, el) => {
            return arr.concat(el)
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    console.log(transformedIngredients);

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;