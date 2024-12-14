import React, { createContext, useState} from 'react';
export const AuthContext = createContext();

const saveLocalStorage = (key, value) => {
    const string = JSON.stringify(value)
    window.localStorage.setItem(key, string)
}

const getLocalStorage = (key) => {
    const data = window.localStorage.getItem(key)
    if (data)
        return JSON.parse(data)
    return null
}

const USER_KEY = 'userInfo'

export default function AuthContextProvider(props) {
    const [userData, setUserData] = useState(getLocalStorage(USER_KEY))
    const updateUserData = (new_userData) => {
        setUserData(new_userData);
        saveLocalStorage(USER_KEY, new_userData)
    }
    return(
        <AuthContext.Provider value={
            {
                userData,
                updateUserData
            }
        }>
            {props.children}
        </AuthContext.Provider>
    )
}