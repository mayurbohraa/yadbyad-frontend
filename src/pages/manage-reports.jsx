import { Helmet } from 'react-helmet-async';

import { ManageReportsView } from 'src/sections/manage_reports/view';

// ----------------------------------------------------------------------

export default function ManageReportsPage() {
  return (
    <>
      <Helmet>
        <title> Manage Reports | Yad Byad </title>
      </Helmet>

      <ManageReportsView />
    </>
  );
}
