import React, {useEffect, useContext, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Styles from '../style/image.module.css'
import { Checkbox, IconButton, TextField} from '@mui/material'

export default function ImageBox(props){
    return(
        <div className={Styles.image} onClick ={props.onClick}>
            <div className={Styles.imageBox}>
                <Card sx={{ maxWidth: 1035 }}>
                 
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="280"
                        image={props.url}
                    />
                     {
                        props.selectmenu===true?
                        <div className={Styles.checkbox}>
                        <Checkbox checked={props.selected}
                                    defaultChecked
                                    sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>
                        </div>
                        :
                        <div></div>
                    }      
                    <CardContent>
                    <Typography gutterBottom variant="body1" component="div">
                        {props.photoName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Uploaded At: {props.createdAt.toLocaleString()}
                    </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            </div>
        </div>

    )
}