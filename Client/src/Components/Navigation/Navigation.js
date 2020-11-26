import React from 'react'
import Logo  from '../../Images/logo.png';
import {Link} from 'react-router-dom'
export default function Navigation() {
    return (
        <div className='navigation'>
        <Link to='/'>
            <img className='logo' src={Logo} alt='logo' />
        </Link>
        </div>
    )
}
