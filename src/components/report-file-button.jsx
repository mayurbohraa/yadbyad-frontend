import { useState } from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';

import LoadingButton from '@mui/lab/LoadingButton';

import axios from 'src/api/axios';

export default function ReportFileButton({ reportId, filename }) {
  const [loading, setLoading] = useState(false);

  const openFile = async () => {
    if (loading) return;
    const preview = window.open('about:blank', '_blank');
    if (preview) preview.opener = null;
    setLoading(true);
    try {
      const { data, headers } = await axios.get(`/reports/${reportId}/file`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(data);
      if (preview && !preview.closed && data.type !== 'application/octet-stream') {
        preview.location.replace(url);
      } else {
        preview?.close();
        const link = document.createElement('a');
        link.href = url;
        link.download =
          /filename="([^"]+)"/.exec(headers['content-disposition'] || '')?.[1] ||
          filename ||
          'report';
        link.click();
      }
      window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) {
      preview?.close();
      toast.error(
        error.response?.status === 404
          ? 'This attachment is unavailable.'
          : 'Unable to open the attachment. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton variant="contained" size="small" loading={loading} onClick={openFile}>
      View File
    </LoadingButton>
  );
}

ReportFileButton.propTypes = {
  reportId: PropTypes.string.isRequired,
  filename: PropTypes.string,
};
