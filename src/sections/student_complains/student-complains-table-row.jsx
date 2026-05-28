// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Routes from 'src/api/apiRoutes';
import { yadbyadDelete } from 'src/api/api.service';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  subject,
  message,
  reply,
  createdAt,
  status,
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
    

    const response = await yadbyadDelete(Routes.deleteComplain(id), body);
    

    if (response) {
        history(0, 2000000);
    }
};

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>
        
        <TableCell sx={{
            textTransform: 'capitalize'
          }}>{subject}</TableCell>
        
        <TableCell>{message}</TableCell>


        <TableCell>{moment(createdAt).format("L , h:mm a")} </TableCell>

        <TableCell>
          <Label color={(status === 'completed' && 'primary') || 'error'}>{status}</Label>
        </TableCell>

        <TableCell>
        {  status === "processing" ?(
              <Typography color='error'>Not Replied Yet!</Typography>
            ):(
              <Typography>{reply}</Typography>
            )
        }
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
         <Stack direction='row' onClick={handleDelete}>
            <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
            <Typography> Delete </Typography>
          </Stack>
      </MenuItem>

    </Popover >
    </>
  );
}

UserTableRow.propTypes = {
  id: PropTypes.any,
  message: PropTypes.any,
  handleClick: PropTypes.func,
  selected: PropTypes.any,
  status: PropTypes.string,
  createdAt: PropTypes.string,
  reply: PropTypes.string,
  subject: PropTypes.string,
};
