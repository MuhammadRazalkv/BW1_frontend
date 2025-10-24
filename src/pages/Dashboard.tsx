import { SkeletonCard } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
const Dashboard = () => {
	const [loading, setLoading] = useState(true);
	const [articles,setArticles] = useState()
	return (
		<div className="min-h-full">
			<div className="flex justify-end">
				<Link to={'/create-article'}>
					<Button variant="outline" className="rounded-full bg-gray-200 hover:bg-black hover:text-white" size="lg">
						Create <FaPlus />
					</Button>
				</Link>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4">
				<SkeletonCard />
			</div>
		</div>
	);
};

export default Dashboard;
