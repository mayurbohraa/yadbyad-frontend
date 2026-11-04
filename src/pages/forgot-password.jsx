import { Helmet } from 'react-helmet-async';

import AuthLayout from 'src/layouts/auth';
import { ForgotPasswordForm } from 'src/forms/forgot_pasword';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout title="Reset your password">
      <Helmet>
        <title>Reset Password | Yad Byad</title>
      </Helmet>
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
