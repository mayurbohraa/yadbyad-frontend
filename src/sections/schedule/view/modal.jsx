// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
/* eslint-disable react/prop-types */

import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import useAccount from 'src/hooks/use-account';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost, yadbyadDelete } from 'src/api/api.service';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

export const EventModal = ({ events, isOpen, close }) => {
  const handleRequest = async (type, eventId, userId) => {
    const body = {
      type,
      eventId,
      userId,
    };
    const response = await yadbyadPost(Routes.slotRequest, body);
    return response ?? [];
  };

  const account = useAccount();
  const isHelper = account?.role === 'part time student';
  const isStudent = account?.role === 'special need student';

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const body = {};

    const response = await yadbyadDelete(Routes.deleteSchedule(id), body);
    if (response !== null) close();
  };

  const handleDrop = async (e, id) => {
    e.preventDefault();

    const body = {
      eventId: id,
    };

    const response = await yadbyadPost(Routes.dropScheduleMatch(id), body);
    if (response !== null) close();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={close}
      fullWidth
      maxWidth="md"
      aria-labelledby="schedule-events-title"
    >
      <DialogTitle id="schedule-events-title">Scheduled events</DialogTitle>
      <DialogContent dividers>
        <Scrollbar>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell>Course</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Start time</TableCell>
                <TableCell>End time</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((event) => (
                <TableRow hover tabIndex={-1} key={event._id}>
                  <TableCell>{event.courseTitle || '—'}</TableCell>

                  <TableCell
                    sx={{
                      textTransform: 'capitalize',
                    }}
                  >
                    {event.type}
                  </TableCell>

                  <TableCell>{moment(event.date).format('L')} </TableCell>
                  <TableCell>{moment(event.startTime).format('h:mm a')} </TableCell>
                  <TableCell>{moment(event.endTime).format('h:mm a')} </TableCell>

                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {isHelper &&
                        (event.requesteeId === account._id ? (
                          <Label color="success">Matched</Label>
                        ) : (
                          <Button
                            onClick={() => handleRequest(event.type, event._id, event.userId)}
                          >
                            Request
                          </Button>
                        ))}
                      {isStudent && event.type === 'casual' && event.status && (
                        <Label
                          color={
                            { rejected: 'error', pending: 'warning', accepted: 'success' }[
                              event.status
                            ]
                          }
                        >
                          {event.status}
                        </Label>
                      )}
                      {isStudent && event.type !== 'exam' && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="eva:trash-2-outline" />}
                          onClick={(e) => handleDelete(e, event._id)}
                        >
                          Delete
                        </Button>
                      )}
                      {isHelper &&
                        event.requesteeId === account._id &&
                        event.slotRequestId?.status === 'accepted' && (
                          <Button
                            size="small"
                            color="error"
                            onClick={(e) => handleDrop(e, event._id)}
                          >
                            Drop
                          </Button>
                        )}
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
