interface DecodedToken {
  sub: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    // JWT tokens are base64 encoded, so we need to decode them
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserRole = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const decodedToken = decodeToken(token);
  if (!decodedToken) return null;

  return decodedToken.role;
};

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decodedToken = decodeToken(token);
  if (!decodedToken) return false;

  // Check if token is expired
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
}; 