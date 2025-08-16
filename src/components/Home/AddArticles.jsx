import react, { useEffect, useState } from 'react';
import TopicName from '../Articles/TopicName';
import { Link } from 'react-router-dom';

function AddArticles() {

    //    const [userName, setuserName] = useState("");
    const now = new Date();
    const [selectedTopic, setSelectedTopic] = useState("");
    const [specificTopic, setSpecificTopic] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [userImage, setuserImage] = useState(null);
    const uploadTime = new Date().toISOString();
    const dayName = now.toLocaleString("en-US", { weekday: "long" });

    const id = localStorage.getItem('userid');

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };




    //     useEffect(() => {
    //     if (!id) return;

    //     const fetchUsername = async () => {
    //       try {
    //         const res = await fetch(`http://localhost:5174/users/${id}`);
    //         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    //         const data = await res.json();

    //         // If API returns an object like { id: 1, username: "Rohan" }
    //         setuserName(data.username);

    //         } catch (err) {
    //             console.error("Error fetching username:", err);
    //         }
    //     };

    //         fetchUsername();
    //    }, [id]);




    const topics = ["Lifestyle", "Technology", "Health", "Business", "Education"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the article object

        const formData = new FormData();
        formData.append("topic", selectedTopic);
        formData.append("specificTopic", specificTopic);
        formData.append("title", articleTitle);
        formData.append("content", articleContent);
        formData.append("image", imageFile); // raw file
        formData.append("userid", id);
        formData.append("time", uploadTime);
        formData.append("day", dayName);
        formData.append("user_Image", userImage ? userImage.name : "")




        // Send POST request to json-server
        const res = await fetch("http://localhost:5174/articles", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
            alert("Article submitted!");
            // Reset form
            setSelectedTopic("");
            setSpecificTopic("");
            setArticleTitle("");
            setArticleContent("");
            setuserImage(null);
        } else {
            alert("Failed to submit article.");
        }
    };
    return (
        <form className='bg-gray-200 h-screen flex flex-col' onSubmit={handleSubmit}>
            <div className='flex gap-20 px-20 pt-20 '>
                <div className='flex flex-col gap-10 w-1/4'>
                    <div className='bg-white rounded-2xl shadow p-5'>
                        <div className=' pb-1 text-4xl font-semibold bg-gradient-to-tr from-blue-700 to-purple-700 bg-clip-text text-transparent'>Topic</div>
                        <div className='flex flex-wrap gap-5 mt-5'>
                            {topics.map(topic => (
                                <TopicName
                                    key={topic}
                                    topic={topic}
                                    selected={selectedTopic === topic}
                                    onSelect={() => setSelectedTopic(topic)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl shadow p-5'>
                        <div className=' pb-1 text-4xl font-semibold bg-gradient-to-tr from-blue-700 to-purple-700 bg-clip-text text-transparent'>Specific Topic</div>
                        <div className='flex gap-3  bg-gray-200 shadow rounded-full px-2 py-1 mt-5'>
                            <input
                                className=' w-full px-2 focus:outline-none'
                                type="text" placeholder="Enter topic"
                                value={specificTopic}
                                onChange={(e) => setSpecificTopic(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl shadow p-5 '>
                        <div className=' pb-1 text-4xl font-semibold bg-gradient-to-tr from-blue-700 to-purple-700 bg-clip-text text-transparent'>Upload Image</div>
                        <div className=' flex bg-gray-200 py-1 shadow items-center mt-5 justify-between rounded-full '>
                            <input
                                className='px-3'
                                type="file" accept="image/*"
                                onChange={handleImageChange}
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className='w-2/4 flex flex-col gap-10'>
                    <div className='bg-white rounded-2xl shadow p-5 mb-5'>
                        <div className=' text-4xl font-semibold bg-gradient-to-tr from-blue-700 to-purple-700 bg-clip-text text-transparent'>Article Title</div>
                        <div className='flex gap-3 mt-5 bg-gray-200 shadow rounded-full px-3 py-1'>
                            <input
                                className=' focus:outline-none w-full text-xl font-semibold'
                                type="text" placeholder="Enter article title"
                                value={articleTitle}
                                onChange={(e) => setArticleTitle(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='bg-white rounded-2xl shadow p-5 mb-5 flex flex-col gap-5'>
                        <div className=' text-4xl font-semibold bg-gradient-to-tr from-blue-700 to-purple-700 bg-clip-text text-transparent' >Article Content</div>
                        <div className='flex gap-3 mt-5 bg-gray-200 shadow h-100 rounded-2xl px-3 py-1'>
                            <textarea
                                className=' focus:outline-none  w-full h-full p-5 text-xl font-semibold'
                                placeholder="Write your article here"
                                value={articleContent}
                                onChange={(e) => setArticleContent(e.target.value)}
                                required
                            ></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div className='flex justify-around px-20 py-5'>
                <div >
                    <Link to="/home" className='bg-gradient-to-tr from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full text-xl font-semibold'>Cancel</Link>
                </div>
                <div>
                    <button type="submit" className=' bg-gradient-to-tr from-blue-500 to-purple-500 text-white px-5 py-2 rounded-full text-xl font-semibold'>Submit</button>
                </div>
            </div>


        </form>
    )
};

export default AddArticles;