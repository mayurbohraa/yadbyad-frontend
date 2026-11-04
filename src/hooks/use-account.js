import { useState, useEffect } from 'react';

import { readAccount } from 'src/utils/account';

export default function useAccount() {
  const [account, setAccount] = useState(readAccount);
  useEffect(() => {
    const update = () => setAccount(readAccount());
    window.addEventListener('yadbyad:account-changed', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('yadbyad:account-changed', update);
      window.removeEventListener('storage', update);
    };
  }, []);
  return account;
}
