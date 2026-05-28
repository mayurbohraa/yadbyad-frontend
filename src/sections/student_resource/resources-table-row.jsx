import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';


// ----------------------------------------------------------------------

export default function UserTableRow({
  selected,
  title,
  description,
  url,
  handleClick,
}) {


  return (
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

        </TableRow>

  );
}

UserTableRow.propTypes = {
  handleClick: PropTypes.func,
  title: PropTypes.any,
  selected: PropTypes.any,
  url: PropTypes.any,
  description: PropTypes.string,
};
