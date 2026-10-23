const AUTH_STORAGE_KEY = 'byce_gym_user';
const TOKEN_STORAGE_KEY = 'byce_gym_token';

export const DEMO_PHONE_USERS = [
  {
    role: 'Gym Owner',
    name: 'Alex Vance',
    phone: '9876543210',
    countryCode: '+91',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  },
  {
    role: 'Floor Manager',
    name: 'Sarah Connor',
    phone: '9123456789',
    countryCode: '+91',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80'
  }
];

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function loginWithPhone(phoneNumber, countryCode = '+91') {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const cleanNum = phoneNumber.replace(/\D/g, '');
  if (cleanNum.length < 10) {
    throw new Error('Please enter a valid 10-digit mobile number.');
  }

  const matched = DEMO_PHONE_USERS.find((u) => u.phone === cleanNum);

  const userProfile = {
    id: 'USR-8821',
    name: matched ? matched.name : 'Gym Owner',
    role: matched ? matched.role : 'Authorized Owner',
    phone: `${countryCode} ${cleanNum}`,
    avatar: matched
      ? matched.avatar
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
  };

  const token = `byce_token_${Math.random().toString(36).substring(2)}`;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userProfile));
  localStorage.setItem(TOKEN_STORAGE_KEY, token);

  return userProfile;
}

export function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}
