import React from 'react'
import Logo  from '../../Images/logo.png';
import {IconWrap} from '../../Styled'
import {Link} from 'react-router-dom';
import { VscAdd,VscBellDot,VscAccount} from "react-icons/vsc";
export default function Navigation() {
    return (
        <div className='navigation'>
        <Link to='/'>
            <img className='logo' src={Logo} alt='logo' />
        </Link>
        <div style={{fontSize:"35px"}}><Link to='#'><VscAccount/></Link></div>
        </div>
    )
}
