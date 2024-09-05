import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_REACT_API_BACKEND,
  headers: {
    'ngrok-skip-browser-warning': 'true' // Menambahkan header untuk melewati peringatan ngrok
  }
});

// Fungsi untuk mendapatkan token baru
const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh');
  try {
    const response = await axios.post(`${process.env.REACT_APP_REACT_API_BACKEND}/auth/refresh`, { refresh_token: refresh });
    localStorage.setItem('access', response.data.access_token);
    console.log('cek',response)
    return response.data.access_token;
  } catch (error) {
    console.error('Unable to refresh token', error);
    throw error;
  }
};

// Interceptor untuk request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await refreshToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        // Opsional: Arahkan pengguna ke halaman login jika refresh token gagal
        window.location.href = '/login';
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);