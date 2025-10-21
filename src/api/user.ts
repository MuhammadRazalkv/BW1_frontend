import axios from 'axios';
import axiosInstance from './axios';
import { SignupFormData } from '@/constants/signupSchema';
import { IUser } from '@/interfaces/userInterface';
export async function createUser(data: SignupFormData) {
	try {
		const response = await axiosInstance.post('/user', data);
		return response.data;
	} catch (err) {
		console.log(err);
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
		const response = await axiosInstance.post(`/login`, data);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function userInfo() {
	try {
		const response = await axiosInstance.get(`/user`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}

export async function updateUserInfo(data: { field: keyof IUser; value: string }) {
	try {
		const response = await axiosInstance.patch(`/user`, data);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function updateUserProfileImage(formData: FormData) {

	try {
		const response = await axiosInstance.post('/upload-profile', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function updateUserPref(value: string[]) {
	try {
		const response = await axiosInstance.patch(`/preferences`, value);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function getPreferences() {
	try {
		const response = await axiosInstance.get(`/preferences`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function changePassword(currentPassword: string, newPassword: string) {
	try {
		const response = await axiosInstance.patch(`/change-password`, { currentPassword, newPassword });
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
