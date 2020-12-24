import React from 'react'
import {Link} from 'react-router-dom'
export default function LoginSuccess({ message0, message1 }) {
    return (
        <div className='LogoutDIV'>
            <p>{message0}<span className='color-green'>{message1}</span>
            
            <span><Link className='loginModal'  to='/login'> Login </Link></span>
        <span><Link className='loginModal'  to='/signup'> Signup </Link></span>
            
            </p>
    </div>
    )
}