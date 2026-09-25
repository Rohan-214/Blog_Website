import react, { useEffect, useState } from 'react';
import TopicName from '../Articles/TopicName';
import { Link } from 'react-router-dom';
function AddArticles() {
    const [selectedTopic, setSelectedTopic] = useState("");
    const [specificTopic, setSpecificTopic] = useState("");
    const [articleTitle, setArticleTitle] = useState("");
    const [articleContent, setArticleContent] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const id = localStorage.getItem('userid');
    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };
    const topics = ["Lifestyle", "Technology", "Health", "Business", "Education"];
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("topic", selectedTopic);
        formData.append("specificTopic", specificTopic);
        formData.append("title", articleTitle);
        formData.append("content", articleContent);
        formData.append("userid", id);
        formData.append("time", new Date().toISOString());
        formData.append("day", new Date().toLocaleString("en-US", { weekday: "long" }));
        if (imageFile) {
            formData.append("image", imageFile);
        }

        const res = await fetch(`https://blog-website-nine-gamma.vercel.app/articles`, {
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
            setImageFile(null);
            e.target.reset();
        } else {
            alert("Failed to submit article.");
        }
    };
    return (
        <form className='flex min-h-screen flex-col bg-gray-200 px-4 py-24 sm:px-8' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-8 lg:flex-row lg:gap-12'>
                <div className='flex w-full flex-col gap-8 lg:w-1/3'>
                    <div className='bg-white rounded-2xl shadow p-5'>
                        <div className=' pb-1 text-4xl font-semibold text-[#2F5E64]'>Topic</div>
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
                        <div className=' pb-1 text-4xl font-semibold text-[#2F5E64]'>Specific Topic</div>
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
                        <div className=' pb-1 text-4xl font-semibold text-[#2F5E64]'>Upload Image</div>
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
                <div className='flex w-full flex-col gap-8 lg:w-2/3'>
                    <div className='bg-white rounded-2xl shadow p-5 mb-5'>
                        <div className=' text-4xl font-semibold text-[#2F5E64]'>Article Title</div>
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
                        <div className=' text-4xl font-semibold text-[#2F5E64]' >Article Content</div>
                        <div className='mt-5 flex min-h-80 gap-3 rounded-2xl bg-gray-200 px-3 py-1 shadow sm:min-h-96'>
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
            <div className='flex justify-center gap-6 px-2 py-8 sm:justify-between sm:px-8'>
                <div >
                    <Link to="/home" className=' bg-[#2F5E64] text-[#F7EFE8] px-5 py-2 rounded-full text-xl font-semibold'>Cancel</Link>
                </div>
                <div>
                    <button type="submit" className='  bg-[#2F5E64] text-[#F7EFE8] px-5 py-2 rounded-full text-xl font-semibold'>Submit</button>
                </div>
            </div>
        </form>
    )
};
export default AddArticles;