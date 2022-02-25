import React from 'react';
import classes from './balance.module.css';
import Home from '../../Asset/home.png';
import Talk from '../../Asset/talk.png';
import Ask from '../../Asset/ask.png';
import Reports from '../../Asset/reports.png';
import Chat from '../../Asset/chat.png';

const bottomNavigation = ()=>{
  return <div className={classes.head}>
        <img src={Home} height='40' style={{color:'black'}}/>
        <img src={Talk} height='45' />
        <img src={Ask} height='50' style={{color:'orange'}}/>
        <img src={Reports} height='45' />
        <img src={Chat} height='40' />
    </div>;
}

export default bottomNavigation;