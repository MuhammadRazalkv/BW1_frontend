import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IArticleList } from '@/interfaces/articleInterface';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { ImBlocked } from 'react-icons/im';
import { useNavigate } from 'react-router-dom';
import { MdDeleteOutline } from 'react-icons/md';
import { Button } from './ui/button';

interface ArticleCardProps {
	article: IArticleList;
	mode: 'view' | 'edit';
	setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
	setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, mode, setSelectedId, setIsDialogOpen }) => {
	const navigate = useNavigate();
	const handleNavigate = (id: string) => {
		navigate(mode == 'edit' ? `/edit-article/${id}` : `/article/${id}`);
	};

	return (
		<Card className="relative w-full bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 cursor-pointer group h-[340px] flex flex-col justify-between">
			{/* Delete button */}
			{mode === 'edit' && (
				<Button
					size="icon-sm"
					variant="destructive"
					className="absolute top-2 right-2 z-20 rounded-full opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
					onClick={(e) => {
						e.stopPropagation();
						setIsDialogOpen(true);
						setSelectedId(article.id);
					}}
				>
					<MdDeleteOutline />
				</Button>
			)}

			{/* Clickable Content */}
			<div onClick={() => handleNavigate(article.id)} className="flex flex-col flex-1">
				{/* Article image */}
				{article.imageUrl && (
					<img
						src={article.imageUrl}
						alt={article.title}
						className={`w-full ${mode === 'edit' ? 'h-28 object-contain p-2' : 'h-36 object-cover'} rounded-t-2xl`}
					/>
				)}

				{/* Content section */}
				<div className="p-5 flex flex-col justify-between flex-1">
					{/* Title */}
					<CardHeader className="p-0 mb-2">
						<CardTitle className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2 hover:text-indigo-600 transition-colors duration-200">
							{article.title.slice(0,15)}.....
						</CardTitle>
					</CardHeader>

					{/* Tags (limited to 3 for layout consistency) */}
					<CardContent className="p-0 mb-4 flex-1">
						<div className="flex flex-wrap gap-2">
							{article.tags?.slice(0, 3).map((tag: string, index: number) => (
								<span
									key={index}
									className="text-xs sm:text-sm bg-indigo-50 px-2.5 py-1 rounded-full font-medium hover:bg-indigo-100 transition-all duration-200"
								>
									#{tag}
								</span>
							))}
							{article.tags && article.tags.length > 3 && (
								<span className="text-xs sm:text-sm text-gray-500">+{article.tags.length - 3}</span>
							)}
						</div>
					</CardContent>

					{/* Footer with reactions */}
					<CardFooter className="p-0 mt-auto border-t border-gray-100 pt-3">
						<div className="w-full flex justify-between items-center text-gray-700">
							<span className="flex items-center gap-1.5 text-sm sm:text-base font-medium hover:text-indigo-600 transition-colors duration-200 cursor-pointer">
								<AiOutlineLike className="text-lg" />
								{article.likes}
							</span>
							<span className="flex items-center gap-1.5 text-sm sm:text-base font-medium hover:text-rose-600 transition-colors duration-200 cursor-pointer">
								<AiOutlineDislike className="text-lg" />
								{article.dislikes}
							</span>
							{mode === 'edit' && (
								<span className="flex items-center gap-1.5 text-sm sm:text-base font-medium text-gray-900">
									<ImBlocked className="text-lg" />
									{article.blocks}
								</span>
							)}
						</div>
					</CardFooter>
				</div>
			</div>
		</Card>
	);
};

export default ArticleCard;
