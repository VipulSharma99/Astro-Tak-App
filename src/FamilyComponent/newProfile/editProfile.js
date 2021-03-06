import React,{useEffect,useState} from 'react';
import back from '../../Asset/back.png';
import classes from './newProfile.module.css';
import {setView} from '../../store/action';
import {useDispatch,useSelector} from 'react-redux';
import {ToggleButton, ToggleButtonGroup, Button} from '@mui/material';
import {Row,Col} from 'react-bootstrap';
import * as api from '../../api';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const NewProfile = () =>{
    const dispatch = useDispatch();
    const [name,setName] = useState("");
    const [date,setDate] = useState("");
    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [hour,setHour] = useState("");
    const [minute,setMinute] = useState("");
    const [amp,setamp] = useState("AM");
    const [birth,setBirth] = useState();
    const [gender,setGender] = useState("MALE");
    const [relation,setRelation] = useState("");
    const stateUuid =useSelector((state) => state.uuid);
    const [data1,setData]= useState();
    const [isSubmit,setIsSubmit] = useState(false);
    const [cityList,setCityList] = useState([]);
    const [placeId, setPlaceId] = useState();

    useEffect(async()=>{
        let dta = await api.familyLst();
        let ctList=dta?.data?.data?.allRelatives.filter((item)=>{
            return item.uuid==stateUuid;
        })
        
        let lst=ctList.map((item)=>{
            setData(item)
            setName(item.fullName)
            setDate(item.birthDetails.dobDay)
            setMonth(item.birthDetails.dobMonth)
            setYear(item.birthDetails.dobYear)
            setHour(item.birthDetails.tobHour)
            setMinute(item.birthDetails.tobMin)
            setamp(item.birthDetails.meridiem)
            setBirth(item.birthPlace.placeName)
            setGender(item.gender)
            setRelation(item.relationId)
            setBirth(item.birthPlace.placeName)
            setPlaceId(item.birthPlace.placeId)

        })
    },[])
    const backHandler = () =>{
        dispatch(setView('back'))
    }
    const namehandler = (e)=>{
        setName(e.target.value);
    }
    const datehandler = (e)=>{
        if(e.target.value.length<=2 && e.target.value<=31){
            setDate(e.target.value);
        }
    }
    const monthhandler = (e)=>{
        if(e.target.value.length<=2 && e.target.value<13){
            setMonth(e.target.value);
        }
    }
    const yearhandler = (e)=>{
        if(e.target.value.length<=4 && e.target.value<2022){
            setYear(e.target.value);
        }
    }
    const hourhandler = (e)=>{
        if(e.target.value.length<=2 && e.target.value<13){
            setHour(e.target.value);
        }
    }
    const minutehandler = (e)=>{
        if(e.target.value.length<=2 && e.target.value<=60){
            setMinute(e.target.value);
        }
    }
    const amphandle = (event, newAlignment) => {
        setamp(newAlignment);
      };
      const birthhandler = async(e)=>{
        let location = await api.getLocation(e.target.value);
        let birthLoc = location?.data?.data?.map((item)=>{
            return{'label':item.placeName,'placeId':item.placeId}
        })
        setCityList(birthLoc || []);
    }
    const selecthandler = (e)=>{
        setBirth(e.label)
        setPlaceId(e.placeId)
    }
    const genderhandler = (e)=>{
        setGender(e.target.value);
    }
    const relationhandler = (e)=>{
        setRelation(e.target.value);
    }
    const SaveHandler = async (e)=>{
        setIsSubmit(true);
        e.preventDefault();
        const data=JSON.stringify({
            "uuid": stateUuid,
            "relation": relation,
            "relationId": relation,
            "firstName": name.split(" ")[0],
            "middleName": null,
            "lastName": name?.split(" ")[1],
            "fullName": name,
            "gender": gender,
            "dateAndTimeOfBirth": data1.dateAndTimeOfBirth,
            "birthDetails": {
            "dobYear": +year,
            "dobMonth": +month,
            "dobDay": +date,
            "tobHour": +hour,
            "tobMin": +minute,
            "meridiem": amp
            },
            "birthPlace": {
            "placeName": birth,
            "placeId": placeId
            }
        })
        const datat= await api.updateProfile(stateUuid,data);
        dispatch(setView(''));
    }

    return (<div>
        <div className={classes.head}>
            <img src={back} height='40' onClick={backHandler} />
            <h5>Add New Profile</h5>
            </div>
            <form className={classes.formMain}>
            <div className={classes.form}>
                    <Row className={classes.rowcenter}>
                    <label>Name</label><br />
                    <input type="text" id="name" name="name" style={isSubmit&&name==''?{borderColor:'red'}:null} onChange={(e)=>{namehandler(e)}} value={name} required className={classes.name} />
                    {isSubmit&&name.split(' ').length<2?<p style={{color:'red'}}>Enter valid First and Last Name</p>:null}
                    </Row>
                    <Row className="mt-1 mb-1">
                        <Col xs="12" className="mb-1">
                            <label>Date of Birth</label><br />
                        </Col>
                        <Col xs="4">
                            <input type="Number" placeholder='DD' onChange={(e)=>{datehandler(e)}} value={date} required className={classes.date} style={isSubmit&&date==''?{borderColor:'red'}:null}/>
                            {isSubmit&&date==''?<p style={{color:'red'}}>Invalid DD</p>:null}
                            <div className={classes.datelength}>{date?.length}/2</div>
                        </Col>
                        <Col xs="4">
                            <input type="Number" placeholder='MM' onChange={(e)=>{monthhandler(e)}} value={month} required className={classes.date} style={isSubmit&&month==''?{borderColor:'red'}:null}/>
                            {isSubmit&&month==''?<p style={{color:'red'}}>Invalid MM</p>:null}
                            <div className={classes.datelength}>{month?.length}/2</div>
                        </Col>
                        <Col xs="4">
                            <input type="Number" placeholder='YYYY' onChange={(e)=>{yearhandler(e)}} value={year} required className={classes.date} style={isSubmit&&year==''?{borderColor:'red'}:null}/>
                            {isSubmit&&year==''?<p style={{color:'red'}}>Invalid</p>:null}
                            <div className={classes.datelength}>{year?.length}/4</div>
                        </Col>
                    </Row>
                    <Row className="mt-1 mb-1">
                        <Col xs="12" className="mb-1">
                            <label className='mb-1'>Time of Birth</label><br />
                        </Col>
                        <Col xs="4">
                            <input type="Number" placeholder='HH' onChange={(e)=>{hourhandler(e)}} value={hour} required className={classes.time} style={isSubmit&&hour==''?{borderColor:'red'}:null} />
                            {isSubmit&&hour==''?<p style={{color:'red'}}>Invalid HH</p>:null}
                            <div className={classes.datelength}>{hour?.length}/2</div>
                        </Col>
                        <Col xs="4">
                            <input type="Number" placeholder='MM' onChange={(e)=>{minutehandler(e)}} value={minute} required className={classes.time} style={isSubmit&&minute==''?{borderColor:'red'}:null} />
                            {isSubmit&&minute==''?<p style={{color:'red'}}>Invalid MM</p>:null}
                            <div className={classes.datelength}>{minute?.length}/2</div>
                        </Col>
                        <Col xs="4">
                            <ToggleButtonGroup
                                color="primary"
                                value={amp}
                                exclusive
                                onChange={amphandle}
                                className={classes.time}
                                >
                                <ToggleButton value="AM">AM</ToggleButton>
                                <ToggleButton value="PM">PM</ToggleButton>
                            </ToggleButtonGroup>
                        </Col>
                    </Row>
                    <Row className={classes.rowcenter}>
                        <label className='mb-1'>Place of Birth</label><br />
                        {birth?
                        <Autocomplete
                            defaultValue={birth}
                            disablePortal
                            id="combo-box-demo"
                            options={cityList} 
                            onChange={ (e, obj) => { selecthandler(obj) }}              
                            renderInput={(params) => 
                                <TextField {...params} label="." value={birth} onChange={(e)=>{birthhandler(e)}} />}
                            />
                            :null}
                            {isSubmit&&birth==''?<p style={{color:'red'}}>Please select a city</p>:null}
                    </Row>
                    <Row className="mt-1 mb-1">
                        <Col xs="6">
                        <label className='mb-1'>Gender</label>
                        <div>
                        <select value={gender} className={classes.gender} onChange={(e)=>{genderhandler(e)}} required style={isSubmit&&gender==''?{borderColor:'red'}:null}>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </select>
                        {isSubmit&&birth==''?<p style={{color:'red'}}>Invalid Gender</p>:null}                        
                        </div>
                        </Col>
                        <Col xs='6'>
                            <label className='mb-1'>Relation</label>
                            <div>
                            <select value={relation} className={classes.gender} onChange={(e)=>{relationhandler(e)}} required style={isSubmit&&gender==''?{borderColor:'red'}:null}>
                                <option value="1">Father</option>
                                <option value="2">Mother</option>
                                <option value="3">Brother</option>
                                <option value="4">Sister</option>
                                <option value="5">Spouse</option>
                                <option value="6">Son</option>
                                <option value="7">Daughter</option>
                                <option value="8">Father in law</option>
                                <option value="9">Mother in law</option>
                                <option value="10">Brother in law</option>
                                <option value="11">Sister in law</option>
                                <option value="12">Daughter in law</option>
                                <option value="13">Uncle</option>
                                <option value="14">Aunt</option>
                                <option value="15">Friend</option>
                                <option value="16">Fiance</option>
                            </select>
                            {isSubmit&&relation==''?<p style={{color:'red'}}>Invalid Relation</p>:null}                           
                            </div>
                        </Col>
                    </Row>
                    <div className={classes.buttoncenter+" mt-3"}>
                        <Button type='submit' variant="outlined" style={{backgroundColor:'orange',color:'white'}} className="mx-auto" onClick={SaveHandler}><strong>Save Changes</strong></Button>
                    </div>  
            </div>    
            </form>
            
    </div>);
}

export default NewProfile;