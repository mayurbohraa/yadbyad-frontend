import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { useRouter } from 'src/routes/hooks';

import useAccount from 'src/hooks/use-account';

import { clearAccount } from 'src/utils/account';

import axios from 'src/api/axios';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [signingOut, setSigningOut] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const user = useAccount();

  const router = useRouter();

  const logout = async (e) => {
    e.preventDefault();
    if (signingOut) return;
    setSigningOut(true);
    try {
      await axios.post('/auth/logout');
      clearAccount();
      router.replace('/');
    } catch {
      toast.error('Unable to sign out. Please try again.');
      setSigningOut(false);
    }
  };

  if (!user) return null;

  return (
    <>
      <ButtonBase
        aria-label="Account menu"
        aria-expanded={Boolean(open)}
        onClick={handleOpen}
        sx={{
          minWidth: 0,
          gap: 1,
          ml: { xs: 1.5, sm: 2.5 },
          py: 0.5,
          px: 0.75,
          borderRadius: 1,
          textAlign: 'left',
          bgcolor: open ? 'rgba(255, 255, 255, 0.12)' : 'transparent',
          '&:hover, &.Mui-focusVisible': { bgcolor: 'rgba(255, 255, 255, 0.16)' },
        }}
      >
        <Avatar
          alt={user.fullName}
          sx={{
            width: 36,
            flexShrink: 0,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user.fullName?.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ minWidth: 0, maxWidth: { xs: 135, sm: 240 }, color: 'text.primary_one' }}>
          <Typography variant="subtitle2" noWrap title={user.fullName}>
            {user.fullName}
          </Typography>
          <Typography
            variant="caption"
            component="div"
            noWrap
            sx={{ color: 'text.secondary_one', textTransform: 'capitalize' }}
          >
            {user.role}
          </Typography>
        </Box>
      </ButtonBase>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {user.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem component={Link} to="/profile" onClick={handleClose}>
          My Profile
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={logout}
          disabled={signingOut}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          {signingOut ? 'Signing out…' : 'Logout'}
        </MenuItem>
      </Popover>
    </>
  );
}
