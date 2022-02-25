import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Questions from './Screens/Questions';
import Family from './Screens/family';
import FamilyList from './FamilyComponent/familyList/familyList';
import classes from './App.module.css';

function App() {
  return (
    <div className={classes.body}>
      <Routes>
        <Route path='/' element={<Questions />} />
        <Route path='/family' element={<Family />}>
          <Route index element={<FamilyList />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
