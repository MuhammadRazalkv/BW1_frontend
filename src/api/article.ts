import axiosInstance from './articleInstance';
import axios from 'axios';

export async function createArticle(formData: FormData) {
	try {
		const response = await axiosInstance.post('/article', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response.data;
	} catch (err: any) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		} else {
			throw new Error('Network error or unexpected issue');
		}
	}
}

export async function getUserArticles() {
	try {
		const response = await axiosInstance.get('/articles');
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function getArticle(id: string) {
	try {
		const response = await axiosInstance.get(`/article/${id}`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function updateArticle(formData: FormData) {
	try {
		const response = await axiosInstance.put(`/article`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
