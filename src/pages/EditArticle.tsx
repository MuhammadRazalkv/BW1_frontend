import { getArticle } from '@/api/article';
import ArticleForm from '@/components/ArticleForm';
import { IArticle } from '@/interfaces/articleInterface';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
const EditArticle = () => {
	const [article, setArticle] = useState<IArticle | null>(null);
	let { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	useEffect(() => {
		const fetchArticle = async () => {
			if (!id) {
				toast.error('Id not provided redirecting to profile...');
				setTimeout(() => {
					navigate('/profile');
				}, 2000);
				return;
			}
			try {
				const res = await getArticle(id);
				if (res.success) {
					setArticle(res.article);
				}
			} catch (error) {
				toast.error(error instanceof Error ? error.message : 'Failed to fetch info');
			}
		};
		fetchArticle();
	}, [id]);
	return <ArticleForm type="edit" originalArticle={article} />;
};

export default EditArticle;
