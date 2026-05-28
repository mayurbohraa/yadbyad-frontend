import { Helmet } from 'react-helmet-async';

import { SessionRequestView } from 'src/sections/session_requests/view';

// ----------------------------------------------------------------------

export default function SessionRequestsPage() {
  return (
    <>
      <Helmet>
        <title> Session Requests | Yad Byad </title>
      </Helmet>

      <SessionRequestView />
    </>
  );
}
