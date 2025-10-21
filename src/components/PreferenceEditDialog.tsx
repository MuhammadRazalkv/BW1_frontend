import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog';

import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { CATEGORIES } from '@/constants/categories';
import {  updateUserPref } from '@/api/user';
import { toast } from 'sonner';
const PreferenceEditDialog = ({
	isDialogOpen,
	currentPreferences,
	setIsDialogOpen,
	setPreferences,
}: {
	isDialogOpen: boolean;
	currentPreferences: string[];
	setIsDialogOpen: (key: boolean) => void;
	setPreferences: (value: string[]) => void;
}) => {
	const [selected, setSelected] = useState<string[]>([]);
	const [error, setError] = useState('');
	useEffect(() => {
		if (currentPreferences && currentPreferences.length > 0) {
			setSelected(currentPreferences);
		}
	}, [currentPreferences]);

	const handleToggle = (pref: string) => {
		setSelected((prev) => (prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]));
	};

	const handleSubmit = async () => {
    setError('')
		if (!selected.length) {
			setError('Add minimum of one preferences');
			return;
		}
		try {
			const res = await updateUserPref(selected);
			if (res.success) {
				toast.success(res.message);
				setPreferences(res.preferences);
				setIsDialogOpen(false);
			}
		} catch (error) {
			toast.error(error instanceof Error ? error.message : 'Failed to update preferences');
		}
	};

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(open) => {
				setIsDialogOpen(open);
				if (!open) {
					setSelected(currentPreferences);
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit</DialogTitle>
					<DialogDescription>Make changes to your preference here. Click save when you're done.</DialogDescription>
				</DialogHeader>

				{error && <p className="text-red-500 text-xs">{error}</p>}

				<div className="grid grid-cols-4 items-center gap-4">
					<div className="flex flex-wrap gap-2">
						{CATEGORIES.map((pref) => (
							<Button
								key={pref}
								variant={selected.includes(pref) ? 'default' : 'outline'}
								onClick={() => handleToggle(pref)}
							>
								{pref}
							</Button>
						))}
					</div>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" onClick={handleSubmit}>
						Save changes
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default PreferenceEditDialog;
