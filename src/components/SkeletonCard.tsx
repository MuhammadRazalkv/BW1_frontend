import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonCard() {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[125px] w-[240px] bg-gray-300 rounded-xl mt-3" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[240px] bg-gray-300 " />
				<Skeleton className="h-4 w-[190px] bg-gray-300" />
			</div>
		</div>
	);
}
