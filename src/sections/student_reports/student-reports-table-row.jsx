// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Routes from 'src/api/apiRoutes';
import { baseURL } from 'src/api/axios';
import { yadbyadDelete } from 'src/api/api.service';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  filename,
  description,
  viewfile,
  remarks,
  createdAt,
  status,
  slot,
  handleClick,
}) {
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

    await yadbyadDelete(Routes.deleteReport(id), body);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
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
          <Button
            variant="contained"
            size="small"
            sx={{
              borderRadius: 0.5,
            }}
          >
            <a
              href={`${baseURL}/${viewfile}`}
              download
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: 'none', color: '#fff' }}
            >
              <Typography>View File</Typography>
            </a>
          </Button>
        </TableCell>

        <TableCell>{moment(createdAt).format('L , h:mm a')} </TableCell>

        <TableCell>
          <Label color={(status === 'completed' && 'primary') || 'error'}>{status}</Label>
        </TableCell>

        <TableCell>
          {status === 'processing' ? (
            <Typography color="error">Not Remarked Yet!</Typography>
          ) : (
            <Typography>{remarks}</Typography>
          )}
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
        <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
          <Stack direction="row" onClick={handleDelete}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            <Typography> Delete </Typography>
          </Stack>
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  description: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  slot: PropTypes.string,
  remarks: PropTypes.string,
  createdAt: PropTypes.string,
  status: PropTypes.string,
  viewfile: PropTypes.string,
  filename: PropTypes.string,
};
