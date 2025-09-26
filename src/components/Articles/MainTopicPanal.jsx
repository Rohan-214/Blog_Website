import TopicsPanel from "../Articles/TopicsPanal"; 
function MainTopicPanal({ topicPhoto, content, userPhoto, userName, topicName }) {
    return(
        <>
        <div className="text-5xl font-bold bg-gradient-to-bl py-2 from-purple-600 to-blue-500 bg-clip-text text-transparent" >For you</div>
            {/* <input className="bg-gray-300 rounded-full focus:outline-none  pl-5 py-2 " type="text"  placeholder="Search Articles..."  /> */}
                <div className="flex flex-col gap-3  w-100">
                    <TopicsPanel 
                        topicPhoto="https://image.cnbcfm.com/api/v1/image/107159087-1669826392218-gettyimages-1237155972-porzycki-neuralin211210_npAXF.jpeg?v=1685061729&w=1920&h=1080"
                        content="The climate crisis and the environment in Central Asia Is there hope?"
                        userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                        userName="Joana"
                        topicName="Elon Musk"
                    />
                    <TopicsPanel 
                        topicPhoto="https://image.cnbcfm.com/api/v1/image/107159087-1669826392218-gettyimages-1237155972-porzycki-neuralin211210_npAXF.jpeg?v=1685061729&w=1920&h=1080"
                        content="The climate crisis and the environment in Central Asia Is there hope?"
                        userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                        userName="Joana"
                        topicName="Elon Musk"
                    />
                    <TopicsPanel 
                        topicPhoto="https://image.cnbcfm.com/api/v1/image/107159087-1669826392218-gettyimages-1237155972-porzycki-neuralin211210_npAXF.jpeg?v=1685061729&w=1920&h=1080"
                        content="The climate crisis and the environment in Central Asia Is there hope?"
                        userPhoto="https://media-cldnry.s-nbcnews.com/image/upload/newscms/2017_45/2216056/171106-latinx-02-latino-1021.jpg"
                        userName="Joana"
                        topicName="Elon Musk"
                    />
            </div>
        </>
    )
};
export default MainTopicPanal;

