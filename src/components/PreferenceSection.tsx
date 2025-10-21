import { getPreferences } from '@/api/user';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import PreferenceEditDialog from './PreferenceEditDialog';

const PreferenceSection = () => {
	const [preferences, setPreferences] = useState<string[]>([]);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getPreferences();
				if (res.success) {
					setPreferences(res.preferences);
				}
			} catch (error) {
				toast.error(error instanceof Error ? error.message : 'Failed to fetch data');
			}
		};
		fetchData();
	}, []);
	return (
		<div className="flex justify-center items-start  bg-gray-100">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex-shrink-0">
				<PreferenceEditDialog
					isDialogOpen={isDialogOpen}
					setIsDialogOpen={setIsDialogOpen}
					currentPreferences={preferences}
					setPreferences={setPreferences}
				/>
				<div className="flex justify-between">
					<h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2 text-center">
						Your Preferences
					</h2>
					<Button variant={'secondary'} onClick={() => setIsDialogOpen(true)}>
						Edit
					</Button>
				</div>
				<div className="flex flex-col gap-2">
					{preferences.length > 0 ? preferences.map((val) => <Button key={val}>{val}</Button>) : <p>No data found</p>}
				</div>
			</div>
		</div>
	);
};

export default PreferenceSection;
