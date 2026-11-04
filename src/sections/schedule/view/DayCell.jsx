import { useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { EventModal } from './modal';

export default function DayCell({ date, isActive, events }) {
  const [open, setOpen] = useState(false);
  const hasEvents = events.length > 0;

  return (
    <Box
      sx={{
        minHeight: { xs: 55, sm: 82 },
        bgcolor: isActive ? 'primary.lighter' : 'background.paper',
      }}
    >
      <ButtonBase
        component={hasEvents ? 'button' : 'div'}
        onClick={hasEvents ? () => setOpen(true) : undefined}
        aria-label={hasEvents ? `${format(date, 'PP')}, ${events.length} events` : undefined}
        aria-current={isActive ? 'date' : undefined}
        sx={{
          width: 1,
          height: 1,
          p: 0.75,
          minHeight: 'inherit',
          alignItems: 'flex-start',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          cursor: hasEvents ? 'pointer' : 'default',
          '&.Mui-focusVisible': {
            outline: '2px solid',
            outlineColor: 'primary.main',
            outlineOffset: -2,
          },
        }}
      >
        <Typography variant="body2">{date.getDate()}</Typography>
        {hasEvents && (
          <Typography variant="caption" color="primary.dark">
            {events.length} {events.length === 1 ? 'event' : 'events'}
          </Typography>
        )}
      </ButtonBase>
      {open && <EventModal events={events} isOpen={open} close={() => setOpen(false)} />}
    </Box>
  );
}

DayCell.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  isActive: PropTypes.bool.isRequired,
  events: PropTypes.array.isRequired,
};
