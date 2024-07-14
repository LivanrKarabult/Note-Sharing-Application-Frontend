import axios from './axiosConfig';

export const login = async (username, password) => {
  try {
    const response = await axios.post('/api/Account/authenticate', {
      username,
      password,
    });

    const { token } = response.data;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
