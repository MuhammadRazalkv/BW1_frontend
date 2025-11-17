import { z } from 'zod';

export const fieldSchemas = {
	firstName: z
		.string()
		.trim()
		.regex(/^[A-Za-z]{3,16}$/, 'First name can only contain letters')
		.min(3, 'First name must be at least 3 characters')
		.max(16, 'First name cannot exceed 16 characters'),

	lastName: z
		.string()
		.trim()
		.regex(/^[A-Za-z ]{1,10}$/, 'Last name can only contain letters and spaces')
		.min(1, 'Last name must be at least 1 character')
		.max(10, 'Last name cannot exceed 10 characters'),

	email: z.email('Invalid email'),

	phone: z
		.string()
		.trim()
		.regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number'),

	dob: z.string().refine((date) => {
		if (!date) return false;

		const [year, month, day] = date.split('-').map(Number);
		const dobDate = new Date(year, month - 1, day);
		const today = new Date();

		let age = today.getFullYear() - dobDate.getFullYear();
		const monthDiff = today.getMonth() - dobDate.getMonth();
		const dayDiff = today.getDate() - dobDate.getDate();

		if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
			age--;
		}

		return age >= 13 && dobDate <= today;
	}, 'You must be at least 13 years old'),
};

const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const signupSchema = z
	.object({
		...fieldSchemas,

		password: z
			.string()
			.regex(
				strongPasswordRegex,
				'Password must be 8+ chars and include uppercase, lowercase, number & special character'
			),

		confirmPassword: z.string().min(1, 'Confirm your password'),

		preferences: z.array(z.string()).min(1, 'Add at least 1 preference'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type SignupFormData = z.infer<typeof signupSchema>;
