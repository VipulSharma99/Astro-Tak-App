import React from 'react';
import classes from './balance.module.css';
import Button from '@mui/material/Button';

const Balance = ()=>{
    return <div className={classes.balance}>
        <strong style={{color:'white'}}>Wallet Balance : &#8377; 0</strong>
        <Button variant="outlined" style={{backgroundColor:'white'}}><strong>Add Money</strong></Button>
    </div>;
}

export default Balance;