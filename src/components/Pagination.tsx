import React from 'react';
import { Button } from '@/components/ui/button';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const handlePrev = () => {
		if (currentPage > 1) onPageChange(currentPage - 1);
	};

	const handleNext = () => {
		if (currentPage < totalPages) onPageChange(currentPage + 1);
	};

	const handlePageClick = (page: number) => {
		if (page !== currentPage) onPageChange(page);
	};

	// Generate page numbers, can limit to show first/last + nearby pages
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className="flex items-center justify-center space-x-2 mt-4">
			<Button variant="outline" onClick={handlePrev} disabled={currentPage === 1}>
				Prev
			</Button>

			{pages.map((page) => (
				<Button key={page} size={'sm'} variant={page === currentPage ? 'default' : 'outline'} onClick={() => handlePageClick(page)}>
					{page}
				</Button>
			))}

			<Button variant="outline" onClick={handleNext} disabled={currentPage === totalPages}>
				Next
			</Button>
		</div>
	);
};

export default Pagination;
