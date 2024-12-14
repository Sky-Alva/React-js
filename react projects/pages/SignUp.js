import { TextField, Button } from '@mui/material'
import React, {useState, useEffect, useContext} from 'react'
import { addUser, getUserList, login} from '../libs/API'
import '../style/SignUpPage.css'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
export default function Signup()
{
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const [userList, setUserList] = useState([])


    useEffect(()=>{
        loadUsers()

    } , []) //Agar Function hanya terjadi sekali per load

    const {userData, updateUserData} = useContext(AuthContext)

    const loadUsers= async() => {
        const users = await getUserList()
        setUserList(users)
    }

    const onUsername = (event) => {
        setUsername(event.target.value)
    }
    const onPassword = (event) => {
        setPassword(event.target.value)
    }
    const onFullName = (event) => {
        setFullName(event.target.value)
    }
    const onRegister =  async () => {
        const user = await addUser(username, password, fullName)
        if (username && password && fullName)
            alert('Registration successful', user.id)
            let new_user= {
                id: user.id,
                name: fullName,
                username: username
            }
            let new_userList=[...userList, new_user]
            setUserList(new_userList)
            const user1 = await login(username,password)
            if(user1)
            {
                updateUserData(user1)
                navigate('/tasks')
            }
    }

    return (
        <div className='outerbox'>
            <div class="outerbox1">
                <div class="bigbox">
                    <div class="inputbox">
                        <div class="signupbox">
                        </div>

                        <div className="space"></div>
                        <TextField 
                            placeholder='Input username' 
                            onChange={onUsername}
                            variant='outlined' 
                            size='small' 
                            sx={{width: 700}}
                        />
                        <div className="space"></div>
                        <TextField  
                            placeholder='Input Full Name' 
                            onChange={onFullName}
                            variant='outlined' 
                            size='small' 
                            sx={{width: 700}}
                        />
                        <div>
            
                        <div className="space"></div>
                        <TextField
                            type='password' 
                            placeholder='Input password' 
                            onChange={onPassword}
                            variant='outlined' 
                            size='small' 
                            sx={{width: 700}}
                        />
                        <div>

                        <div className="space"></div>

            <div className="loginbox">
                <div className="loginbutton">
                    <div className="loginbutton2">
                    <Button
                        onClick={onRegister}
                        color='primary'
                        variant='contained'
                        sx={{width: 500, height: 100}}
                    > Register </Button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
{/* <div>
        {
        //python version 'for item in userList:'
        userList.map(item => <div>
            <h3> ID: {item.id}</h3>
            <h4> Name: {item.name}</h4>
            <h4> Username: {item.username}</h4> 
        </div>)}
</div> */}
</div>



    )
}