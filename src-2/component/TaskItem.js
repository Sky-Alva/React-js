import React, {useState} from "react"
import { Checkbox, IconButton, TextField} from '@mui/material'
import {Delete} from '@mui/icons-material'
import Styles from '../style/TaskItem.module.css'

export default function TaskItem(props)

{   const [open, setOpen] = useState(false)
    const onChecked= (e) => {
        props.onComplete(e.target.checked)
    }

    const onDeleteItem = () => {
        props.onDelete()
    }
    const onTextClick = () => {
        setOpen(true)
    }
    return(
        <div className={Styles.TaskItemContainer}>
            <Checkbox checked={props.complete} onChange={onChecked} />
            {
                open === true ?
                    <TextField
                        size='small'
                        variant='outlined' 
                        onClick={onTextClick}
                        className={Styles.TaskItemName}
                        value={props.name}>
                    </TextField>
            :
                    <span 
                        onClick={onTextClick}
                        className={Styles.TaskItemName}>
                        
                        {props.name}
                    </span>
            }
            
            <IconButton onClick = {onDeleteItem}>
                <Delete fontSize = 'Medium' color='error'/>
            </IconButton>
        </div>
    )}