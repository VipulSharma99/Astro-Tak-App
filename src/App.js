import React,{Suspense} from 'react';
import { Routes, Route, Link } from "react-router-dom";
// import Questions from './Screens/Questions';
// import Family from './Screens/family';
// import FamilyList from './FamilyComponent/familyList/familyList';
import classes from './App.module.css';

const Questions = React.lazy(()=>import('./Screens/Questions'));
const Family = React.lazy(()=>import('./Screens/family'));
const FamilyList = React.lazy(()=>import('./FamilyComponent/familyList/familyList'));

function App() {

  return (
    <div className={classes.body}>
      <Suspense fallback="Loading..">
        <Routes>
          <Route path='/' element={<Questions />} />
          <Route path='/family' element={<Family />}>
            <Route index element={<FamilyList />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
