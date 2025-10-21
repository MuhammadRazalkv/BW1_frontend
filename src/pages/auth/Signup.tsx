import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, SignupFormData } from '@/constants/signupSchema';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CATEGORIES } from '@/constants/categories';
import { createUser } from '@/api/user';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
		setValue,
		watch,
	} = useForm<SignupFormData>({
		resolver: zodResolver(signupSchema),
		defaultValues: { preferences: [] },
	});

	const preferences = watch('preferences');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const togglePreference = (category: string) => {
		const current = preferences || [];
		if (current.includes(category)) {
			setValue(
				'preferences',
				current.filter((c) => c !== category)
			);
		} else {
			setValue('preferences', [...current, category]);
		}
	};

	const onSubmit = async (data: SignupFormData) => {

		try {
			setError('');
			const res = await createUser(data);
			if (res.success) {
				navigate('/verify-email');
				localStorage.setItem('email', res.email);
			}
		} catch (error) {
			
			if (error instanceof Error) {
				setError(error.message as string);
			} else {
				setError('Unexpected error occurred');
			}
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<Card className="w-full max-w-md">
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardHeader>
						<CardTitle className="text-xl text-center">Create Account</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Name fields */}
						{error && <p className="text-red-500 text-sm">{error}</p>}

						<div className="flex gap-2">
							<div className="flex-1">
								<Input {...register('firstName')} placeholder="First Name" />
								{errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
							</div>
							<div className="flex-1">
								<Input {...register('lastName')} placeholder="Last Name" />
								{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
							</div>
						</div>

						{/* Email */}
						<div>
							<Input {...register('email')} placeholder="Email" />
							{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
						</div>

						{/* Phone */}
						<div>
							<Input {...register('phone')} type="number" placeholder="Phone" />
							{errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
						</div>

						{/* DOB */}
						<div>
							<Input {...register('dob')} type="date" />
							{errors.dob && <p className="text-red-500 text-sm">{errors.dob.message}</p>}
						</div>

						{/* Password */}
						<div>
							<Input {...register('password')} type="password" placeholder="Password" />
							{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
						</div>

						<div>
							<Input {...register('confirmPassword')} type="password" placeholder="Confirm Password" />
							{errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
						</div>

						{/* Preferences */}
						<div className="mb-2">
							<p className="font-medium mb-2">Preferences:</p>
							{errors.preferences && <p className="text-red-500 text-sm">{errors.preferences.message}</p>}
							<div className="flex flex-wrap gap-2">
								{CATEGORIES.map((category) => (
									<Button
										type="button"
										key={category}
										size="sm"
										className={`${preferences?.includes(category) ? 'bg-blue-400 text-white' : 'bg-gray-100 text-black'}`}
										onClick={() => togglePreference(category)}
									>
										{category}
									</Button>
								))}
							</div>
						</div>
					</CardContent>
					<CardFooter className="w-full flex justify-center items-center">
						<Button type="submit" size={'lg'} >
							Sign Up
						</Button>
					</CardFooter>
					<Link className="text-xs ml-2 text-blue-500" to={'/login'}>
						Already have an account ? login here
					</Link>
				</form>
			</Card>
		</div>
	);
};

export default Signup;
