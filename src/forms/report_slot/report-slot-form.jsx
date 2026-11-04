import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState, useEffect } from 'react';

import { Box } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

export default function ReportSlotForm({ handleClose }) {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    setTitle(title);
    setStartDate(startDate);
    setEndDate(endDate);
  }, [title, startDate, endDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      title: title.trim(),
      startDate: startDate.trim(),
      endDate: endDate.trim(),
    };

    if (body.title === '' || body.startDate === '' || body.endDate === '') {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.createReportSlot, body);

      if (response) {
        handleClose();
      }
    }
  };

  return (
    <Box>
      <Stack spacing={3}>
        <TextField
          type="text"
          name="Title"
          label="Title"
          placeholder="Title"
          required
          helperText="Report Title."
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          type="datetime-local"
          name="StartDateTime"
          label="Start Date & Time"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Enter start date & time for endDate submission"
          required
          autoComplete="off"
          onChange={(e) => setStartDate(e.target.value)}
        />

        <TextField
          type="datetime-local"
          name="EndDateTime"
          label="End Date & Time"
          InputLabelProps={{
            shrink: true,
          }}
          helperText="Enter end date & time for endDate submission"
          required
          autoComplete="off"
          onChange={(e) => setEndDate(e.target.value)}
        />
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

ReportSlotForm.propTypes = { handleClose: PropTypes.func };
