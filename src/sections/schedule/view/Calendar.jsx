import PropTypes from 'prop-types';
import { format, addMonths, isSameDay, startOfMonth, getDaysInMonth } from 'date-fns';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import DayCell from './DayCell';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Calendar({ value, onChange, events }) {
  const firstDay = startOfMonth(value);
  const today = new Date();
  const offset = firstDay.getDay();

  return (
    <Card sx={{ overflowX: 'auto' }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        sx={{ p: 2 }}
      >
        <Typography component="h2" variant="h6">
          {format(value, 'LLLL yyyy')}
        </Typography>
        <Stack direction="row" spacing={0.5}>
          <Button onClick={() => onChange(new Date())}>Today</Button>
          <Button aria-label="Previous month" onClick={() => onChange(addMonths(value, -1))}>
            Prev
          </Button>
          <Button aria-label="Next month" onClick={() => onChange(addMonths(value, 1))}>
            Next
          </Button>
        </Stack>
      </Stack>
      <Box
        sx={{
          display: 'grid',
          minWidth: 350,
          gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
          bgcolor: 'background.neutral',
          gap: '1px',
        }}
      >
        {weekdays.map((day) => (
          <Typography key={day} variant="subtitle2" align="center" sx={{ py: 1 }}>
            {day}
          </Typography>
        ))}
        {Array.from({ length: offset + getDaysInMonth(value) }, (_, index) => {
          const day = new Date(value.getFullYear(), value.getMonth(), index - offset + 1);
          if (index < offset)
            return <Box key={day.toISOString()} sx={{ bgcolor: 'background.paper' }} />;
          return (
            <DayCell
              key={day.toISOString()}
              date={day}
              isActive={isSameDay(day, today)}
              events={events.filter((event) => isSameDay(new Date(event.date), day))}
            />
          );
        })}
      </Box>
    </Card>
  );
}

Calendar.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};
