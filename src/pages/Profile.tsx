import { logout, userInfo } from '@/api/user';
import MyArticles from '@/components/MyArticles';
import PasswordSection from '@/components/PasswordSection';
import PreferenceSection from '@/components/PreferenceSection';
import ProfileInfoSection from '@/components/ProfileInfoSection';
import { Button } from '@/components/ui/button';
import { messages } from '@/constants/messages';
import { IUser } from '@/interfaces/userInterface';
import { logoutDispatch } from '@/redux/authSlice';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
const Profile = () => {
	const [user, setUser] = useState<null | IUser>(null);
	const [activeSection, setActiveSection] = useState('info');
	const dispatch = useDispatch();
	const navigate = useNavigate();
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
				toast.error(error instanceof Error ? error.message : messages.FAILED_TO_FETCH);
			}
		};
		fetchUser();
	}, []);
	const handleLogout = async () => {
		try {
			const res = await logout();
			if (res.success) {
				dispatch(logoutDispatch());
				navigate('/login');
			}
		} catch (error) {
			toast.error('Failed to logout');
		}
	};
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
				<div className="p-4 border-t" onClick={handleLogout}>
					<Button variant="destructive" className="w-full">
						<LogOut /> Logout
					</Button>
				</div>
			</aside>

			{/* Main Content */}
			<main className="flex-1 overflow-y-auto p-4 sm:p-6">
				<div className="max-w-2xl mx-auto h-full">
					{activeSection === 'info' && user && <ProfileInfoSection setUser={setUser} user={user} />}
					{activeSection === 'pref' && <PreferenceSection />}
					<div className="w-full max-w-6xl mx-auto">{activeSection === 'articles' && <MyArticles />}</div>
					{activeSection === 'password' && <PasswordSection />}
				</div>
			</main>
		</div>
	);
};

export default Profile;
