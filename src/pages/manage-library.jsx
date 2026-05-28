import { Helmet } from 'react-helmet-async';

import { ManageLibraryView } from 'src/sections/manage_library/view';

// ----------------------------------------------------------------------

export default function ManageLibraryPage() {
  return (
    <>
      <Helmet>
        <title> Manage Library | Yad Byad </title>
      </Helmet>

      <ManageLibraryView />
    </>
  );
}
