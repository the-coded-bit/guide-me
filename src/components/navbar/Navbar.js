import React from 'react'
import { Logo } from '../../utils/assets'
import './navbar.css'

function Navbar() {
  return (
    <nav className='nav__container'>
        <img src={Logo} alt='Graviti logo' className='nav__logo'/>
    </nav>
  )
}

export default Navbar