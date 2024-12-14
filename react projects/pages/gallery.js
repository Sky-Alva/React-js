import React, {useEffect, useContext, useState} from 'react'
import {AuthContext} from "../context/AuthContext";
import { getUserPhoto, ShareImage, getSharedPhoto, DeleteImage} from '../libs/API';
import ImageBox from '../component/ImageBox'
import Styles from '../style/image.module.css'
import NavBar from '../component/NavBar'
import { Button, TextField, Checkbox } from '@mui/material'
import ShareDialog from '../component/sharedialog'

export default function Gallery(){
    const { userData } = useContext(AuthContext);
    const [userPhoto, setUserPhoto]= useState([])
    const [selectedID, setSelectedID]=useState([])
    const [select, setSelect]=useState(false)
    const [openShare, setOpenShare]=useState(false)

    const loadPhoto = async () => {
        if(userData){
            const photoMine = await getUserPhoto(userData.id)
            const photoShared = await getSharedPhoto(userData.name)
            let photoData=[...photoMine,...photoShared]
            console.log(photoData[0].PhotoID)
            setUserPhoto(photoData)
        }

    }
    const onClickImage = (photoID) =>{
        let selected=[...selectedID]
        if(selected.includes(photoID) && select){
            selected=selected.filter(o => o !==photoID)
        }
        else{
            if(select)
                selected.push(photoID)
        }
        setSelectedID(selected)
        console.log(selected)
    }

    const onSelect= () =>{
        if(select==true){
            setSelect(false)
            setSelectedID([])
        }
        else
            setSelect(true)
        console.log(select)
    }

    const onDelete = () =>{
        for (let i=0;i<=selectedID.length;i++){
            DeleteImage(selectedID[i])
        }
        setSelectedID([])
        setSelect(false) 
    }
    
    const onShares = (selectedID,userName)=>{
        for (let i=0;i<=selectedID.length;i++){
            ShareImage(selectedID[i],userName)
        }
        setSelectedID([])
        setSelect(false)
    }
    const onShare =()=>{
        setOpenShare(true)
    }

    const onClose=()=>{
        setOpenShare(false)
    }

    useEffect(()=>{
        loadPhoto()
    }, [selectedID])


    return(
        <div>         
            <NavBar text='Gallery'>
            </NavBar>
                <div className={Styles.selectbutton}>
                    <Button onClick={onSelect}
                    variant='contained'
                    color='success'
                    sx={{width: 100, height: 40}}
                    >Select</Button>
                </div>
                {selectedID.length>0 &&(
                    <button onClick={onShare}>Share</button>)
                }
            <div className={Styles.imageList}>
                {
                userPhoto.map(item => 
                    <div>
                        <div>
                            <ImageBox
                                selectmenu={select}
                                selected={selectedID.includes(item.photoID)}
                                onClick={()=> onClickImage(item.photoID)}
                                photoName={item.photoName}
                                createdAt={item.createdAt}
                                url={item.url}/>
                         </div>
                    </div>
                )}
            </div>
            <ShareDialog 
                open={openShare} 
                onClose={onClose}
            />
        </div>
    )
}
//react select value = userid, label= username