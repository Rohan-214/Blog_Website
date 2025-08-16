export const fetchArticle = async (articleId) => {
    try {
        const res = await fetch(`http://localhost:5174/articles/${articleId}`); // adjust backend URL
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null; // optional: return a fallback value
    }
};


export const fetchAllArticles = async () =>{
    try{
        const res = await fetch(`http://localhost:5174/articles`);
        const data = await res.json();
        return data;
    } catch(err){
        console.error(err);
        return null;
    }
};