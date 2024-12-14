import { TextField, Button } from '@mui/material'
import React, {useState} from 'react'
import { addUser } from '../libs/API'
import '../style/SignUpPage.css' 

export default function Signup()
{
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
    const onRegister = () => {
        const user = addUser(username, password, fullName)
        if (username && password && fullName)
            alert('Registration successful', user.id)
    }

    return (
        <div className='outerbox'>
            <div class="outerbox1">
                <div class="bigbox">
                    <div class="inputbox">
                        <div class="signupbox">
                        <div className="space"></div>
                        <TextField 
                            type='text' 
                            placeholder='Input username' 
                            onChange={onUsername}
                            variant='outlined' 
                            size='small' 
                            sx={{width: 400}}
                        />
                        <div className="space"></div>
                        <TextField 
                            type='text' 
                            placeholder='Input Full Name' 
                            onChange={onFullName}
                            variant='outlined' 
                            size='small' 
                            sx={{width: 400}}
                        />
                        <div>
            
                        <div className="space"></div>
                        <TextField 
                            type='password' 
                            placeholder='Input password' 
                            onChange={onPassword}
                            variant='outlined' 
                            size='small' 
                            sx={{width: 400}}
                        />
                        <div>

                        <div className="space"></div>

            <div className="loginbox">
                <div className="loginbutton">
                    <div className="loginbutton2">
                    <Button 
                        value='Register' 
                        onClick={onRegister}
                        color = 'primary'
                    />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>
</div>
</div>

    )
}