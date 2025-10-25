import { getArticleList } from '@/api/article';
import ArticleCard from '@/components/ArticleCard';
import { SkeletonCard } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { IArticleList } from '@/interfaces/articleInterface';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [currPage, setCurrentPage] = useState(1);
	const [articles, setArticles] = useState<IArticleList[]>([]);
	const [hasMore, setHasMore] = useState(true);
	useEffect(() => {
		const fetchList = async () => {
			setLoading(true);
			try {
				const res = await getArticleList(currPage);
				console.log('res', res);

				if (res.success) {
					if (currPage === 1) setArticles(res.articles);
					else setArticles((prev) => [...prev, ...res.articles]);

					setHasMore(res.hasMore);
				}
			} catch (error) {
				toast.error(error instanceof Error ? error.message : 'Failed to fetch');
			} finally {
				setLoading(false);
			}
		};
		fetchList();
	}, [currPage]);
	return (
		<div className="min-h-screen ">
		
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{articles.length > 0 &&
					articles.map((article) => <ArticleCard article={article} mode="view" key={article.id} />)}

				{loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
			</div>

			{/* Load More Section */}
			<div className="flex justify-center mt-10">
				<Button
					disabled={!hasMore || loading}
					onClick={() => setCurrentPage((prev) => prev + 1)}
					className={`px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 ${
						hasMore ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
					}`}
				>
					{loading ? 'Loading...' : hasMore ? 'Load More' : 'No More Articles'}
				</Button>
			</div>
		</div>
	);
};

export default Dashboard;
