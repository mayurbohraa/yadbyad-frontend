import { Helmet } from 'react-helmet-async';

import { MatchesView } from 'src/sections/matches/view';

// ----------------------------------------------------------------------

export default function MatchesPage() {
  return (
    <>
      <Helmet>
        <title> Matches | Yad Byad </title>
      </Helmet>

      <MatchesView />
    </>
  );
}
