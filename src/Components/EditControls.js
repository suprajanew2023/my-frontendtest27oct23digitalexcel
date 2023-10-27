import React, { useState } from 'react';
import Axios from 'axios'; // You need to install Axios or use another HTTP client
import { putData } from './Service';
import "./edit.css"
function ControlDetailsTable() {
  const [standard, setStandard] = useState('');
  const [data, setData] = useState([]);
  const [editedSubcontrol, setEditedSubcontrol] = useState(null);

  const handleStandardChange = (event) => {
    setStandard(event.target.value);
  }

  const fetchControlDetails = () => {
    if (standard) {
      Axios.get(`http://localhost:3000/getControlsByStandard/${standard}`)
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          alert("Please enter a valid Standard");
          setData([]);
        });
    } else {
      alert("Please Check Standard Name that u Have Entered");
    }
  }

  const handleEditClick = (subcontrol) => {
    setEditedSubcontrol(subcontrol);
    console.log(subcontrol);
  }
 

  const handleSaveChanges = async() => {
    // Send a PUT request to update the editedSubcontrol data.
    if (editedSubcontrol) {
      try {
        const response = await putData(editedSubcontrol._id, editedSubcontrol);

        if (response.status === 200) {
          // Handle successful update, show a success message if needed.
          //console.log('Data updated successfully');
          alert("Data Updated Successfully");
          Axios.get(`http://localhost:3000/getControlsByStandard/${standard}`)
          .then((response) => {
            setData(response.data);
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            alert("Please enter a valid Standard");
            setData([]);
          });
          
        } else {
          // Handle the case where the request was not successful.
          console.error('Failed to update data');
        }

        // Reset the editedSubcontrol state to exit edit mode.
        setEditedSubcontrol(null);
      } catch (error) {
        // Handle any errors that occur during the request.
        console.error('Error updating data:', error);
      }
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the editedSubcontrol data when an input field changes.
    setEditedSubcontrol({
      ...editedSubcontrol,
      [name]: value,
    });
    console.log(editedSubcontrol)
  }

  return (
    <div className='view-container mx-4 my-4'>
      <h3 >View Stanadards</h3>
      <div>
        <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12">
        <input
          type="text"
          id="standardInput"
          value={standard}
          className="form-control" placeholder='Enter Standard Name !!'
          onChange={handleStandardChange}
        />
        </div>
       <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
       <button className='mt-4 mb-4 btn-primary1' onClick={fetchControlDetails}>Click Me To Fetch Details</button>
       </div>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr className="table-dark">
            <th scope="col">Control</th>
            <th scope="col">Ref No</th>
            <th scope="col">Rational</th>
            <th scope="col">Rational Rating</th>
            <th scope="col">Evidence</th>
            <th colSpan={2} scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, index) => (
            entry.controls.map((control) => (
              control.subcontrols.map((subcontrol) => (
                <tr key={subcontrol._id}>
                  <td>{control.control}</td>
                  <td>
                    {editedSubcontrol && editedSubcontrol._id === subcontrol._id ? (
                      <input
                        type="text"
                        name="refno"
                        value={editedSubcontrol.refno}
                        onChange={handleInputChange}
                      />
                    ) : (
                      subcontrol.refno
                    )}
                  </td>
                  <td>
                    {editedSubcontrol && editedSubcontrol._id === subcontrol._id ? (
                      <input
                        type="text"
                        name="rational"
                        value={editedSubcontrol.rational}
                        onChange={handleInputChange}
                      />
                    ) : (
                      subcontrol.rational
                    )}
                  </td>
                  <td>
                    {editedSubcontrol && editedSubcontrol._id === subcontrol._id ? (
                      <input
                        type="text"
                        name="rationalrating"
                        value={editedSubcontrol.rationalrating}
                        onChange={handleInputChange}
                      />
                    ) : (
                      subcontrol.rationalrating
                    )}
                  </td>
                  <td>
                    {editedSubcontrol && editedSubcontrol._id === subcontrol._id ? (
                      <input
                        type="text"
                        name="evidence"
                        value={editedSubcontrol.evidence}
                        onChange={handleInputChange}
                      />
                    ) : (
                      subcontrol.evidence
                    )}
                  </td>
                  <td>
                    {editedSubcontrol && editedSubcontrol._id === subcontrol._id ? (
                      <button className='btn btn-success' onClick={handleSaveChanges}>Save</button>
                    ) : (
                      <button className='btn btn-primary' onClick={() => handleEditClick(subcontrol)}>Edit</button>
                    )}
                  </td>
                </tr>
              ))
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ControlDetailsTable;
