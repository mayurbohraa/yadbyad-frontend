// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { SubmitReportForm } from 'src/forms/submit_report';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';


// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  title,
  endDateTime,
  startDateTime,
  createdAt,
  status,
  submitReport,
  handleClick,
}) {

const [open2, setOpen2] = useState(false);
const handleOpen = () => setOpen2(true);
const handleClose = () => setOpen2(false);

const style = {
  marginTop: '2%',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: 500,
  // maxHeight: 640,
  marginBottom:'2%',
  bgcolor: 'background.paper',
  borderRadius:0.5,
  boxShadow: 24,
  p: 4,
};


  return (
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>        
        
        <TableCell sx={{
            textTransform: 'capitalize'
          }}>{title}</TableCell>
        
        <TableCell>{moment(startDateTime).format("L , h:mm a")} </TableCell>

        <TableCell>{moment(endDateTime).format("L , h:mm a")} </TableCell>
        
        <TableCell>{moment(createdAt).format("L , h:mm a")} </TableCell>

        <TableCell>
          <Label color={(status === 'closed' && 'error') || 'success'}>{status}</Label>
        </TableCell>

        <TableCell>
            { status === "open" ?(
              <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleOpen}> 
                        Submit Report 
              </Button>
            ):(
              <Typography color='error'>Submission closed!</Typography>
            )
            }
          </TableCell>


        <Modal
        open={open2}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        
      >
        <Scrollbar>        
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Submit Report
          </Typography>
          <hr/>
          <Typography id="modal-modal-description" sx={{ mt: 2}}>
            <SubmitReportForm handleClose={handleClose} id={id}/>
          </Typography>
        </Box>
        </Scrollbar>
      </Modal>       
      </TableRow>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  handleClick: PropTypes.func,
  title: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  startDateTime: PropTypes.string,
  endDateTime: PropTypes.string,
  createdAt: PropTypes.string,
  submitReport: PropTypes.string,
};
