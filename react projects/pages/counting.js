import React , {useState, useEffect, useContext, useRef}from 'react';
import Counting from '../style/counting.module.css';
import {Button, TextField} from '@mui/material';
import { updateNumber , getNumber } from '../libs/API';
import { AuthContext } from '../context/AuthContext';
import NavBar from '../component/NavBar'

export default function Count(){

    const { userData } = useContext(AuthContext);

    const count = useRef(0)
    useEffect(()=>{
        if (count.current!==0){
            onGet()
        }
        count.current++
    }, [])

    const onGet = async () => {
        const Number = await getNumber(userData.id)
        setNumber(Number)
        console.log(userData.id)
    }
    
    const [number, setNumber] = useState(0)

    const onAdd = async (e) =>{
        let new_number = number + 1
        await updateNumber(new_number,userData.id)
        setNumber(new_number)
    }

    const onMinus = async (e) => {
        let new_number = number - 1
        await updateNumber(new_number,userData.id)   
        setNumber(new_number)
    }
    
    return(
    <div className = {Counting.container}>
        <NavBar text='Count By Clicking'></NavBar>
        <div className={Counting.outerbox}>
            <h1> Click To Count </h1>
            <div className={Counting.outerbox2}>
                <Button onClick = {onMinus} variant='contained' color='error'> - </Button>
                    <TextField 
                    value = {number}
                    variant='outlined' 
                    size='small'
                    />
                <Button onClick = {onAdd} variant='contained' color='success'> + </Button>
            </div>
        </div>
    </div>
    )
}