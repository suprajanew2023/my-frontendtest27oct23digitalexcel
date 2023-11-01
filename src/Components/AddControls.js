import React, { useState } from 'react';
import './AddControls.css'
import {  postData } from './Service';
import { BsFillTrash3Fill } from "react-icons/bs";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
function YourComponent() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarOpens, setSnackbarOpens] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [formData, setFormData] = useState({
    standard: '',
    controls: [
      {
        control: '',
        subcontrols: [
          {
            refno: '',
            rational: '',
            rationalrating: '',
            evidence: '',
          },
        ],
      },
    ],
  });
  const handleChange = (e, index, subcontrolIndex) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData };
   
    if (subcontrolIndex !== undefined) {
      updatedFormData.controls[index].subcontrols[subcontrolIndex][name] = value;
    } else if (name === 'control') {
      updatedFormData.controls[index].control = value;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
    console.log(updatedFormData);
  };

  const addControl = () => {
    setFormData({
      ...formData,
      controls: [
        ...formData.controls,
        {
          control: '',
          subcontrols: [
            {
              refno: '',
              rational: '',
              rationalrating: '',
              evidence: '',
            },
          ],
        },
      ],
    });
  };
  

  const addSubcontrol = (index) => {
    const updatedFormData = { ...formData };
    updatedFormData.controls[index].subcontrols.push({
      refno: '',
      rational: '',
      rationalrating: '',
      evidence: '',
    });
    setFormData(updatedFormData);
  };
  const deleteControl = (controlIndex) => {
    const updatedFormData = { ...formData };
    updatedFormData.controls.splice(controlIndex, 1);
    setFormData(updatedFormData);
  };
  
  const deleteSubcontrol = (controlIndex, subcontrolIndex) => {
    const updatedFormData = { ...formData };
    updatedFormData.controls[controlIndex].subcontrols.splice(subcontrolIndex, 1);
    setFormData(updatedFormData);
  };
  const showSnackbars = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpens(true);
  };
  const showSnackbar = () => {
    setSnackbarOpen(true);
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 5000);
  };
  const handleSubmit = async () => {
    if (!formData.standard.trim()) {
      showSnackbars("Please enter a valid standard.");
      return;
    }
  
    // Check if any control or subcontrol fields are empty
    for (const control of formData.controls) {
      if (!control.control.trim()) {
        showSnackbars("Please enter a valid control for all controls.");
        return;
      }
  
      for (const subcontrol of control.subcontrols) {
        if (!subcontrol.refno.trim() || !subcontrol.rational.trim() || !subcontrol.rationalrating.trim() || !subcontrol.evidence.trim()) {
          showSnackbars("Please enter a valid value for all subcontrol fields.");
          return;
        }
      }
    }
    let res= await postData(formData)
    if (res.status === 201) 
    {
      showSnackbar();
      setFormData({
        standard: '',
        controls: [
          {
            control: '',
            subcontrols: [
              {
                refno: '',
                rational: '',
                rationalrating: '',
                evidence: '',
              },
            ],
          },
        ],
      });
    } else {
      console.log("please enter Valid Standards")
    }
      
     
  };

  return (
    <div className='standard-container-1'>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert severity="success" sx={{ backgroundColor: '#4CAF50', color: 'white' }}>
          Added Controls and SubControls Successfully
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackbarOpens}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpens(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Alert severity="warning" sx={{ backgroundColor: 'red', color: 'white' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <div className="mx-5 my-5">
             <h4 htmlFor="standardInput" className="form-label mt-4">Enter Standard & Controls </h4> <br/>

      <div className="form-group input-container"> 
       <input
        type="text"
        name="standard"
        placeholder="Enter Standard Name"
        className="col-lg-4 col-md-4 col-sm-6 col-xs-6 input-text" 
        value={formData.standard}
        onChange={(e) => handleChange(e)}/></div>
    

      {formData.controls.map((control, controlIndex) => (
        <div key={controlIndex}>
          <input
            type="text"
            name="control"
            placeholder="Enter Control Name"
            className="mt-2 col-lg-4 col-md-4 col-sm-6 col-xs-6 input-text"
            value={control.control} 
            onChange={(e) => handleChange(e, controlIndex)}
          />

          {control.subcontrols.map((subcontrol, subcontrolIndex) => (
            <div key={subcontrolIndex} className='inputfiled-container'>
              <input
                type="text"
                name="refno"
                placeholder="Ref No"
                className='col-lg-1 col-md-1 col-sm-2 col-xs-2  input-1'
                value={subcontrol.refno}
                onChange={(e) => handleChange(e, controlIndex, subcontrolIndex)}
              />

              <input
                type="text"
                name="rational"
                placeholder="Subcontrol"
                className='col-lg-3 col-md-3 col-sm-12 col-xs-12 input-text'
                value={subcontrol.rational}
                onChange={(e) => handleChange(e, controlIndex, subcontrolIndex)}
              />

              <input
                type="text"
                name="rationalrating"
                placeholder="Rational"
                className='col-lg-4 col-md-4 col-sm-12 col-xs-12 input-text'
                value={subcontrol.rationalrating}
                onChange={(e) => handleChange(e, controlIndex, subcontrolIndex)}
              />

              <input
                type="text"
                name="evidence"
                placeholder="Rational Rating"
                className='col-lg-4 col-md-4 col-sm-12 col-xs-12 input-text'
                value={subcontrol.evidence}
                onChange={(e) => handleChange(e, controlIndex, subcontrolIndex)}
              />
            <div>
            <button className="btn btn-danger m-1" onClick={() => deleteSubcontrol(controlIndex, subcontrolIndex)}><BsFillTrash3Fill/></button>
            </div>              
              
            </div>
          ))}
          <div className='btn-container'>
          <button className="btn btn-primary m-2" onClick={() => addSubcontrol(controlIndex)}>Add Subcontrol</button>
          <button className="btn btn-primary m-2" onClick={addControl}>Add Control</button>
          <button className="btn btn-danger-1 m-2" onClick={() => deleteControl(controlIndex)}> Delete Control</button>
          </div>
        </div>

      ))}
      <div className="submit-btn">  <button className="submit-button" onClick={handleSubmit}>Submit</button></div>

      
      
    </div>
    </div>
  );
}

export default YourComponent;
