import { Helmet } from 'react-helmet-async';

import { ReportSlotsView } from 'src/sections/report_slots/view';

// ----------------------------------------------------------------------

export default function ReportSlotsPage() {
  return (
    <>
      <Helmet>
        <title> Report Slots | Yad Byad </title>
      </Helmet>

      <ReportSlotsView />
    </>
  );
}
