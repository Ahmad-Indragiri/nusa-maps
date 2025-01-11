const VideoPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 via-blue-500 to-green-500">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-white mb-8 text-center">
                Video Budaya Indonesia
            </h1>
            <div className="w-full h-full flex justify-center items-center">
                <video controls className="rounded-lg shadow-2xl w-3/4">
                    <source src="/video/budaya-indonesia.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    );
};

export default VideoPage;
