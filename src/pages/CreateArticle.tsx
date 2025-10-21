import { useState } from 'react';
import { toast } from 'sonner';
import { CATEGORIES } from '@/constants/categories';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { articleSchema } from '@/constants/articleSchema';
import { createArticle } from '@/api/article';
import { useNavigate } from 'react-router-dom';
const CreateArticle = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [category, setCategory] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState('');
	const [image, setImage] = useState<File | null>(null);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const handleAddTag = () => {
		if (tagInput && !tags.includes(tagInput)) {
			setTags([...tags, tagInput]);
			setTagInput('');
		}
	};

	const handleRemoveTag = (tag: string) => {
		setTags(tags.filter((t) => t !== tag));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) setImage(file);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!title || !content || !category) {
			setError('Title, content, and category are required');
			return;
		}
		const formObj = {
			title,
			content,
			category,
			tags,
			image, // File object
		};

		// Step 2: Validate
		const validation = articleSchema.safeParse(formObj);
		if (!validation.success) {
            console.log(formObj);
            
			setError(validation.error.issues[0].message);
			return;
		}

		const formData = new FormData();
		formData.append('title', title);
		formData.append('content', content);
		formData.append('category', category);
		 tags.forEach((tag) => formData.append('tags', tag))
		if (image) formData.append('image', image);
        console.log(Array.from(formData.entries()));

        
		try {
			const res = await createArticle(formData);
			if (res.success) {
				toast.success('Article created successfully. redirecting...');
				setTitle('');
				setContent('');
				setCategory('');
				setTags([]);
				setImage(null);
				setTimeout(() => {
					navigate('/dashboard');
				}, 3000);
			}
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Failed to create article');
		}
	};

	return (
		<Card className="max-w-3xl mx-auto mt-8 p-4">
			<CardHeader>
				<h1 className="text-2xl font-bold">Add New Article</h1>
			</CardHeader>
			<CardContent>
				{error && <p className="text-sm text-red-500">{error}</p>}
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Title */}
					<div>
						<label className="block mb-1 font-medium">Title</label>
						<Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter article title" />
					</div>

					{/* Content */}
					<div>
						<label className="block mb-1 font-medium">Content</label>
						{/* <Label htmlFor='textArea'>Content</Label> */}
						<Textarea
							id="textArea"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Write your article here..."
							rows={6}
						/>
					</div>

					{/* Category */}
					<div>
						<label className="block mb-1 font-medium">Category</label>

						<Select value={category} onValueChange={(val) => setCategory(val)}>
							<SelectTrigger className="w-[180px]">
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
					</div>

					{/* Tags */}
					<div>
						<label className="block mb-1 font-medium">Tags</label>
						<div className="flex gap-2 mb-2">
							<Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="Add a tag" />
							<Button type="button" onClick={handleAddTag} variant="default">
								Add
							</Button>
						</div>
						<div className="flex flex-wrap gap-2">
							{tags.map((tag) => (
								<Button type="button" size="sm" variant="destructive" key={tag} onClick={() => handleRemoveTag(tag)}>
									{tag}×
								</Button>
							))}
						</div>
					</div>

					{/* Image */}
					<div>
						<label className="block mb-1 font-medium">Image</label>
						<Input type="file" accept="image/*" onChange={handleFileChange} />
						{image && (
							<div className="mt-2">
								<p className="text-sm mb-1">Preview:</p>
								<img src={URL.createObjectURL(image)} alt="Preview" className="w-32 h-32 object-cover rounded border" />
							</div>
						)}
					</div>

					{/* Submit */}
					<Button type="submit" variant="default">
						Create Article
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default CreateArticle;
