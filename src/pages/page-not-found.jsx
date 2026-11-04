import { Helmet } from 'react-helmet-async';

import { NotFoundView } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Page not found | Yad Byad</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
