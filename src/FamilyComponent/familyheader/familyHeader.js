import React from 'react';
import classes from './familyHeader.module.css';
import logo from '../../Asset/logo.png';
import back from '../../Asset/back.png';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import {useDispatch} from 'react-redux';
import {setView} from '../../store/action';

const Familyheader = (props)=>{
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const profileHandler = ()=>{
        dispatch(setView('back'))
        navigate("/", { replace: true });
    }

    return <div className={classes.head}>
        <img src={back} height='40' onClick={profileHandler} />
        <img src={logo} height='45' />
        <Button variant="outlined" style={{backgroundColor:'white',color:'orange'}} onClick={profileHandler} ><strong>Logout</strong></Button>
    </div>;
}

export default Familyheader;