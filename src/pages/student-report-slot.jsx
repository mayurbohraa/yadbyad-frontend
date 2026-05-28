import { Helmet } from 'react-helmet-async';

import { StudentReportsSlotView } from 'src/sections/student_report_slots/view';

// ----------------------------------------------------------------------

export default function StudentReportSlotPage() {
  return (
    <>
      <Helmet>
        <title> Report Slot | Yad Byad </title>
      </Helmet>

      <StudentReportsSlotView />
    </>
  );
}
