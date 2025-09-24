export const fetchCommentsByLikedId = async (articleid) => {
    try {
        const res = await fetch(`http://localhost:5174/postLike?articleid=${articleid}`);
        if (!res.ok) {
            console.error(`Error fetching comments for article ${articleid}: ${res.status} ${res.statusText}`);
            return [];
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return []; // optional: return a fallback value
    }
};