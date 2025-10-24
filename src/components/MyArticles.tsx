import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { IArticle } from '@/interfaces/articleInterface';
import ArticleCard from './ArticleCard';
import { toast } from 'sonner';
import { getUserArticles } from '@/api/article';

const MyArticles = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [articles, setArticles] = useState<IArticle[] | null>(null);
	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const res = await getUserArticles();
				if (res.success) {
					setArticles(res.articles);
					console.log(res.articles);

					setTotalPages(res.totalPages);
				}
			} catch (error) {
				toast.error(error instanceof Error ? error.message : 'Failed to fetch');
			}
		};
		fetchArticles();
	}, []);
	return (
		<div className="min-h-screen bg-gray-100 py-3 flex flex-col items-center">
			{/* Articles Grid */}
			<div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
				{articles?.length ? (
					articles.map((article) => <ArticleCard key={article.id} article={article} />)
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
