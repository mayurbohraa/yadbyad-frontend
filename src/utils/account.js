export const PASSWORD_HELP =
  'Use 8–72 characters with uppercase, lowercase, a number, and a symbol.';

export function validPassword(value) {
  return (
    value.length >= 8 &&
    value.length <= 72 &&
    new TextEncoder().encode(value).length <= 72 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /[0-9]/.test(value) &&
    /[^A-Za-z0-9\s]/.test(value)
  );
}

export function readAccount() {
  try {
    const user = JSON.parse(localStorage.getItem('login_status'));
    return user?._id && ['admin', 'part time student', 'special need student'].includes(user.role)
      ? user
      : null;
  } catch {
    return null;
  }
}

export function saveAccount(user, token) {
  localStorage.setItem('login_status', JSON.stringify(user));
  if (token) localStorage.setItem('token_status', token);
  window.dispatchEvent(new Event('yadbyad:account-changed'));
}

export function clearAccount() {
  localStorage.removeItem('login_status');
  localStorage.removeItem('token_status');
  window.dispatchEvent(new Event('yadbyad:account-changed'));
}
