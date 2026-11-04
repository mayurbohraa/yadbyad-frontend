import toast from 'react-hot-toast';
import { useRef, useEffect } from 'react';

export default function useApiRefresh(refresh, resources) {
  const latest = useRef({ refresh, resources });
  latest.current = { refresh, resources };

  useEffect(() => {
    let active = true;
    let refreshing = false;
    let queued = false;

    const refreshData = async () => {
      if (refreshing) {
        queued = true;
        return;
      }
      refreshing = true;
      queued = false;
      try {
        await latest.current.refresh();
      } catch {
        if (active)
          toast.error('Saved, but the updated list could not be loaded. Please try again.');
      } finally {
        refreshing = false;
        // Coalesce overlapping saves without letting an older response win.
        if (queued && active) refreshData();
      }
    };

    const onMutation = (event) => {
      if (latest.current.resources.some((prefix) => event.detail.url.startsWith(prefix)))
        refreshData();
    };
    window.addEventListener('yadbyad:data-changed', onMutation);
    return () => {
      active = false;
      window.removeEventListener('yadbyad:data-changed', onMutation);
    };
  }, []);
}
