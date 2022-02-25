import React , {useEffect, useState} from 'react';
import classes from './content.module.css';
import {MenuItem, FormControl, Select, TextField, Button} from '@mui/material';
import * as api from '../../api';

const Content = ()=>{
    const [category, setCategory] = useState('');
    const [data,setData] = useState();
    const [catList,setCatList] = useState();
    const [ques,setQues] = useState();
    const [cost, setCost] = useState();
    const [priceList,setPriceList] = useState();
    
    useEffect(async ()=>{
        let dta = await api.questionApi();
        let ctList=dta?.data.data.map((item)=>{
            return item.name;
        })
        let dtaDict = {}
        let pricelst = {}
        let dtaList = dta.data.data.map((item)=>{
            dtaDict[item.name]=item.suggestions
            pricelst[item.name]=item.price
            return 0;
        })
        setCatList(ctList);
        setData(dtaDict);
        setPriceList(pricelst);
    },[])


    const handleChange = (event) => {
        setCategory(event.target.value);
        setQues('')
        setCost(priceList[event.target.value])
      };
    
    const quesSelectHandler = (item)=>{
        setQues(item)
    }
    const questionhandler = (e) =>{
        setQues(e.target.value)
    }

    return <div className={classes.title}>
        <strong style={{fontSize:'18px'}}>
        Ask a Question
        </strong>
        <p style={{color:'lightslategrey',marginTop:'5px'}}>
            Seek accurate answers to life problems and get guidance towards the right path. Whether the problem is related to love, self, life, business, money, education or work, our astrologers will do an in depth study of your birth chart to provide personalized responses along with remedies.
        </p>
        <strong style={{fontSize:'18px'}}>
            Choose Category
        </strong>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={category}
                onChange={handleChange}
                label="Age"
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {catList?.map((item,index)=>{
                    return <MenuItem value={item} key={item+index}>{item}</MenuItem>
                })}
            </Select>
        </FormControl>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={4}
          value={ques}
          placeholder="Type a question here"
          onChange={(e)=>{questionhandler(e)}}
          style={{marginTop:'10px'}}
        />
        <div className={classes.Textlength}>{ques?.length}/150</div>
        <strong style={{fontSize:'18px',marginTop:'10px',marginBottom:'10px'}}>
            Ideas what to Ask (Select Any)
        </strong>
        {category && data[category].map((item,index)=>{

            return <div key={item+index} className={classes.question} onClick={()=>{quesSelectHandler(item)}}>{item}<hr /></div>
        })}

        <p>Seeking accurate answers to difficult questions troubling your mind? Ask credible astrologers to know what future has in store for you.</p>
        <ul className={classes.note}>
            <li>Personalized responses provided by our team of Vedic astrologers within 24 hours.</li>
            <li>Qualified and experienced astrologers will look into your birth chart and provide the right guidance.</li>
            <li>You can seek answers to any part of your life and for most pressing issues.</li>
            <li>Our team of Vedic astrologers will not just pronoun answers but also suggest a remedial solution.</li>
        </ul>
        <div className={classes.cart}>
            <strong style={{color:'white'}}>&#8377; {cost || 0} (1 Question on {category || 'No category'}) </strong>
            <Button variant="outlined" style={{backgroundColor:'white'}}><strong>Ask Now</strong></Button>
        </div>
  </div>
}

export default Content;