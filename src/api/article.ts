import { ArticleFormData } from '@/constants/articleSchema';
import axiosInstance from './articleInstance';
import axios from 'axios';

export async function createArticle(formData: FormData) {
	try {
		const response = await axiosInstance.post('/article', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
