import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ProtectedRoute = () => {
	const { token } = useSelector((state: RootState) => state.auth);

	if (!token) {
		return <Navigate to="/login" replace />;
	}

	return <Outlet />;
};

export default ProtectedRoute;
