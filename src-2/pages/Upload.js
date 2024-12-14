import React, { useState, useContext, useEffect, useRef} from 'react'
import {UploadFile} from '../libs/API.js'
import { AuthContext } from '../context/AuthContext.js'
import {Button, TextField} from '@mui/material'
import Styles from '../style/upload.module.css'
import NavBar from '../component/NavBar.js'
export default function Photo(){
    const [file, setFile] = useState(null)
    const [textfield, setTextfield] = useState('Please Upload Your File')
    const { userData } = useContext(AuthContext);
    console.log(userData)
    const onSelectFile = async (e)=>{
        setFile(e.target.files[0])
        setTextfield('File Ready To Upload')
    }

    const onUpload = (e) =>{

        if (file)
            UploadFile(file,userData.id,userData.name)
            alert('File Successfully Uploaded')
            setTextfield('Another File?')
        }

    return(
        <div className={Styles.photocontainer}>
        <div className={Styles.navcontainer}><NavBar text = 'Upload File'></NavBar></div> 
        <div className={Styles.photocontainer2}>
            <Button
                variant="outlined"
                component="label"
                color='info'
                size='large'
            >
                Upload File
                <input
                    type="file"
                    onChange={onSelectFile}
                    hidden
                />
            </Button>
                <TextField
                value={textfield}
                variant='outlined'/>
            <Button onClick={onUpload} color='primary' variant='contained' size='large'>Upload</Button>
        </div></div>
            
       
    )
}