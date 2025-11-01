import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
	const location = useLocation();

	return (
		<nav className="mt-2 mb-0.5 w-[95%] mx-auto h-16 shadow-lg shadow-gray-300 rounded-full bg-white text-gray-800 flex items-center justify-between px-6">
			<h1 className="text-xl font-bold tracking-wide">NexaRead</h1>

			<div className="flex gap-6 text-base font-medium">
				<Link
					to="/dashboard"
					className={`${
						location.pathname === '/dashboard' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
					} transition`}
				>
					Dashboard
				</Link>

				<Link
					to="/profile"
					className={`${
						location.pathname === '/profile' ? 'text-blue-600 font-semibold' : 'hover:text-blue-500'
					} transition`}
				>
					Profile
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
