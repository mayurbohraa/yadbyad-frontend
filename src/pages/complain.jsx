import { Helmet } from 'react-helmet-async';

import { StudentComplainsView } from 'src/sections/student_complains/view';

// ----------------------------------------------------------------------

export default function ComplainPage() {
  return (
    <>
      <Helmet>
        <title> Complain | Yad Byad </title>
      </Helmet>

      <StudentComplainsView />
    </>
  );
}
