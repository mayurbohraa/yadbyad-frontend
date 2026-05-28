import { Helmet } from 'react-helmet-async';

import { ManageComplainsView } from 'src/sections/manage_complains/view';

// ----------------------------------------------------------------------

export default function ManageComplainsPage() {
  return (
    <>
      <Helmet>
        <title> Manage Complains | Yad Byad </title>
      </Helmet>

      <ManageComplainsView />
    </>
  );
}
