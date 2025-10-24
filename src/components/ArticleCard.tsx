import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IArticle } from '@/interfaces/articleInterface';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { ImBlocked } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
interface ArticleCardProps {
	article: IArticle;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
	const navigate = useNavigate();
	const handleNavigate = (id: string) => {
		navigate(`/edit-article/${id}`);
	};
	return (
		<Card
			className="w-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
			onClick={() => handleNavigate(article.id)}
		>
			{article.imageUrl && <img src={article.imageUrl} alt={article.title} className="w-full h-16 object-contain" />}

			<div className="p-5 flex flex-col justify-between h-full">
				<CardHeader className="p-0 mb-1.5">
					<CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
						{article.title}
					</CardTitle>
				</CardHeader>

				{/* Tags */}
				<CardContent className="p-0 mb-2">
					<div className="flex flex-wrap gap-2">
						{article.tags &&
							article.tags.map((tag: string, index: number) => (
								<span
									key={index}
									className="text-xs sm:text-sm bg-indigo-50 px-2.5 py-1 rounded-full font-medium hover:bg-indigo-100 transition-all duration-200"
								>
									#{tag}
								</span>
							))}
					</div>
				</CardContent>

				<CardFooter className="p-0 mt-auto border-t border-gray-100 pt-4">
					<div className="w-full flex justify-between items-center text-gray-700">
						<span className="flex items-center gap-1.5 text-sm sm:text-base font-medium hover:text-indigo-600 transition-colors duration-200">
							<AiOutlineLike className="text-lg" />
							{article.likes}
						</span>
						<span className="flex items-center gap-1.5 text-sm sm:text-base font-medium hover:text-rose-600 transition-colors duration-200">
							<AiOutlineDislike className="text-lg" />
							{article.dislikes}
						</span>
						<span className="flex items-center gap-1.5 text-sm sm:text-base font-medium hover:text-gray-900 transition-colors duration-200">
							<ImBlocked className="text-lg" />
							{article.blocks}
						</span>
					</div>
				</CardFooter>
			</div>
		</Card>
	);
};

export default ArticleCard;
