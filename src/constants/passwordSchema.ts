import { z } from 'zod';

export const passwordSchema = z
	.object({
		currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
		newPassword: z.string().min(6, 'Password must be at least 6 characters'),
		confirmPassword: z.string().min(6, 'Confirm your password'),
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		message: 'New password cannot be the same as current password',
		path: ['newPassword'],
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

export type PasswordSchema = z.infer<typeof passwordSchema>;
