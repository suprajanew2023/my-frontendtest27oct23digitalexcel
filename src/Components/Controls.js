import React, { useState } from 'react';
import EditControls from './EditControls';
import AddControls from './AddControls';
import './ControlPage.css';
import AAQ from "../LoginPage/AAQ-1904.png"

const Controls = () => {
    const [showAddControls, setShowAddControls] = useState(false);

    return (
        <div className='bgconatainer'>
        <header className='header-1'>
            <div className='logo-container'>
                <img className='rhym-logo' src={AAQ} alt="logo"/>
            </div>

        </header>
      <div className='boom'>
      <button className='button-login' onClick={() => setShowAddControls(!showAddControls)}>
         {showAddControls ? 'View Standard' : 'Add Standard'}
         </button>
       {showAddControls ? <AddControls /> : <EditControls />}
      </div>
    
        </div>
    );
};

export default Controls;
