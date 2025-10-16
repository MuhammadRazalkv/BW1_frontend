import { resendVerification, verifyEmail } from '@/api/user';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
const LinkSent = () => {
	const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
	const [message, setMessage] = useState('');
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const email = localStorage.getItem('email');
	const navigate = useNavigate();
	useEffect(() => {
		if (token) {
			const fetchEmailStatus = async () => {
				try {
					const res = await verifyEmail(token);
					if (res.success) {
						setStatus('success');
						setMessage(res.message + ' Redirecting to login page..');
						localStorage.clear();
						setTimeout(() => {
							navigate('/login');
						}, 3000);
					}
				} catch (error) {
					setStatus('error');
					setMessage(error instanceof Error ? error.message : 'Link expired or invalid. Please request a new one.');
				}
			};
			fetchEmailStatus();
		} else {
			setMessage('We’ve sent a verification link to your email.');
		}
	}, [token]);

	const handleResend = async () => {
		try {
			if (email) {
				const res = await resendVerification(email);
				if (res.success) {
					setMessage(res.message || 'A new verification link has been sent to your email!');
				}
				setStatus('pending');
			} else {
				setMessage('Email not found');
			}
		} catch (error) {
			setMessage(error instanceof Error ? error.message : 'Failed to send verification email!.');
		}
	};

	return (
		<div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
			<Card className="w-[90%] sm:w-[400px] text-center shadow-xl border border-gray-200">
				<CardHeader>
					<CardTitle className="text-xl font-semibold">
						{status === 'success' ? 'Email Verified!' : status === 'error' ? 'Verification Failed' : 'Check Your Email'}
					</CardTitle>
				</CardHeader>

				<CardContent>
					<p className="text-gray-600 mb-4">{message}</p>
				</CardContent>

				{status === 'error' && (
					<CardFooter className="flex justify-center">
						<Button onClick={handleResend}>Resend Link</Button>
					</CardFooter>
				)}
			</Card>
		</div>
	);
};

export default LinkSent;
