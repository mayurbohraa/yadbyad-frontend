import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

export default function CasualSessionForm({ handleClose }) {
  const [date, setDate] = useState('');

  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');

  const [bookedRoom, setBookedRoom] = useState('');

  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      date: date.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      type: 'casual',
      bookedRoom: bookedRoom.trim(),
      desc: desc.trim(),
      status: 'pending',
    };

    if (
      body.date === '' ||
      body.startTime === '' ||
      body.endTime === '' ||
      body.type === '' ||
      body.bookedRoom === '' ||
      body.desc === ''
    ) {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.createCasual, body);

      if (response) {
        handleClose();
      }
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        {/* Date */}
        <Stack>
          <TextField
            type="date"
            id="date"
            name="date"
            label="Date"
            placeholder="Date"
            autoComplete="off"
            required
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>

        {/* Start Time */}
        <Stack>
          <TextField
            type="time"
            id="StartTime"
            name="StartTime"
            label="StartTime"
            placeholder="StartTime"
            autoComplete="off"
            required
            onChange={(e) => setStartTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
        {/* End Time */}
        <Stack>
          <TextField
            type="time"
            id="EndTime"
            name="EndTime"
            label="EndTime"
            placeholder="EndTime"
            autoComplete="off"
            required
            onChange={(e) => setEndTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
        {/* Booked Room */}
        <Stack>
          <TextField
            type="text"
            id="booked_room"
            name="booked_room"
            label="Booked Room"
            placeholder="Booked Room"
            autoComplete="off"
            required
            onChange={(e) => setBookedRoom(e.target.value)}
          />
        </Stack>

        {/* Desc */}
        <Stack>
          <TextField
            type="text"
            id="desc"
            name="desc"
            label="Description"
            placeholder="Description"
            autoComplete="off"
            required
            onChange={(e) => setDesc(e.target.value)}
          />
        </Stack>
      </Stack>

      <Stack
        spacing={1}
        direction="row"
        sx={{ mt: 4 }}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>

        <Button onClick={() => handleClose()} variant="contained" color="error">
          Close
        </Button>
      </Stack>
    </Box>
  );
}

CasualSessionForm.propTypes = { handleClose: PropTypes.func };
