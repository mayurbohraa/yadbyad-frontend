import { Helmet } from 'react-helmet-async';

import { SlotRequest } from 'src/sections/request-slots/view';
// ----------------------------------------------------------------------

export default function SessionRequestsPage() {
  return (
    <>
      <Helmet>
        <title> Session Requests | Yad Byad </title>
      </Helmet>

      <SlotRequest />
    </>
  );
}
