import React, {useState, useEffect, useContext} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { getUserList } from '../libs/API';
import { AuthContext } from '../context/AuthContext';
import Select from 'react-select';

export default function ShareDialog({
    open, 
    onClose,
    selectedUsers,
    onRemoveUser,
    onAddUser
}) {
    const [userList, setUserList]=useState([])
    const { userData } = useContext(AuthContext)

    useEffect(()=>{
        if (open && userData){
            loadUsers()
        }
    },[open])

    const loadUsers= async () => {
        let users = await getUserList()
        users=users.filter(o=>o.id!==userData.id)
        let user = users.map(item => 
            {
            return ({label:item.username, value: item.id})
            })
        setUserList(user)
    }
  return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Share Image</DialogTitle>
                <DialogContent>
                    <div style ={{width: '400px', minHeight:'600px'}}>
                        <Select
                            options={userList}
                            isMulti={true}
                        />
                    </div>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Done</Button>
                </DialogActions>
        </Dialog>
  );
}