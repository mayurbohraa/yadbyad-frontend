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
import { yadbyadPost } from 'src/api/api.service';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
export default function UserTableRow({ id, row, handleClick, selected }) {
  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  async function handleRequest(update) {
    const body = {
      requesteeId: row.requesteeId._id,
      eventId: row.eventId._id,
    };

    await yadbyadPost(Routes.slotUpdate(id, update), body);
  }

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.requesteeId?.fullName} src="/" />
            <Typography variant="subtitle2" noWrap>
              {row.requesteeId?.fullName}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{row.requesteeId.studentID}</TableCell>

        <TableCell>{row.type} </TableCell>

        <TableCell>{moment(row.eventId?.date).format('L')} </TableCell>
        <TableCell>{moment(row.eventId?.startTime).format('h:mm a')} </TableCell>
        <TableCell>{moment(row.eventId?.endTime).format('h:mm a')} </TableCell>

        <TableCell>
          <Label
            color={
              (row.status === 'rejected' && 'error') ||
              (row.status === 'dropped' && 'primary') ||
              'success'
            }
          >
            {row.status}
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
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  row: PropTypes.any,
  id: PropTypes.any,
};
