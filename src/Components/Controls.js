import React from 'react';
// import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import EditControls from './EditControls';
import AddControls from './AddControls';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import './ControlPage.css'

const Controls = () => {
  const [isShow, setIsShow] = useState(false);
    const handleClick = event => {
        setIsShow(current => !current);
        setIsDisplay(false)
    };
    const [isDisplay, setIsDisplay] = useState(false);
    const handleClicker = event => {
        setIsShow(false);
        setIsDisplay(current => !current);

    }

    return (
        // background-container 
       <div className='bgconatainer'>
       <div>
       {/* header-compnent */}
        <header className='header-1'>
        </header>

        {/* bottom -container  */}
        <div>

        {/* drop down container */}
        <div className='dropdown-container'>
        <Dropdown>
        <Dropdown.Toggle className='drop-down' variant="success" id="dropdown-basic">
        Select Standards
        </Dropdown.Toggle>
        <Dropdown.Menu className='drop-listitems'>
        <Dropdown.Item onClick={handleClick} key={'list-item-1'} className='list-item'>Add Standard</Dropdown.Item>
        <Dropdown.Item onClick={handleClicker} key={'list-item-2'} className='list-item'>View Standard</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        </div>
        {/* details - container  */}
        <div className='container-1'>
        <div>
        {isShow && (
            <div>
            {/* <Stanadard/> */}
            <AddControls />
            </div>
        )}
        {isDisplay && (
            <div>
                {/* <Domain/> */}
                <EditControls/>
                
            </div>
        )}    
        </div>
        </div>
        </div>
        </div>
       </div>
    );
};

export default Controls;
