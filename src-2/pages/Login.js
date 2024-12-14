import { Button, TextField } from '@mui/material'
import React, {useState, useContext} from 'react'
import { login } from '../libs/API'
import '../style/SignUpPage.css' 
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Signup()
{
    const {userData, updateUserData} = useContext(AuthContext)
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fullName, setFullName] = useState('')


    const onUsername = (event) => {
        setUsername(event.target.value)
    }
    const onPassword = (event) => {
        setPassword(event.target.value)
    }
    const onFullName = (event) => {
        setFullName(event.target.value)
    }
    const onLogin = async () => {
        if (username && password && fullName){
            const user = await login(username,password)
            if(user)
            {
                updateUserData(user)
                navigate('/tasks')
            }
        }
        else{
            alert('Required every Field to be Filled')
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
                        <div className="space"></div>
                        <TextField  
                            placeholder ='Input Name' 
                            onChange = {onUsername} 
                            variant='outlined' 
                            size='small' 
                            sx={{width: 700}}/>

                        <div className="space"></div>
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
                        onClick={onLogin}
                        variant='contained'
                        color='primary'
                        sx={{width: 500, height: 100}}
                    > Log In </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>)}