import { useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { fieldSchemas } from '@/constants/signupSchema';
import { toast } from 'sonner';
import { updateUserInfo } from '@/api/user';
import { IUser } from '@/interfaces/userInterface';

interface EditDialogProps {
	field: keyof IUser;
	value: string | number;
	isDialogOpen: boolean;
	setIsDialogOpen: (open: boolean) => void;
	setUser: (user: IUser | null) => void;
}

const EditDialog = ({ field, value, isDialogOpen, setIsDialogOpen, setUser }: EditDialogProps) => {
	const [error, setError] = useState('');
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		if (isDialogOpen && value !== undefined) {
			if (field === 'dob' && typeof value === 'string') {
				const parts = value.includes('-') ? value.split('-') : value.split('/');
				const [day, month, year] = parts;
				if (day && month && year) {
					setInputValue(`${year}-${month}-${day}`);
					return;
				}
			}
			setInputValue(value);
		}
	}, [isDialogOpen, value, field]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		if (field == 'profilePic') return;
		const err = validateField(field, inputValue);
		if (err) {
			setError(err);
		} else {
			setError('');
		}
	};

	const validateField = (field: keyof typeof fieldSchemas, value: any) => {
		const schema = fieldSchemas[field];
		const result = schema.safeParse(String(inputValue));
		if (!result.success) {
			return result.error.issues[0].message;
		}
		return null;
	};

	const handleSubmit = async () => {
		if (field == 'profilePic') return;

		const err = validateField(field, String(inputValue));
		if (err) {
			setError(err);
			return;
		} else if (inputValue === value) {
			setError('No changes detected');
			return;
		} else {
			setError('');
			try {
				const res = await updateUserInfo({ field, value: String(inputValue) });
				if (res.success) {
					toast.success(res.message);
					setIsDialogOpen(false);
					setUser(res.user);
				}
			} catch (error) {
				toast.error(error instanceof Error ? error.message : 'Failed to update user info');
			}
		}
	};

	return (
		<Dialog
			open={isDialogOpen}
			onOpenChange={(open) => {
				setIsDialogOpen(open);
				if (!open) {
					setInputValue('');
					setError('');
				}
			}}
		>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit {field}</DialogTitle>
					<DialogDescription>Make changes to your profile here. Click save when you're done.</DialogDescription>
				</DialogHeader>

				{error && <p className="text-red-500 text-xs">{error}</p>}

				<div className="grid grid-cols-4 items-center gap-4">
					<Label htmlFor="input" className="text-right capitalize">
						{field}
					</Label>

					{field === 'dob' ? (
						<Input
							id="input"
							type="date"
							className="col-span-3"
							value={typeof inputValue === 'string' ? inputValue : ''}
							onChange={handleChange}
						/>
					) : (
						<Input
							id="input"
							type={typeof value === 'number' ? 'number' : 'text'}
							className="col-span-3"
							value={inputValue as string | number}
							onChange={handleChange}
						/>
					)}
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

export default EditDialog;
