import React from 'react';
import classes from './header.module.css';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import logo from '../../Asset/logo.png';
import burgerIcon from '../../Asset/burger.png';
import { useNavigate } from "react-router-dom";

const Header = (props)=>{
    let navigate = useNavigate();
    const profileHandler = ()=>{
        navigate("../family", { replace: true });
    }

    return <div className={classes.head}>
        <img src={burgerIcon} height='40' />
        <img src={logo} height='45' />
        <PermIdentityIcon style={{color:'orange',fontSize:'40'}} onClick={profileHandler} />
    </div>;
}

export default Header;