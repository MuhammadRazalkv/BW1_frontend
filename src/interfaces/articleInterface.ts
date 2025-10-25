export interface IArticle {
	id: string;
	title: string;
	content: string;
	imageUrl?: string;
	category: string;
	author: { _id: string; firstName: string ,profilePic?:string };
	likes: number;
	dislikes: number;
	blocks: number;
	tags?: string[];
	createdAt?: string;
	userReaction: 'like'| 'dislike' | null
}

export interface IArticleList {
	id: string;
	title: string;
	imageUrl?: string;
	category: string;
	likes: number;
	dislikes: number;
	blocks: number;
	tags?: string[];
	createdAt?: string;
}
