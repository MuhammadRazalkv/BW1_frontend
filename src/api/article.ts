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

export async function getUserArticles(page:number = 1) {
	try {
		const response = await axiosInstance.get(`/articles?page=${page}`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		} else {
			throw new Error('Network error or unexpected issue');
		}
	}
}

export async function getArticle(id: string) {
	try {
		const response = await axiosInstance.get(`/article/${id}`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			const statusCode = err.response.status;
			const message = err.response.data?.message || 'Something went wrong';
			throw { status: statusCode, message };
		} else {
			throw { status: 0, message: 'Network error or unexpected issue' };
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

export async function getArticleList(page: number) {
	try {
		const response = await axiosInstance.get(`/article-list?page=${page}`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function toggleReaction(articleId: string, reaction: 'like' | 'dislike') {
	try {
		const response = await axiosInstance.patch(`/reaction`, {
			articleId,
			reaction,
		});
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function blockArticle(articleId: string) {
	try {
		const response = await axiosInstance.patch(`/block`, { articleId });
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
export async function deleteArticle(articleId: string) {
	try {
		const response = await axiosInstance.delete(`/delete?articleId=${articleId}`);
		return response.data;
	} catch (err) {
		if (axios.isAxiosError(err) && err.response) {
			throw new Error(err.response.data.message);
		}
	}
}
