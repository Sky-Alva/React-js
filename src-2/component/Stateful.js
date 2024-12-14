import React,{ useState } from 'react'
import { addUser } from '../libs/API'

export default function Stateful(props) {

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [fullName, setFullName]=useState('')

    const onUsernameChange=(event) => {
        setUsername(event.target.value)
    }

    const onPasswordChange = (event) => {
        setPassword(event.target.value)
    }
    const onFullName = (event) =>{
        setFullName(event.target.value)
    }

    const onLogin=(event) => {
        if (username==='admin' && password==='123456')
            alert('Login success')
        else
            alert('Invalid Username or Password')
    }

    return(
        <div>
            Username:
            <input
            type='text'
            placeholder='Input Username'
            onChange={onUsernameChange}
            />
            Password: 
            <input
            type='password'
            placeholder='Input Password'
            onChange={onPasswordChange}
            />
            <input
            type='text'
            placeholder='Input Full Name'
            onChange={onFullName}
            />
            <input
            type='button'
            value='Login'
            onClick={onLogin}
            />

        </div>
    )
}