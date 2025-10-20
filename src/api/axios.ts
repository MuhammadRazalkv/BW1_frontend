import { loginDispatch } from '@/redux/authSlice';
import { store } from '@/redux/store';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/users`,
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
			originalRequest._retry = true;
			try {
				const { data } = await axiosInstance.post('/refresh');
				const dispatch = store.dispatch;
				dispatch(loginDispatch({ token: data.accessToken }));
				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
				return axiosInstance(originalRequest);
			} catch (err) {
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
