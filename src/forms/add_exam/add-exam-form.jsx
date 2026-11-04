import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import Routes from 'src/api/apiRoutes';
import { yadbyadPost } from 'src/api/api.service';

export default function AddExamForm({ handleClose }) {
  const [date, setDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startTime, setStartTime] = useState('');
  const [bookedRoom, setBookedRoom] = useState('');
  const [fCourse, setFCourse] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [scribeTask, setScribeTask] = useState('');
  const [specialNeedsStudentID, setSpecialNeedsStudentID] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      date: date.trim(),
      startTime: startTime.trim(),
      endTime: endTime.trim(),
      type: 'exam',
      bookedRoom: bookedRoom.trim(),
      fCourse: fCourse.trim(),
      courseTitle: courseTitle.trim(),
      scribeTask: scribeTask.trim(),
      specialNeedsStudentID: specialNeedsStudentID.trim(),
    };

    if (
      body.date === '' ||
      body.startTime === '' ||
      body.endTime === '' ||
      body.type === '' ||
      body.bookedRoom === '' ||
      body.courseTitle === '' ||
      body.scribeTask === '' ||
      body.specialNeedsStudentID === ''
    ) {
      toast.error('Complete all fields.', {
        icon: '⚠️',
        style: {
          background: '#3f7bf2',
          color: '#fff',
        },
      });
    } else {
      const response = await yadbyadPost(Routes.createExam, body);

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

        {/* F_Course */}
        <Stack>
          <TextField
            type="text"
            id="f_course"
            name="f_course"
            label="F_Course (optional)"
            placeholder="F_Course (optional)"
            autoComplete="off"
            onChange={(e) => setFCourse(e.target.value)}
          />
        </Stack>

        {/* Course Title */}
        <Stack>
          <TextField
            type="text"
            id="course_title"
            name="course_title"
            label="Course Title"
            placeholder="Course Title"
            autoComplete="off"
            required
            onChange={(e) => setCourseTitle(e.target.value)}
          />
        </Stack>

        {/* Scribe Task */}
        <Stack>
          <TextField
            type="text"
            id="scribe_task"
            name="scribe_task"
            label="Scribe Task"
            placeholder="Scribe Task"
            autoComplete="off"
            required
            onChange={(e) => setScribeTask(e.target.value)}
            helperText="Read - Write - Explain"
          />
        </Stack>

        {/* Special Needs Student ID */}
        <Stack>
          <TextField
            type="text"
            id="special_needs_student_id"
            name="special_needs_student_id"
            label="Special Needs Student ID"
            placeholder="Special Needs Student ID"
            autoComplete="off"
            required
            onChange={(e) => setSpecialNeedsStudentID(e.target.value)}
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
      </Stack>
    </Box>
  );
}

AddExamForm.propTypes = { handleClose: PropTypes.func };
