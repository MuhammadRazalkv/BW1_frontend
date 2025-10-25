import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { IArticle, IArticleList } from '@/interfaces/articleInterface';
import ArticleCard from './ArticleCard';
import { toast } from 'sonner';
import { deleteArticle, getUserArticles } from '@/api/article';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { FaPlus } from 'react-icons/fa6';
import Alert from './Alert';

const MyArticles = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [articles, setArticles] = useState<IArticle[] | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const res = await getUserArticles(currentPage);
				if (res.success) {
					setArticles(res.articles);
					setTotalPages(res.totalPages);
				}
			} catch (error) {
				toast.error(error instanceof Error ? error.message : 'Failed to fetch');
			}
		};
		fetchArticles();
	}, [currentPage]);

	const handleDelete = async (articleId: string) => {
		try {
			const res = await deleteArticle(articleId);
			if (res.success) {
				toast.success(res.message || 'Article deleted');
				setArticles((pre) => pre?.filter((ar) => ar.id !== selectedId) || null);
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to delete article.');
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-3 flex flex-col items-center">
			<Alert
				isOpen={isDialogOpen}
				onSubmit={() => selectedId && handleDelete(selectedId)}
				setIsOpen={setIsDialogOpen}
				type="delete"
			/>
			<div className="flex justify-end items-center mb-8">
				<Link to="/create-article">
					<Button
						variant="outline"
						className="flex items-center gap-2 rounded-full bg-gray-200 text-gray-700 hover:bg-black hover:text-white transition-all duration-300"
						size="lg"
					>
						<FaPlus className="text-lg" />
						Create
					</Button>
				</Link>
			</div>
			<div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
				{articles?.length ? (
					articles.map((article) => (
						<ArticleCard
							mode="edit"
							key={article.id}
							article={article}
							setIsDialogOpen={setIsDialogOpen}
							setSelectedId={setSelectedId}
						/>
					))
				) : (
					<p className="col-span-full text-center text-gray-500 text-lg">No articles created yet. Create one now!</p>
				)}
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="mt-8 flex justify-center">
					<Pagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} />
				</div>
			)}
		</div>
	);
};

export default MyArticles;
