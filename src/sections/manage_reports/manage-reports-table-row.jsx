// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import { ReportReplyForm } from 'src/forms/report_reply';

import Label from 'src/components/label';
import ReportFileButton from 'src/components/report-file-button';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  fullName,
  studentID,
  filename,
  description,
  remarks,
  role,
  createdAt,
  status,
  slot,
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
    marginBottom: '2%',
    bgcolor: 'background.paper',
    borderRadius: 0.5,
    boxShadow: 24,
    p: 4,
  };

  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell component="th" scope="row">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={fullName} src="/" />
          <Typography variant="subtitle2" noWrap>
            {fullName}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell>{studentID}</TableCell>

      <TableCell
        sx={{
          textTransform: 'capitalize',
        }}
      >
        {role}
      </TableCell>

      <TableCell
        sx={{
          textTransform: 'capitalize',
        }}
      >
        {filename}
      </TableCell>

      <TableCell>{description}</TableCell>

      <TableCell>{slot} </TableCell>

      <TableCell>
        <ReportFileButton reportId={id} filename={filename} />
      </TableCell>

      <TableCell>{moment(createdAt).format('L , h:mm a')} </TableCell>

      <TableCell>
        <Label color={(status === 'completed' && 'primary') || 'error'}>{status}</Label>
      </TableCell>

      <TableCell>
        {status === 'processing' ? (
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: 0.5,
              ml: 1,
              mr: 1,
            }}
            onClick={handleOpen}
          >
            Remark
          </Button>
        ) : (
          <Typography>{remarks}</Typography>
        )}

        <Modal
          open={open2}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Report Remark
            </Typography>
            <hr />
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <ReportReplyForm handleClose={handleClose} id={id} />
            </Typography>
          </Box>
        </Modal>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  description: PropTypes.any,
  handleClick: PropTypes.func,
  fullName: PropTypes.any,
  selected: PropTypes.any,
  slot: PropTypes.string,
  studentID: PropTypes.string,
  createdAt: PropTypes.string,
  filename: PropTypes.string,
  remarks: PropTypes.string,
  status: PropTypes.string,
  role: PropTypes.string,
};
