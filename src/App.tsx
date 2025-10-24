import './App.css';
import { Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import PublicRoute from './routes/PublicRoute';
import Signup from './pages/auth/Signup';
import LinkSent from './pages/auth/LinkSent';
import Login from './pages/auth/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import CreateArticle from './pages/CreateArticle';
import NotFound from './pages/NotFound';
import EditArticle from './pages/EditArticle';
function App() {
	return (
		<>
			<Routes>
				<Route element={<PublicRoute />}>
					<Route path="/" element={<Landing />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/verify-email" element={<LinkSent />} />
					<Route path="/login" element={<Login />} />
				</Route>
				{/* Protected Route  */}
				<Route element={<ProtectedRoute />}>
					<Route element={<Layout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route path="/profile" element={<Profile />} />
						<Route path="/create-article" element={<CreateArticle />} />
						<Route path="/edit-article/:id" element={<EditArticle />} />
					</Route>
				</Route>
				<Route path="/*" element={<NotFound />} />
			</Routes>
		</>
	);
}

export default App;
