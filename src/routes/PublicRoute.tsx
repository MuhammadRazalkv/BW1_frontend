import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const PublicRoute = () => {
	const { isLoggedIn } = useSelector((state: RootState) => state.auth);
	if (isLoggedIn) {
		return <Navigate to="/dashboard" replace />;
	}
	return <Outlet />;
};

export default PublicRoute;
