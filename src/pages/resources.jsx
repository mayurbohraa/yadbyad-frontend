import { Helmet } from 'react-helmet-async';

import { ResourcesView } from 'src/sections/student_resource/view';

// ----------------------------------------------------------------------

export default function ResourcesPage() {
  return (
    <>
      <Helmet>
        <title> Resources | Yad Byad </title>
      </Helmet>

      <ResourcesView />
    </>
  );
}
