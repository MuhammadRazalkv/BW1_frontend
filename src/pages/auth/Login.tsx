import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '@/api/user';
const Login = () => {
	const [identifier, setIdentifier] = useState('');
	const [password, setPassword] = useState('');
	const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
	const isPhone = /^[0-9]{10}$/.test(identifier);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const submit = async () => {
		if (!isEmail && !isPhone) {
			setError('Please enter a valid email or phone number');
			return;
		}
		if (password.length < 6) {
			setError('Please enter a valid password');
			return;
		}
		setError('');
		try {
			const data = {
				[isEmail ? 'email' : 'phone']: identifier,
				password,
			};
			const res = await login(data);
			if (res.success) {
                navigate('/dashboard')
			}
		} catch (error) {
			setError(error instanceof Error ? error.message : 'Failed to login');
		}
	};
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Login to your account</CardTitle>
					<CardDescription>Enter your email below to login to your account</CardDescription>
					<CardAction>
						<Link to={'/signup'}>
							{' '}
							<Button variant="link">Sign Up</Button>
						</Link>
					</CardAction>
				</CardHeader>
				<CardContent>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<form>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									value={identifier}
									onChange={(e) => setIdentifier(e.target.value)}
									required
								/>
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Password</Label>
								</div>
								<Input id="password" type="password" onChange={(e) => setPassword(e.target.value.trim())} required />
							</div>
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex-col gap-2">
					<Button type="submit" className="w-full">
						Login
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Login;
