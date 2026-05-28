// eslint-disable-next-line import/no-extraneous-dependencies
import moment from 'moment';
/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

// import Stack from '@mui/material/Stack';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import { Box, Modal, Button } from '@mui/material';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost,yadbyadDelete } from 'src/api/api.service';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

export const EventModal = ({ date, events, isOpen, close }) => {

  const history = useNavigate();

  // Replace this with your logic to fetch events for the selected date
  const style = {
    marginTop: '2%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 800,
    // maxHeight: 640,
    marginBottom: '2%',
    bgcolor: 'background.paper',
    borderRadius: 0.5,
    boxShadow: 24,
    p: 4,
  };

  const handleRequest = async (type, eventId, userId) => {
    const body = {
      type,
      eventId,
      userId,
    };
    const response = await yadbyadPost(Routes.slotRequest, body);
    return response ?? [];
  };

  const user_details = JSON.parse(localStorage.getItem('login_status'));


  const handleDelete = async (e,id) => {
    e.preventDefault();

    const body = {};

    const response = await yadbyadDelete(Routes.deleteSchedule(id), body);


    if (response) {
      setTimeout(() => {
        history(0);
      }, "1500");
    }
};

const handleDrop = async (e,id) => {
  
  e.preventDefault();

  const body = {
    eventId:id
  };
  

  const response = await yadbyadPost(Routes.dropScheduleMatch(id), body);

  if (response) {
    setTimeout(() => {
      history(0);
    }, "1500");
  }
};

  return (
    <Modal open={isOpen} onClose={close}>
      <Scrollbar>
        <Box sx={style}>
          <div className="modal-content">
            <TableRow>
              <TableCell
              sx={{
                fontWeight:700
              }}
              >S.No.</TableCell>
              <TableCell
              sx={{
                fontWeight:700
              }}
              >Type</TableCell>
              <TableCell
              sx={{
                fontWeight:700
              }}
              >Date</TableCell>
              <TableCell
              sx={{
                fontWeight:700
              }}
              >Start Time</TableCell>
              <TableCell
              sx={{
                fontWeight:700
              }}
              >End Time</TableCell>
  
              <TableCell sx={{
                fontWeight:700
              }}
              >Action</TableCell>
             
            </TableRow>
            
            {events.map((event, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell>{index+1}</TableCell>

                <TableCell
                  sx={{
                    textTransform: 'capitalize',
                  }}
                >
                  {event.type}
                </TableCell>

                

                <TableCell>{moment(event.date).format("L")} </TableCell>
                <TableCell>{moment(event.startTime).format("h:mm a")} </TableCell>
                <TableCell>{moment(event.endTime).format("h:mm a")} </TableCell>

               
                {user_details.role === 'part time student' && (
                  <TableCell>
                    {event.requesteeId === user_details._id ? (
                      <Label>
                        Matched
                      </Label>
                      
                    ) : (
                      <Button onClick={() => handleRequest(event.type, event._id, event.userId)}>
                        Request
                      </Button>
                    )}
                  </TableCell>
                )}

                {event.type === 'casual' && user_details.role === 'special need student' &&  (
                  <TableCell>
                    <Label
                      color={
                        (event.status === 'rejected' && 'error') ||
                        (event.status === 'pending' && 'primary') ||
                        'success'
                      }
                    >
                      {event.status}
                      {/* {event._id} */}
                    </Label>
                  </TableCell>
                )}

              {event.type !== 'exam' && user_details.role === 'special need student' &&  (
                <TableCell>
                  <Button direction='row' variant="contained" color="error" onClick={(e)=>handleDelete(e,event._id)}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 0.5 }} />
                    <Typography> Delete </Typography>
                  </Button>
                </TableCell>
              )}

              {event.slotRequestId?.status === 'accepted' && user_details.role === 'part time student' &&  (
                <TableCell>
                  <Button direction='row' variant="contained" color="error" onClick={(e)=>handleDrop(e,event._id)}>
                    <Iconify icon="eva:trash-2-outline" sx={{ mr: 0.5 }} />
                    <Typography> Drop </Typography>
                  </Button>
                </TableCell>
              )}

              </TableRow>
            ))}
          </div>
          <Button onClick={close} variant="contained" color="error" sx={{marginTop:'5%'}}>
            Close
          </Button>
        </Box>
      </Scrollbar>
    </Modal>
  );
};
