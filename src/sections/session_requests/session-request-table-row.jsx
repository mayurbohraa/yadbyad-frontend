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
import IconButton from '@mui/material/IconButton';

import Routes from 'src/api/apiRoutes';
import { yadbyadPut } from 'src/api/api.service';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
export default function UserTableRow({
  selected,
  id,
  fullName,
  studentID,
  type,
  room,
  date,
  endTime,
  startTime,
  status,
  handleClick,
}) {
  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  async function handleRequest(update) {
    await yadbyadPut(Routes.updateRequest(id, update));
  }

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

        <TableCell
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {type}
        </TableCell>

        <TableCell>{room}</TableCell>

        <TableCell>{date} </TableCell>
        <TableCell>{moment(startTime).format('h:mm a')}</TableCell>
        <TableCell>{moment(endTime).format('h:mm a')} </TableCell>

        <TableCell>
          <Label
            color={
              (status === 'rejected' && 'error') || (status === 'pending' && 'primary') || 'success'
            }
          >
            {status}
          </Label>
        </TableCell>

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
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleRequest('accepted');
          }}
          sx={{ color: 'success.main' }}
        >
          <Iconify icon="material-symbols-light:order-approve-rounded" sx={{ mr: 2 }} />
          Approve
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleCloseMenu();
            handleRequest('rejected');
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="maki:cross" sx={{ mr: 2 }} />
          Reject
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  handleClick: PropTypes.func,
  fullName: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
  studentID: PropTypes.string,
  date: PropTypes.string,
  startTime: PropTypes.string,
  endTime: PropTypes.string,
  type: PropTypes.string,
  room: PropTypes.string,
};
