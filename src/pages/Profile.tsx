import { userInfo } from '@/api/user';
import PasswordSection from '@/components/PasswordSection';
import PreferenceSection from '@/components/PreferenceSection';
import ProfileInfoSection from '@/components/ProfileInfoSection';
import { Button } from '@/components/ui/button';
import { IUser } from '@/interfaces/userInterface';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
const Profile = () => {
	const [user, setUser] = useState<null | IUser>(null);
	const [activeSection, setActiveSection] = useState('info');

	const sections = [
		{ id: 'info', label: 'Personal Info' },
		{ id: 'pref', label: 'Preferences' },
		{ id: 'articles', label: 'My Articles' },
		{ id: 'password', label: 'Change Password' },
	];

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await userInfo();
				if (res.success) {
					setUser(res.user);
				}
			} catch (error) {
				toast.error(error instanceof Error ? error.message : 'Failed to fetch user info');
			}
		};
		fetchUser();
	}, []);
	return (
		<div className="h-full flex flex-col md:flex-row overflow-hidden">
			{/* Sidebar */}
			<aside className="w-full md:w-48 lg:w-56 shadow-2xl bg-white border-b md:border-b-0 md:border-r ml-2 flex-shrink-0">
				<div className="flex md:flex-col overflow-x-auto md:overflow-x-visible p-2 md:p-4 gap-2 md:gap-3">
					{sections.map((section) => (
						<Button
							variant={activeSection === section.id ? 'default' : 'outline'}
							key={section.id}
							onClick={() => setActiveSection(section.id)}
							className="whitespace-nowrap text-xs sm:text-sm md:text-base px-3 py-2 md:w-full rounded-lg transition-colors"
						>
							{section.label}
						</Button>
					))}
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 overflow-y-auto p-4 sm:p-6">
				<div className="max-w-2xl mx-auto h-full">
					{activeSection === 'info' && user && <ProfileInfoSection setUser={setUser} user={user} />}
					{activeSection === 'pref' && (
						<PreferenceSection />
					)}
					{activeSection === 'articles' && (
						<div className="bg-white rounded-lg shadow-md p-6">
							<p>List your articles here.</p>
						</div>
					)}
					{activeSection === 'password' && (
						<PasswordSection />
					)}
				</div>
			</main>
		</div>
	);
};

export default Profile;
