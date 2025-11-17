import { IArticleList } from "@/interfaces/articleInterface";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ArticleCard from "./ArticleCard";
import { deleteArticle, getBlockedArticles, unblockArticle } from "@/api/article";
import Pagination from "./Pagination";
import Alert from "./Alert";

const BlockedArticles = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [articles, setArticles] = useState<IArticleList[] | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const res = await getBlockedArticles(currentPage);
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

	const handleUnblock = async (articleId: string) => {
		try {
			const res = await unblockArticle(articleId);
			if (res.success) {
				toast.success(res.message || 'Article unblocked');
				setArticles((pre) => pre?.filter((ar) => ar.id !== selectedId) || null);
			}
		} catch (error: any) {
			toast.error(error.message || 'Failed to update article.');
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 py-3 flex flex-col items-center">
			<Alert
				isOpen={isDialogOpen}
				onSubmit={() => selectedId && handleUnblock(selectedId)}
				setIsOpen={setIsDialogOpen}
				type="delete"
			/>
			<div className="w-full max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
				{articles?.length ? (
					articles.map((article) => (
						<ArticleCard
							mode="block"
							key={article.id}
							article={article}
							setIsDialogOpen={setIsDialogOpen}
							setSelectedId={setSelectedId}
						/>
					))
				) : (
					<p className="col-span-full text-center text-gray-500 text-lg">No blocked articles.</p>
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

export default BlockedArticles;
