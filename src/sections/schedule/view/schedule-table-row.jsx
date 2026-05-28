// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Routes from 'src/api/apiRoutes';
import { yadbyadDelete } from 'src/api/api.service';

import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  fullName,
  studentID,
  type,
  courseTitle,
  fcourse,
  scribeTask,
  bookedRoom,
  date,
  startTime,
  endTime,
  createdAt,
  handleClick,
}) {

  const history = useNavigate();

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };


  const handleDelete = async (e) => {
    
    e.preventDefault();

    const body = {};
    

    const response = await yadbyadDelete(Routes.deleteSchedule(id), body);
    

    if (response) {
      setTimeout(() => {
        history(0);
      }, "1500");
    }
};


  return (
    <>
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
        
        <TableCell sx={{
            textTransform: 'capitalize'
          }}>{type}</TableCell>

        <TableCell sx={{
            textTransform: 'capitalize'
          }}>{courseTitle}</TableCell>
        
        <TableCell>{fcourse}</TableCell>

        <TableCell>{scribeTask}</TableCell>

        <TableCell>{bookedRoom}</TableCell>

        <TableCell>{moment(date).format("L")} </TableCell>
        <TableCell>{moment(startTime).format("h:mm a")} </TableCell>
        <TableCell>{moment(endTime).format("h:mm a")} </TableCell>

        <TableCell>{moment(createdAt).format("L , h:mm a")} </TableCell>

  
        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >

        <Stack onClick={handleDelete}>
          <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
                <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                <Typography> Delete </Typography>
          </MenuItem>
        </Stack>

    </Popover >
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  handleClick: PropTypes.func,
  fullName: PropTypes.any,
  selected: PropTypes.any,
  studentID: PropTypes.string,
  type: PropTypes.string,
  courseTitle: PropTypes.string,
  fcourse: PropTypes.string,
  scribeTask: PropTypes.string,
  bookedRoom: PropTypes.string,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  createdAt: PropTypes.string,
};
