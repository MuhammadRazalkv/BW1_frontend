export interface IArticle {
	id: string;
	title: string;
	content: string;
	imageUrl?: string;
	category: string;
	author: string;
	likes: number;
	dislikes: number;
	blocks: number;
	tags?: string[];
	createdAt?: string;
}
