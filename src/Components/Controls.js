import React, { useState } from 'react';
import EditControls from './EditControls';
import AddControls from './AddControls';
import './ControlPage.css';

const Controls = () => {
    const [showAddControls, setShowAddControls] = useState(false);

    return (
        <div className='bgconatainer'>
        <header className='header-1'></header>
        <button className='button-login' onClick={() => setShowAddControls(!showAddControls)}>
         {showAddControls ? 'View Standard' : 'Add Standard'}
         </button>
       {showAddControls ? <AddControls /> : <EditControls />}
    
        </div>
    );
};

export default Controls;
