import './App.css';
import { Route, Routes } from 'react-router';
import Landing from './pages/Landing';
import PublicRoute from './routes/PublicRoute';
import Signup from './pages/auth/Signup';
import LinkSent from './pages/auth/LinkSent';
import Login from './pages/auth/Login';
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
			</Routes>
		</>
	);
}

export default App;
