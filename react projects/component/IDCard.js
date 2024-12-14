import React from 'react'
import '../style/IDCard.css'
function IDCard(props){
    return(
        <><div className='abitspace'></div><div className='container'>
            <div>
                <img
                    className='profilephoto' />
            </div>
            <div className='profile'>
                <h4>Name: {props.name}</h4>
                <h4>Number: {props.number}</h4>
                <h4>ID Number: {props.ID}</h4>
            </div>
        </div></>
    )
}

export default IDCard