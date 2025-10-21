import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { passwordSchema } from '@/constants/passwordSchema';
import { changePassword } from '@/api/user';
import { toast } from 'sonner';

const PasswordSection = () => {
	const [error, setError] = useState('');
	const [currPassword, setCurrPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfPassword] = useState('');
	const handleSubmit = async () => {
		setError('');
		if (!currPassword || !newPassword || !confirmPassword) {
			setError('All fields are required');
			return;
		}
		const data = passwordSchema.safeParse({ currentPassword: currPassword, newPassword, confirmPassword });

		if (!data.success) {
			setError(data.error.issues[0].message);
			return;
		}
		try {
			const res = await changePassword(currPassword, newPassword);
			if (res.success) {
				toast.success('Password updated successfully');
				setCurrPassword('');
				setNewPassword('');
				setConfPassword('');
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Failed to update password');
		}
	};
	return (
		<div className="flex justify-center items-start  bg-gray-100">
			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex-shrink-0">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2 text-center">
					Change your password
				</h2>
				<div className="flex flex-col gap-2">
					{error && <p className="text-red-500 text-sm">{error}</p>}

					<Label htmlFor="currPassword">Current Password </Label>
					<Input
						id="currPassword"
						type="password"
						onChange={(e) => setCurrPassword(e.target.value)}
						value={currPassword}
					/>
					<Label htmlFor="password">New Password </Label>
					<Input id="password" type="password" onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
					<Label htmlFor="confirmPass">Confirm Password </Label>
					<Input
						id="confirmPass"
						type="password"
						onChange={(e) => setConfPassword(e.target.value)}
						value={confirmPassword}
					/>
					<Button onClick={handleSubmit}>Save changes</Button>
				</div>
			</div>
		</div>
	);
};

export default PasswordSection;
