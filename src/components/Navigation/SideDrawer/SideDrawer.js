import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary';

import classes from './SideDrawer.css';

const sideDrawer = (props) => {


    return(
        <Auxiliary>
            <Backdrop 
            show={props.open} 
            clicked={props.closed}/>
                <div className={classes.SideDrawer}>
                    <div className={classes.Logo}>
                        <Logo />
                    </div>
                    <nav>
                        <NavigationItems />
                    </nav>
                </div>
        </Auxiliary>
    );
}

export default sideDrawer;