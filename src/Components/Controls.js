import React, { useState } from 'react';
import EditControls from './EditControls';
import AddControls from './AddControls';
import './ControlPage.css';
import AAQ from "../LoginPage/AAQ-1904.png"
import { Link } from 'react-router-dom'; 
import Button from '@mui/material/Button'; 
import LogoutIcon from '@mui/icons-material/Logout';
const Controls = () => {
    const [showAddControls, setShowAddControls] = useState(false);
 

    const handleLogout = () => {
        // window.location.href = '/'
       
    };
    return (
        <div className='bgconatainer'>
            
        <div className="cont">
        <header className='header-1'>
            <div className='logo-container'>
                <img className='rhym-logo' src={AAQ} alt="logo"/>
            </div>
            <Button component={Link}  style={{ marginRight: '10px' }}  className='button-logout' onClick={handleLogout} to="/">
            <LogoutIcon></LogoutIcon>
                    Logout
                </Button>
        </header>
        </div>
      <div className='boom'>
      <button className='button-login control-btn' onClick={() => setShowAddControls(!showAddControls)}>
         {showAddControls ? 'View Standard' : 'Add Standard'}
         </button>
       {showAddControls ? <AddControls /> : <EditControls />}
      </div>
    
        </div>
    );
};

export default Controls;
