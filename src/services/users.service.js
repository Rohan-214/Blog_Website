export const fetchUser = async (user_id) => {
    try {
        const res = await fetch(`https://blog-website-nine-gamma.vercel.app/users/${user_id}`); // adjust backend URL
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null; // optional: return a fallback value
    }
};


export const fetchAllUsers = async () => {
    try{
        const res = await fetch(`https://blog-website-nine-gamma.vercel.app/users`);
        const data = await res.json();
        return data;
    } catch(err){
        console.error(err);
        return null;
    }
}

