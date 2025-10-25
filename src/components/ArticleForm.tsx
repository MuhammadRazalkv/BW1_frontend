import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { articleSchema, ArticleFormData } from '@/constants/articleSchema';
import { CATEGORIES } from '@/constants/categories';
import { IArticle } from '@/interfaces/articleInterface';
import { createArticle, updateArticle } from '@/api/article';

interface ArticleFormProps {
	type: 'add' | 'edit';
	originalArticle?: IArticle | null;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ type, originalArticle }) => {
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);
	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<ArticleFormData>({
		resolver: zodResolver(articleSchema),
		defaultValues: {
			title: '',
			content: '',
			category: '',
			tags: [],
			image: undefined,
		},
	});
	const [image, setImage] = useState<File | null>(null);

	const tags = watch('tags') || [];

	useEffect(() => {
		if (type === 'edit' && originalArticle) {
			setValue('title', originalArticle.title);
			setValue('content', originalArticle.content);
			setValue('category', originalArticle.category);
			setValue('tags', originalArticle.tags || []);
		}
	}, [type, originalArticle, setValue]);

	const onSubmit = async (data: ArticleFormData) => {
		try {
			const formData = new FormData();
			Object.entries(data).forEach(([key, value]) => {
				if (key === 'tags' && Array.isArray(value)) {
					value.forEach((tag) => formData.append('tags', tag));
				} else if (value instanceof File) {
					formData.append(key, value);
				} else if (typeof value === 'string') {
					formData.append(key, value);
				}
			});

			let res;
			setSubmitting(true);
			if (type === 'add') {
				res = await createArticle(formData);
			} else if (type === 'edit' && originalArticle?.id) {
				formData.append('articleId', originalArticle.id);
				res = await updateArticle(formData);
			}
			console.log(res);

			if (res && res.success) {
				toast.success(`Article ${type === 'add' ? 'created' : 'updated'} successfully!`);
				setTimeout(() => navigate('/profile'), 2000);
			} else {
				toast.error('Something went wrong.');
			}
		} catch (err: any) {
			toast.error(err.message || 'Failed to process article');
		} finally {
			setSubmitting(false);
		}
	};

	const addTag = (tag: string) => {
		if (tag && !tags.includes(tag)) {
			setValue('tags', [...tags, tag]);
		}
	};

	const removeTag = (tag: string) => {
		setValue(
			'tags',
			tags.filter((t) => t !== tag)
		);
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setValue('image', file);
			setImage(file);
		}
	};

	return (
		<Card className="max-w-3xl mx-auto mt-8 p-6">
			<CardHeader>
				<h1 className="text-2xl font-bold">{type === 'add' ? 'Add New Article' : 'Edit Article'}</h1>
			</CardHeader>

			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
					{/* Title */}
					<div>
						<label className="block font-medium">Title</label>
						<Input {...register('title')} placeholder="Enter title" />
						{errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
					</div>

					{/* Content */}
					<div>
						<label className="block font-medium">Content</label>
						<Textarea rows={6} {...register('content')} placeholder="Write your article here..." />
						{errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
					</div>

					{/* Category */}
					<div>
						<label className="block font-medium">Category</label>
						<Select onValueChange={(val) => setValue('category', val)} value={watch('category')}>
							<SelectTrigger className="w-[200px]">
								<SelectValue placeholder="Select category" />
							</SelectTrigger>
							<SelectContent>
								{CATEGORIES.map((cat) => (
									<SelectItem key={cat} value={cat}>
										{cat}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
					</div>

					{/* Tags */}
					<div>
						<label className="block font-medium">Tags</label>
						<div className="flex gap-2 mb-2">
							<Input
								placeholder="Add a tag"
								onKeyDown={(e) => {
									if (e.key === 'Enter') {
										e.preventDefault();
										addTag(e.currentTarget.value);
										e.currentTarget.value = '';
									}
								}}
							/>
						</div>
						<div className="flex flex-wrap gap-2">
							{tags.map((tag: string) => (
								<Button type="button" size="sm" variant="destructive" key={tag} onClick={() => removeTag(tag)}>
									{tag} ×
								</Button>
							))}
						</div>
					</div>

					{/* Image */}
					<div>
						<label className="block font-medium">Image</label>
						<Input type="file" accept="image/*" onChange={handleFileChange} />
						{errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
						{image && (
							<div className="mt-2">
								<p className="text-sm mb-1">Preview:</p>
								<img
									src={URL.createObjectURL(image)}
									alt="Preview"
									className="w-full h-32 object-contain rounded border"
								/>
							</div>
						)}
						{originalArticle?.imageUrl && !image && (
							<div className="mt-2">
								<p className="text-sm mb-1">Preview:</p>
								<img
									src={originalArticle.imageUrl}
									alt="Preview"
									className="w-full h-32 object-contain rounded border"
								/>
							</div>
						)}
					</div>

					{/* Submit Button */}
					<Button type="submit" className="w-full" disabled={submitting}>
						{submitting ? 'Submitting' : type === 'add' ? 'Create Article' : 'Update Article'}
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default ArticleForm;
