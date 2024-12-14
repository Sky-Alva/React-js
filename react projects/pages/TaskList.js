import React, { useState, useEffect, useContext } from "react"
import {Button, TextField} from '@mui/material'
import TaskItem from "../component/TaskItem"
import Styles from "../style/TaskItem.module.css"
import { addTask, removeTask,  getTaskList, updateTask } from '../libs/API'
import {AuthContext} from "../context/AuthContext";
import NavBar from '../component/NavBar.js'

export default function TaskList()
{
    const [list , setList]=useState([])
    const [name , setName]=useState('')
    const onTaskName = (e) => setName(e.target.value)

    const { userData } = useContext(AuthContext);

    const loadTask = async () => {

        if(userData){
            const taskList = await getTaskList(userData.id);
            setList(taskList)

        }
    }

    useEffect(()=>{
        loadTask()
    }, [userData])

    const onAdd = async (e) =>{
        if(name){
            if(userData){
                await addTask(userData.id,name)
                loadTask()
                setName('')
            }

        }
        
    }
    const onDelete = async (id) => {
        // let new_list = [...list]
        // new_list=new_list.filter(item => item.id !== id)
        // setList(new_list)
        await removeTask(id)
        loadTask()
    }

    const onComplete = async (id, value) => {
        // let new_list = [...list]
        // let target_task=new_list.filter(item => item.id === id );
        // if(target_task.length>0)
        // {
        //     target_task[0].complete = value;
        // }
        // setList(new_list)
        await updateTask(id,undefined,value)
        loadTask()
    }
        return(
            <div>
                {/* Created with 'Ctrl + /' */}
                <div className={Styles.Container}>
                    <NavBar text='My Tasks'></NavBar>
                    <div className={Styles.TaskListMainContainer}>
                        <div className={Styles.Header}>
                            {/* Input new Task */}
                            <TextField placeholder ='Input Task'value = {name} onChange = {onTaskName} variant='outlined' size='small' sx={{width: 600}}/>
                            <Button onClick = {onAdd} variant='contained' color='primary'> Add Task </Button>
                        </div>
                        {/* Display Task List */}
                            {
                            list.map(item => 
                                <div>
                                <TaskItem 
                                name = {item.task} 
                                complete= {item.complete}
                                onDelete= {() => onDelete(item.id)}
                                onComplete= {(value) => onComplete(item.id,value)}
                                />
                                </div>)      
                            }
                    </div>
                </div>
            </div>
        )
    }