import { Helmet } from 'react-helmet-async';

import { UserProfile } from 'src/sections/profile/views';

// ----------------------------------------------------------------------

export default function ProfilePage() {
  return (
    <>
      <Helmet>
        <title> Profile | Yad Byad </title>
      </Helmet>
      <UserProfile />
    </>
  );
}
