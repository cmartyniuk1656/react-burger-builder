import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchasing: false
    }

    //Check to see if the burger is purchaseable
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({purchaseable: sum > 0});
    }

    addIngredientHandler = (type) => {

        //Get count of the ingredient using passed type arg
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        //Create new array with ES6 spread function to immuteably update state object
        const updatedIngredients = {
            ...this.state.ingredients
        }

        //Update temporaray ingredient array with new count
        updatedIngredients[type] = updatedCount;

        //Get the cost of the ingredient that should be added to the total price
        const priceAddition = INGREDIENT_PRICES[type];

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;


        //Update the state object with new ingredients count and total price
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {

        //Get count of the ingredient using passed type arg
        const oldCount = this.state.ingredients[type];

        //Do nothing if count is already at 0
        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;

        //Create new array with ES6 spread function to immuteably update state object
        const updatedIngredients = {
            ...this.state.ingredients
        }

        //Update temporaray ingredient array with new count
        updatedIngredients[type] = updatedCount;

        //Get the cost of the ingredient that should be subtracted from the total price
        const priceDeduction = INGREDIENT_PRICES[type];

        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;


        //Update the state object with new ingredients count and total price
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        alert('You Continue!');
    };

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                    ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}/>
            </Auxiliary>
        );
    }

}

export default BurgerBuilder;