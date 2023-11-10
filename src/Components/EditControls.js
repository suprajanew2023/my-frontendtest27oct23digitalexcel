import React, { useState, useEffect } from 'react';
import Axios from 'axios'; // You need to install Axios or use another HTTP client
import { putData } from './Service';
import { deleteData } from './Service';
import "./edit.css";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import CheckIcon from '@mui/icons-material/Check';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import ReactPaginate from 'react-paginate';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

function ControlDetailsTable() {
  const [standard, setStandard] = useState('');
  const [data, setData] = useState([]);
  const [standardsList, setStandardsList] = useState([]);
  const [editedSubcontrol, setEditedSubcontrol] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [subcontrolIdToDelete, setSubcontrolIdToDelete] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleStandardChange = (event) => {
    setStandard(event.target.value);
  }

  const fetchControlDetails = () => {
          if (standard) {
            Axios.get(`https://digitalexcelcrud.onrender.com/getControlsByStandard/${standard}`)
              .then((response) => {
                setData(response.data);
                setCurrentPage(1);
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
                
                setData([]);
              });
          } else {
           
          }
        }
        const showSnackbar = (message) => {
          setSnackbarMessage(message);
          setSnackbarOpen(true);
          setTimeout(() => {
            setSnackbarOpen(false);
          }, 5000);
        };
      
        useEffect(() => {
          // Fetch the list of standards when the component mounts
          Axios.get('https://digitalexcelcrud.onrender.com/standards')
            .then((response) => {
              setStandardsList(response.data);
            })
            .catch((error) => {
              console.error('Error fetching standards:', error);
            });
        }, []);
        const handlePageChange = (selectedPage) => {
          setCurrentPage(selectedPage);
        };
        const paginatedControls = data.flatMap(entry => entry.controls).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        const handleEditClick = (subcontrol) => {
          setEditedSubcontrol(subcontrol);
          console.log(subcontrol);
        }

        const handleInputChange = (event) => {
          const { name, value } = event.target;

        setEditedSubcontrol({
          ...editedSubcontrol,
          [name]: value,
        });
        console.log(editedSubcontrol);
      }

      const handleSaveChanges = async() => {
        // Send a PUT request to update the editedSubcontrol data.
        if (editedSubcontrol) {
          try {
            const response = await putData(editedSubcontrol._id, editedSubcontrol);

            if (response.status === 200) {
              
              showSnackbar('Data Updated Successfully');
              
              fetchControlDetails();
            } else {
            
              console.error('Failed to update data');
            }

          
            setEditedSubcontrol(null);
          } catch (error) {
            
            console.error('Error updating data:', error);
          }
        }
      }

      const handleDeleteClick = async (subcontrolId) => {
        setSubcontrolIdToDelete(subcontrolId);
        setDeleteConfirmationOpen(true);
      }
      const cancelDelete = () => {
        setDeleteConfirmationOpen(false);
        setSubcontrolIdToDelete(null);
      }
      const confirmDelete = async () => {
        if (subcontrolIdToDelete) {
          try {
            const response = await deleteData(subcontrolIdToDelete);

            if (response.status === 200) {
              showSnackbar('Data Deleted Successfully');
              fetchControlDetails();
            } else {
              console.error('Failed to delete subcontrol');
            }
          } catch (error) {
            console.error('Error deleting subcontrol:', error);
          }
        }

        setDeleteConfirmationOpen(false);
        setSubcontrolIdToDelete(null);
      }

  return (
    <div className='view-container mx-4 my-4'>
       <div className="snackbar-container">
       
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
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={cancelDelete}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this subcontrol?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>

      <h3>View Standards</h3>

      <div className="flex-container">
        <div className="form-group col-lg-3 col-md-3 col-sm-12 col-xs-12 ">
          <select
            id="standardSelect"
            value={standard}
            className="form-control mb-4 standard-card"
            onClick={fetchControlDetails}
            onChange={handleStandardChange}
          >
            <option  value="">Select a Standard</option>
            {standardsList.map((standardName) => (
              <option className="acrd" key={standardName} value={standardName}>
                {standardName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {
          paginatedControls.map((control) => (
            <Accordion className="Accordian " key={control._id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${control._id}-content`}
                id={`panel-${control._id}-header`}
              >
                <Typography>{control.control}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <table className="table">
                  <thead className="thead-dark">
                    <tr className="table-light">
                      <th scope="col" className="table-refno">Ref No</th>
                      <th scope="col" className="table-subcontrol">Sub Control</th>
                      <th scope="col" className="table-head">Rational</th>
                      <th scope="col" className="table-head">Rational for Rating</th>
                  <th colSpan={2} scope="col" className="px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {control.subcontrols.map((subcontrol) => (
                  <tr key={subcontrol._id}>
                    <td className="table-head">
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
                    <td className="table-head">
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
                    <td className="table-head">
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
                    <td className="table-head">
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
                    <td className="table-head">
                      {editedSubcontrol && editedSubcontrol._id === subcontrol._id ? (
                        <button className='edit-Button' onClick={handleSaveChanges}><CheckIcon fontSize="small"/></button>
                      ) : (
                        <Tooltip title="Edit" arrow>
                        <button className="edit-Button" onClick={() => handleEditClick(subcontrol)}>
                          <EditIcon fontSize="small"/> 
                        </button>
                      </Tooltip>
                      )}
                       <Tooltip title="Delete" arrow>
    <button className='delete-button mx-2' onClick={() => handleDeleteClick(subcontrol._id)}>
      <DeleteIcon fontSize="small" /> 
    </button>
    </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      ))
    }
  </div>
  <ReactPaginate
  pageCount={Math.ceil(data.flatMap(entry => entry.controls).length / itemsPerPage)}
  pageRangeDisplayed={5}
  marginPagesDisplayed={2}
  onPageChange={({ selected }) => handlePageChange(selected + 1)}
  containerClassName="pagination pagination-right" // Add a custom class
  activeClassName="active"
  previousLabel={<ChevronLeft />} 
  nextLabel={<ChevronRight />} 
  breakLabel="..."
  breakClassName="break-me"
  pageLinkClassName="page-link"
  previousLinkClassName="page-link"
  nextLinkClassName="page-link"
  disabledClassName="disabled"
/>


</div>

);
}

export default ControlDetailsTable;
