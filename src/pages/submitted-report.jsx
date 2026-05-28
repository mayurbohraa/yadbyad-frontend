import { Helmet } from 'react-helmet-async';

import { StudentReportsView } from 'src/sections/student_reports/view';

// ----------------------------------------------------------------------

export default function SubmitReportPage() {
  return (
    <>
      <Helmet>
        <title> Submitted Report | Yad Byad </title>
      </Helmet>

      <StudentReportsView />
    </>
  );
}
