export const fetchUser = async (user_id) => {
    try {
        const res = await fetch(`http://localhost:5174/users/${user_id}`); // adjust backend URL
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        return null; // optional: return a fallback value
    }
};


export const fetchAllUsers = async () => {
    try{
        const res = await fetch(`http://localhost:5174/users`);
        const data = await res.json();
        return data;
    } catch(err){
        console.error(err);
        return null;
    }
}