import axios from 'axios';
import axiosInstance from './axios';
import { SignupFormData } from '@/constants/signupSchema';
export async function createUser(data: SignupFormData) {
	try {
		const response = await axiosInstance.post('/user', data);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function verifyEmail(token: string) {
	try {
		const response = await axiosInstance.get(`/verify-email?token=${token}`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw err.response;
		}
	}
}
export async function resendVerification(email: string) {
	try {
		const response = await axiosInstance.post(`/resend-verification`, { email });
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function login(data: { email?: string; phone?: string; password: string }) {
	try {
		const response = await axiosInstance.post(`/login`, { data });
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
