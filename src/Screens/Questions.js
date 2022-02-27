import React from 'react';
import Header from '../Components/Header/Header';
import Balance from '../Components/Balance/Balance';
import BottomNavigation from '../Components/Balance/BottomNavigation';
import Content from '../Components/Content/Content';

const Questions=()=> {
  return (
    <div>
      <Header />
      <Balance />
      <Content />
      <BottomNavigation />
    </div>
  );
}

export default Questions;