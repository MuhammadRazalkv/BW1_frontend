import { SkeletonCard } from '@/components/SkeletonCard';
import { Button } from '@/components/ui/button';
import { FaPlus } from 'react-icons/fa6';
const Dashboard = () => {
	return (
		<div className="min-h-full">
			<div className="flex justify-end">
				<Button variant="outline" className="rounded-full bg-gray-200 hover:bg-black hover:text-white" size="lg">
					Create <FaPlus />
				</Button>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4">
				<SkeletonCard />
				
			</div>
		</div>
	);
};

export default Dashboard;
