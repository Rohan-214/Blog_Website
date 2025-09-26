function ShareButton({ title }) {
  const handleShare = async () => {
    const url = window.location.href; // current article URL
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `Check out this article: ${title}`,
          url,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback if browser doesn't support navigator.share
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };
  return (
    <button onClick={handleShare} className="p-2 rounded-xl bg-gradient-to-bl py-2 from-purple-600 to-blue-500  hover:shadow-xl text-white cursor-pointer">
       Share
    </button>
  );
}
export default ShareButton;
