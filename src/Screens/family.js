import React,{useState} from 'react';
import Header from '../FamilyComponent/familyheader/familyHeader';
import Navigation from '../FamilyComponent/navigation/Navigation';
import FamilyList from '../FamilyComponent/familyList/familyList';
import {useSelector} from 'react-redux';
import NewProfile from '../FamilyComponent/newProfile/newProfile';
import EditProfile from '../FamilyComponent/newProfile/editProfile';

const Family = ()=>{
  const view =useSelector((state) => state.view);
  return (
    <div style={{itemAlign:'centre',maxWidth:'inherit'}}>
        <Header />
        <Navigation />
        {view=='profile'?
          <NewProfile />
          :(view=='edit'?<EditProfile/>:<FamilyList/>)
        }
    </div>
  );
}

export default Family;