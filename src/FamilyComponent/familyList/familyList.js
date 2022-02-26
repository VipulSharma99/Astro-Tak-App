import React,{useEffect,useState} from 'react';
import * as api from '../../api';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {List, ListItem, ListItemIcon, ListItemText, Button, Box, Typography, Modal} from '@mui/material';
import classes from './familyList.module.css';
import {useDispatch} from 'react-redux';
import {setEdit, setView} from '../../store/action';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const FamilyList =()=> {
    const [familyList,setFamilyList] = useState();
    const dispatch = useDispatch();
    const [uuid,setUuid] = useState();
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      display: 'flex',
      flexFlow: 'column',
      p: 4,
    };
    const [open, setOpen] = React.useState(false);
    const handleOpen = (data) => {
      setOpen(true)
      setUuid(data)
    };
    const handleClose = () => setOpen(false);

    useEffect(async ()=>{
        let dta = await api.familyLst();
        setFamilyList(dta?.data?.data?.allRelatives)
    },[uuid])

    const profileHandler = () =>{
      dispatch(setView('profile'));
    }
    const deleteHandler = async () =>{
      await api.memberDelete(uuid);
      setUuid('');
      handleClose();
    }

    const edithandler = (data) =>{
      dispatch(setEdit('edit',data));
    }

  return (
    <div>
        <div className={classes.balance}>
            <AccountBalanceWalletIcon fontSize='large' />
            <strong >Wallet Balance : &#8377; 0 </strong>
            <Button variant="outlined" style={{backgroundColor:'white',marginLeft:'5px'}}><strong>Add Money</strong></Button>
        </div>
        {familyList && <nav aria-label="main mailbox folders" className={classes.nav}>
        <List className={classes.listStyle}>
            <ListItem disablePadding className={classes.head}>
                  <ListItemText primary="Name" />
                  <ListItemText primary="DOB" />
                  <ListItemText primary="TOB" />
                  <ListItemText primary="Relation" />
                  <ListItemIcon>
                  </ListItemIcon>
              </ListItem>
            {familyList?.map((item,i)=>{
                return <ListItem disablePadding key={Math.random()} className={classes.listItem}>
                  <ListItemText primary={item.fullName.slice(0,7)} />
                  <ListItemText primary={item.dateAndTimeOfBirth.split("T")[0]} />
                  <ListItemText primary={item.dateAndTimeOfBirth.split("T")[1].slice(0,5)} />
                  <ListItemText primary={item.relation} style={{width:'20px'}} />
                  <ListItemIcon className={classes.left}>
                    <EditIcon style={{color:'orange'}} onClick={()=>{edithandler(item.uuid)}} />
                  </ListItemIcon>
                  <ListItemIcon className={classes.left}>
                    <DeleteIcon style={{color:'red',minWidth:'0'}} onClick={()=>{handleOpen(item.uuid)}} />
                  </ListItemIcon>
              </ListItem>
            })}
        </List>
      </nav>}
      
      <div className={classes.profileButton}>
        <Button variant="outlined" style={{backgroundColor:'orange',color:'white'}} onClick={profileHandler} ><strong>+ Add New Profile</strong></Button>
      </div>
      <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Do you really want to Delete?
            </Typography>
            <div className={classes.modelbtn}>
              <Button variant="outlined" style={{backgroundColor:'orange',color:'white',width:'45%'}} onClick={deleteHandler}><strong>YES</strong></Button>
              <Button variant="outlined" style={{backgroundColor:'orange',color:'white',width:'45%'}} onClick={handleClose} ><strong>NO</strong></Button>
            </div>
          </Box>
        </Modal>
    </div>
  );
}

export default FamilyList;