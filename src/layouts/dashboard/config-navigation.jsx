import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = {
  admin: [
    {
      title: 'dashboard',
      path: '/dashboard',
      icon: icon('ic_analytics'),
    },
    {
      title: 'user',
      path: '/user',
      icon: icon('ic_user'),
    },
    {
      title: 'schedule Exam',
      path: '/schedules ',
      icon: icon('ic_calendar'),
    },
    {
      title: 'session requests',
      path: '/sessionrequests',
      icon: icon('ic_session'),
    },
    {
      title: 'manage library',
      path: '/managelibrary',
      icon: icon('ic_libraray'),
    },
    {
      title: 'report slot',
      path: '/reportsslot',
      icon: icon('ic_report_slot'),
    },
    {
      title: 'manage reports',
      path: '/managereports',
      icon: icon('ic_submit_report'),
    },
    {
      title: 'manage complains',
      path: '/managecomplains',
      icon: icon('ic_complain'),
    },
  ],

  'special need student': [
    {
      title: 'dashboard',
      path: '/dashboard',
      icon: icon('ic_analytics'),
    },
    {
      title: 'schedules',
      path: '/schedules ',
      icon: icon('ic_calendar'),
    },
    {
      title: 'Match Requests',
      path: '/requests',
      icon: icon('ic_session'),
    },
    {
      title: 'matches',
      path: '/matches',
      icon: icon('ic_matches'),
    },
    {
      title: 'Resources',
      path: '/resources',
      icon: icon('ic_libraray'),
    },
    {
      title: 'complain',
      path: '/complain',
      icon: icon('ic_complain'),
    },
  ],

  'part time student': [
    {
      title: 'dashboard',
      path: '/dashboard',
      icon: icon('ic_analytics'),
    },
    {
      title: 'schedules',
      path: '/schedules ',
      icon: icon('ic_calendar'),
    },
    {
      title: 'matches',
      path: '/matches',
      icon: icon('ic_matches'),
    },
    {
      title: 'report slot',
      path: '/studentreportslot',
      icon: icon('ic_report_slot'),
    },
    {
      title: 'submitted report',
      path: '/submitreports',
      icon: icon('ic_submit_report'),
    },
    {
      title: 'complain',
      path: '/complain',
      icon: icon('ic_complain'),
    },
  ],
};

export default navConfig;
