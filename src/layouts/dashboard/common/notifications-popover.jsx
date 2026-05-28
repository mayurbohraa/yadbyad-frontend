import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

import Routes from 'src/api/apiRoutes';
import { yadbyadGet, yadbyadPost } from 'src/api/api.service';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const history = useNavigate();

  const [notifications, setNotifications] = useState([]);

  const totalUnRead = notifications.filter((item) => item.isRead === false).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = async (e) => {
    e.preventDefault();
    const body = {};

    const user_details = JSON.parse(localStorage.getItem('login_status'));

    const response = await yadbyadPost(Routes.readNotifications(user_details.role), body);

    if (response) {
      setTimeout(() => {
        history(0);
      }, "1500");
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async (e) => {
    const user_details = JSON.parse(localStorage.getItem('login_status'));
    // const UserRole = user_details.role
    const response = await yadbyadGet(Routes.fetchNotifications(user_details.role));
    setNotifications(response);
  };

  return (
    <>
      <IconButton color={open ? '#fff' : '#C4CDD5'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bold" sx={{ color: 'white' }} />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            width: 400,
            height: 600,
            overflow: 'hidden',
          },
        }}
      >
        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="submessage1">Notifications</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                You have {totalUnRead} unread messages
              </Typography>
            </Box>

            {totalUnRead > 0 && (
              <Tooltip message=" Mark all as read">
                <IconButton color="primary" onClick={handleMarkAllAsRead}>
                  <Iconify icon="eva:done-all-fill" />
                </IconButton>
              </Tooltip>
            )}
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <List disablePadding>
            {notifications.map((notification) => (
              <NotificationItem key={notification._id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.any,
    _id: PropTypes.string,
    isRead: PropTypes.bool,
    message: PropTypes.string,
    description: PropTypes.string,
    notificationType: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, message } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={message}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const message = (
    <Typography variant="submessage2">
      {notification.message}

      {notification.notificationType === 'complainsubmitted' &&  (
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.userId?.fullName}
      </Typography>
               
      )}
      {notification.notificationType === 'casualSessionCreated' &&  (
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.userId?.fullName}
      </Typography>
               
      )}
      {notification.notificationType === 'sessionDropped' &&  (
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.userId?.fullName}
      </Typography>
               
      )}

    </Typography>
  );

  if (
    notification.notificationType === 'complainsubmitted' ||
    notification.notificationType === 'complainReplied'
  ) {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/ic_complain.png" />,
      message,
    };
  }
  if (
    notification.notificationType === 'newStudentJoined'
  ) {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/ic_student.png" />,
      message,
    };
  }
  if (
    notification.notificationType === 'resourcecreated' ||
    notification.notificationType === 'resourcedeleted' ||
    notification.notificationType === 'resourceedited'
  ) {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/ic_resource.png" />,
      message,
    };
  }
  if (
    notification.notificationType === 'reportSlotCreated' ||
    notification.notificationType === 'reportSlotDeleted' ||
    notification.notificationType === 'reportsubmitted' ||
    notification.notificationType === 'reportRemarked'
  ) {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/ic_report.png" />,
      message,
    };
  }
  if (
    notification.notificationType === 'casualSessionCreated' ||
    notification.notificationType === 'sessionDropped' ||
    notification.notificationType === 'examScheduled' ||
    notification.notificationType === 'casualSessionAccepted' ||
    notification.notificationType === 'casualSessionRequested' ||
    notification.notificationType === 'lectureCreated' ||
    notification.notificationType === 'examAdded' ||
    notification.notificationType === 'casualSessionAcceptedOrRejected' ||
    notification.notificationType === 'casual/exam/lectureSessionAcceptedOrRejectedBySpecialNeed' ||
    notification.notificationType === 'partTimeCasual/Exam/LectureRequest' ||
    notification.notificationType === 'Casual/Exam/LectureDeleted'
  ) {
    return {
      avatar: <img alt={notification.message} src="/assets/icons/ic_calendar.png" />,
      message,
    };
  }
  return {
    avatar: notification.avatar ? (
      <img alt={notification.message} src={notification.avatar} />
    ) : null,
    message,
  };
}
