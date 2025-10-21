export interface ProfileInfoProps {
	user: IUser;
	setUser: (user: IUser | null) => void;
}
import { Default_Pfp } from '@/assets';
import { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import EditDialog from './EditDialog';
import { IUser } from '@/interfaces/userInterface';
import { toast } from 'sonner';
import { updateUserProfileImage } from '@/api/user';

const ProfileInfoSection = ({ user, setUser }: ProfileInfoProps) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [toUpdate, setToUpdate] = useState<{ field: keyof IUser; value: string | number }>();

	const handleOnClick = (field: keyof IUser, value: string | number) => {
		if (field !== 'email') {
			setIsDialogOpen(true);
			setToUpdate({ field, value });
		}
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
		const maxSize = 2 * 1024 * 1024; // 2MB

		if (!validTypes.includes(file.type)) {
			toast.error('Only JPG, PNG, or WEBP images are allowed.');
			return;
		}

		if (file.size > maxSize) {
			toast.error('File size must be less than 2MB.');
			return;
		}

		const formData = new FormData();
		formData.append('profilePic', file);

		try {
			const res = await updateUserProfileImage(formData);
			if (res.success) {
				if (!user) return;

				setUser({
					...user,
					profilePic: res.url,
				});
				console.log(user);
				
				toast.success('Profile image updated successfully.');
			}
		} catch (err) {
			toast.error('Failed to upload image.');
			console.error(err);
		}
	};

	return (
		<>
			<div className="flex justify-center items-start  bg-gray-100">
				{toUpdate && (
					<EditDialog
						isDialogOpen={isDialogOpen}
						setIsDialogOpen={setIsDialogOpen}
						field={toUpdate.field}
						value={toUpdate.value}
						setUser={setUser}
					/>
				)}

				<div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 flex-shrink-0">
					{/* Profile Picture */}
					<div className="text-center mb-4">
						<div className="relative w-32 h-32 mx-auto hover:opacity-90 transition">
							<input type="file" id="profilePicInput" className="hidden" accept="image/*" onChange={handleFileChange} />
							<label htmlFor="profilePicInput" className="cursor-pointer block w-full h-full">
								<img
									src={user.profilePic ?? Default_Pfp}
									alt="User profile"
									className="rounded-full w-full h-full object-cover border-4 border-purple-200"
								/>
								<div className="absolute bottom-2 right-2 bg-purple-600 p-1 rounded-full border-2 border-white shadow-md">
									<MdEdit className="text-white text-lg" />
								</div>
							</label>
						</div>
					</div>

					{/* Section Title */}
					<h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2 text-center">
						Personal Information
					</h2>

					{/* Info Rows */}
					<div className="flex flex-col gap-2">
						{(
							[
								{ label: 'First Name', field: 'firstName', value: user.firstName },
								{ label: 'Last Name', field: 'lastName', value: user.lastName },
								{ label: 'Email', field: 'email', value: user.email },
								{ label: 'Date of Birth', field: 'dob', value: new Date(user.dob).toLocaleDateString() },
								{ label: 'Phone', field: 'phone', value: user.phone },
							] as { label: string; field: keyof IUser; value: string | number }[]
						).map(({ label, field, value }) => (
							<div
								key={field}
								onClick={() => handleOnClick(field, value)}
								className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-xl transition cursor-pointer"
							>
								<p className="text-gray-600 font-medium">{label}</p>
								<div className="flex gap-2 items-center">
									<p className="text-gray-800 font-semibold">{value}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProfileInfoSection;
