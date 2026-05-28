import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";

import Link from '@mui/material/Link';
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
import { yadbyadDelete } from 'src/api/api.service';

import Iconify from 'src/components/iconify';


// ----------------------------------------------------------------------

export default function UserTableRow({
  id,
  selected,
  title,
  description,
  url,
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
    

    const response = await yadbyadDelete(Routes.deleteResource(id), body);
    

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
        
        <TableCell sx={{
            textTransform: 'capitalize'
          }}>{title}</TableCell>
        
        <TableCell sx={{
            textTransform: 'capitalize'
          }}>{description}</TableCell>
        

        <TableCell>
          <Button variant="contained" size="small" sx={{
          borderRadius: 0.5
              }}>

                <Link href={url} target='_blank' rel="noreferrer" style={{textDecoration:'none', color:'#fff'}}>
                <Typography >View Resource</Typography>
                </Link>
                </Button>
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
  handleClick: PropTypes.func,
  title: PropTypes.any,
  selected: PropTypes.any,
  url: PropTypes.any,
  description: PropTypes.string,
};
