import { loginDispatch, logoutDispatch } from '@/redux/authSlice';
import { store } from '@/redux/store';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/articles`,
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = store.getState().auth.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			const dispatch = store.dispatch;
			originalRequest._retry = true;
			try {
				const { data } = await axios.post('/users/refresh');

				dispatch(loginDispatch({ token: data.accessToken }));
				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
				return axiosInstance(originalRequest);
			} catch (err) {
				dispatch(logoutDispatch());
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
