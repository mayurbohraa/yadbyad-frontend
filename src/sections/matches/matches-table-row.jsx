// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({ row, handleClick, selected }) {
  const [open, setOpen] = useState(null);

  const handleCloseMenu = () => {
    setOpen(null);
  };

    const user_details = JSON.parse(localStorage.getItem('login_status'));


  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        {user_details.role === 'special need student' && (
          <>
            <TableCell component="th" scope="row">
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar alt={row.requesteeId.fullName} src="/" />
                <Typography variant="subtitle2" noWrap>
                  {row.requesteeId.fullName}
                </Typography>
              </Stack>
            </TableCell>

            <TableCell>{row.requesteeId.studentID}</TableCell>
            <TableCell>{row.requesteeId.mobileNumber}</TableCell>
          </>
        )}

        {user_details.role === 'part time student' && (
          <>

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.userId.fullName} src="/" />
            <Typography variant="subtitle2" noWrap>
              {row.userId.fullName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{row.userId.studentID}</TableCell>

        <TableCell>{row.userId.mobileNumber}</TableCell>
        </>
        )}

        <TableCell>{row.type}</TableCell>
        <TableCell>{row.bookedRoom}</TableCell>

        <TableCell>{moment(row.eventId?.date).format('L')} </TableCell>
        <TableCell>{moment(row.eventId?.startTime).format('h:mm a')} </TableCell>
        <TableCell>{moment(row.eventId?.endTime).format('h:mm a')} </TableCell>

        <TableCell>
          <Label
            color={
              (row.status === 'done' && 'primary') ||
              (row.status === 'rejected' && 'error') ||
              'success'
            }
          >
            {row.status}
          </Label>
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
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  row: PropTypes.any,
  selected: PropTypes.any,
};
