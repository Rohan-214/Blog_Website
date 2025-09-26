export const fetchCommentsByArticleId = async (articleId) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/comments?articleid=${articleId}`);
        if (!res.ok) {
            console.error(`Error fetching comments for article ${articleId}: ${res.status} ${res.statusText}`);
            return [];
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return []; // optional: return a fallback value
    }
};