import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { IArticle } from '@/interfaces/articleInterface';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { blockArticle, getArticle, toggleReaction } from '@/api/article';
import { Button } from '@/components/ui/button';
import Alert from '@/components/Alert';

const Article = () => {
	const [article, setArticle] = useState<IArticle | null>(null);
	const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	let { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	useEffect(() => {
		if (!id) {
			toast.error('Id not found redirecting back..');
			setTimeout(() => {
				navigate('/dashboard');
			}, 2000);
			return;
		}
		const fetchArticle = async () => {
			try {
				const res = await getArticle(id);
				if (res.success) {
					setArticle(res.article);
					setUserReaction(res.article.userReaction);
				}
			} catch (error: any) {
				if (error.status === 403) {
					toast.info('You’ve blocked this article.');
					navigate('/dashboard');
				} else if (error.status === 404) {
					toast.error('Article not found.');
					navigate('/dashboard');
				} else {
					toast.error(error.message);
				}
			}
		};
		fetchArticle();
	}, []);
	const handleReaction = async (reaction: 'like' | 'dislike') => {
		try {
			if (!article) {
				toast.error('Article not found.');
				return;
			}
			const res = await toggleReaction(article.id, reaction);
			if (res.success) {
				toast.success(res.message || 'Reaction updated.');

				setArticle(
					(prev) =>
						({
							...prev,
							likes: res.likes,
							dislikes: res.dislikes,
						}) as IArticle
				);
				setUserReaction(res.userReaction);
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Failed to give reaction');
		}
	};
	const handleBlock = async () => {
		if (!article) {
			toast.error('Article not found.');
			return;
		}
		try {
			const res = await blockArticle(article?.id);
			if (res.success) {
				toast.success(`You’ve blocked this article, so it’s no longer viewable.`);
				setTimeout(() => {
					navigate('/dashboard');
				}, 2000);
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Failed to update');
		}
	};
	return (
		<div className="min-h-screen  py-10 px-4 flex justify-center">
			{article && (
				<Card className="w-full max-w-3xl bg-white shadow-lg rounded-2xl overflow-hidden">
					<Alert isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} onSubmit={handleBlock} type="block" />
					{/* Article Image */}
					{article.imageUrl && (
						<div className="relative w-full h-72 bg-gray-100 overflow-hidden">
							<img
								src={article.imageUrl}
								alt={article.title}
								className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
							/>
						</div>
					)}

					{/* Header */}
					<CardHeader className="p-6">
						<CardTitle className="text-3xl font-bold text-gray-900">{article.title}</CardTitle>
						<CardDescription className="text-gray-500 text-sm mt-1">
							Category: <span className="font-medium text-gray-700">{article.category}</span>
						</CardDescription>
					</CardHeader>

					{/* Content */}
					<CardContent className="px-6 pb-6 text-gray-800 leading-relaxed space-y-4">
						<Separator />
						<p className="text-base">{article.content}</p>

						{/* Tags */}
						{article.tags && article.tags.length > 0 && (
							<div className="flex flex-wrap gap-2 mt-4">
								{article.tags.map((tag, index) => (
									<Badge key={index} variant="secondary" className="text-sm">
										#{tag}
									</Badge>
								))}
							</div>
						)}
					</CardContent>

					{/* Footer */}
					<CardFooter className="flex justify-between items-center px-6 py-4 border-t border-gray-100">
						{/* Author */}
						<div className="flex items-center gap-3">
							<Avatar>
								<AvatarImage
									src={article.author.profilePic || `https://api.dicebear.com/7.x/initials/svg?seed=${article.author}`}
								/>
								<AvatarFallback>{article.author?.firstName.toUpperCase()}</AvatarFallback>
							</Avatar>
							<div>
								<p className="text-sm font-medium text-gray-700">By {article.author?.firstName}</p>
								<p className="text-xs text-gray-500">
									{article.createdAt && new Date(article.createdAt).toLocaleDateString()}
								</p>
							</div>
						</div>

						<div className="flex items-center gap-5 text-gray-600 text-lg">
							<Button
								variant={userReaction == 'like' ? 'default' : 'ghost'}
								size={'icon-lg'}
								className="flex items-center gap-1 hover:text-blue-600 transition"
								onClick={() => handleReaction('like')}
							>
								<AiOutlineLike /> {article.likes}
							</Button>
							<Button
								variant={userReaction == 'dislike' ? 'destructive' : 'ghost'}
								size={'icon-lg'}
								className="flex items-center gap-1 hover:text-red-500 transition"
								onClick={() => handleReaction('dislike')}
							>
								<AiOutlineDislike /> {article.dislikes}
							</Button>
						</div>
						<Button variant={'destructive'} onClick={() => setIsDialogOpen(true)}>
							Block article
						</Button>
					</CardFooter>
				</Card>
			)}
		</div>
	);
};

export default Article;
