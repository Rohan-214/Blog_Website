export const fetchArticle = async (articleId) => {
    try {
        const res = await fetch(`https://blog-website-nine-gamma.vercel.app/articles/${articleId}`); // adjust backend URL
        if (!res.ok) {
            console.error(`Error fetching article ${articleId}: ${res.status} ${res.statusText}`);
            return null;
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null; // optional: return a fallback value
    }
};


export const fetchAllArticles = async (topic) => {
    try {
        const url = topic
            ? `https://blog-website-nine-gamma.vercel.app/articles?topic=${encodeURIComponent(topic)}`
            : `https://blog-website-nine-gamma.vercel.app/articles`;

            console.log(url)

        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Error fetching all articles: ${res.status} ${res.statusText}`);
            return null;
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

// now create services for first four and last four
export const fetchFirstFourArticles = async () => {
    try {
        const res = await fetch(`https://blog-website-nine-gamma.vercel.app/articles/firstfour/get`);
        //console.log(res)
        if (!res.ok) {
            console.error(`Error fetching first four articles: ${res.status} ${res.statusText}`);
            return null;
        }
        const data = await res.json();
        //console.log(data)   
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};

export const fetchLastFourArticles = async () => {
    try {
        const res = await fetch(`https://blog-website-nine-gamma.vercel.app/articles/lastfour/le`);
        if (!res.ok) {
            console.error(`Error fetching last four articles: ${res.status} ${res.statusText}`);
            return null;
        }
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null;
    }
};


