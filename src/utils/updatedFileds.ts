// import { ArticleFormData } from "@/constants/articleSchema";

//  export   function getUpdatedFields<T extends Record<string, any>>(original: T, updated: ArticleFormData): Partial<ArticleFormData> {
// 	const changes: Partial<T> = {};

// 	function isFile(value: unknown): value is File {
// 		return value instanceof File;
// 	}

// 	for (const key in updated) {
// 		const origVal = original[key];
// 		const newVal = updated[key];

// 		if (Array.isArray(newVal)) {
// 			if (JSON.stringify(newVal) !== JSON.stringify(origVal)) changes[key] = newVal;
// 		} else if (isFile(newVal)) {
// 			if (newVal !== origVal) changes[key] = newVal;
// 		} else if (newVal !== origVal) {
// 			changes[key] = newVal;
// 		}
// 	}

// 	return changes;
// }
