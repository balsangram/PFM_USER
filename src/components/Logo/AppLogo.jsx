import React from 'react'
import logo from '../../assets/images/logo/pfmLogo.png'
// import logo from '../../../public/logo.png'
function AppLogo() {
    return (
        <div className="AppLogo">
            <img src={logo} className='max-h-16' alt="Logo" />
        </div>
    )
}

export default AppLogo