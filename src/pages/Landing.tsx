import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const Landing = () => {
	return (
		<div className="w-full min-h-screen bg-gray-50 flex flex-col">
			{/* Header */}
			<header className="w-full h-16 bg-white shadow-md flex items-center justify-between px-8">
				<h1 className="text-2xl font-bold text-gray-800">NexaRead</h1>
				<nav className="space-x-4">
					<Link to={'/login'}>
						<Button variant="default">Login</Button>
					</Link>
					<Link to={'/signup'}>
						<Button variant="secondary">Signup</Button>
					</Link>
				</nav>
			</header>

			{/* Hero Section */}
			<main
				className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-0
                 bg-gradient-to-b from-gray-100 via-white to-gray-200 text-gray-900"
			>
				<h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">Welcome to NexaRead</h2>
				<p className="text-gray-600 text-lg md:text-xl mb-8 max-w-xl">
					Read articles tailored to your interests. Add or remove categories, like, dislike, and manage your feed
					effortlessly.
				</p>
				<div className="flex space-x-4">
					<Link to={'/signup'}>
						<Button variant={'default'} size={'lg'}>
							Get started
						</Button>
					</Link>
				</div>
			</main>
		</div>
	);
};

export default Landing;
