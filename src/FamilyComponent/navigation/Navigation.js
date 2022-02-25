import React from 'react';
import classes from './Navigation.module.css';
import {Row, Col} from 'react-bootstrap';

const Navigation =()=>{
    return (
    <div className={classes.nav}>
        <Row>
            <Col xs="6" className={classes.cols+' '+classes.sel}>
                My Profile
            </Col>
            <Col xs="6" className={classes.cols}>
                Order History
            </Col>
            <Col xs="6" className={classes.cols}>
                Basic Profile
            </Col>
            <Col xs="6" className={classes.cols+' '+classes.selButton}>
                Friends and Family Profile
            </Col>
        </Row>
    </div>
    )
}

export default Navigation;