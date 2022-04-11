import React,{useState, Suspense} from 'react';
import Header from '../FamilyComponent/familyheader/familyHeader';
import Navigation from '../FamilyComponent/navigation/Navigation';
// import FamilyList from '../FamilyComponent/familyList/familyList';
import {useSelector} from 'react-redux';
// import NewProfile from '../FamilyComponent/newProfile/newProfile';
// import EditProfile from '../FamilyComponent/newProfile/editProfile';

const NewProfile = React.lazy(()=>import('../FamilyComponent/newProfile/newProfile'));
const EditProfile = React.lazy(()=>import('../FamilyComponent/newProfile/editProfile'));
const FamilyList = React.lazy(()=>import('../FamilyComponent/familyList/familyList'));

const Family = ()=>{
  const view =useSelector((state) => state.view);
  return (
    <div style={{itemAlign:'centre',maxWidth:'inherit'}}>
        <Header />
        <Navigation />
        <Suspense fallback='Loading...'>
          {view=='profile'?
            <NewProfile />
            :(view=='edit'?<EditProfile/>:<FamilyList/>)
          }
        </Suspense>
    </div>
  );
}

export default Family;