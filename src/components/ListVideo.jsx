import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, MessageCircle } from "lucide-react";
import { selectedVideo } from "../redux/actions";

function VideoList() {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false);
  const selectedPlaylist = useSelector((state) => state.selectedPlaylist);
  const data = useSelector((state) => state.data) || [];

  const selectedData = data.find((item) => item.idPlaylist === selectedPlaylist);

  if (!selectedData || selectedData.genre === "movie") {
    return null;
  }

  const handleVideoSelect = (video) => {
    dispatch(selectedVideo(video));
  };

  const handleOpenComments = (video, e) => {
    e.stopPropagation();
    dispatch(selectedVideo(video));
    dispatch(toggleCommentsModal(true));
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8"
    >
      <h2 className="text-xl font-bold text-white mb-4">Episodes</h2>
      
      {/* Single Scrollable Container (Initially shows 2 videos, hides scrollbar) */}
      <div className="max-h-96 overflow-y-auto scrollbar-hide space-y-4 p-2">
        {(showAll ? selectedData.videos : selectedData.videos.slice(0, 2)).map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex items-center rounded-lg cursor-pointer hover:bg-gray-700/80 transition-colors p-3"
            onClick={() => handleVideoSelect(item)}
          >
            {/* Video Thumbnail */}
            <div className="w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={item.miniature}
                alt={item.titre}
              />
            </div>

            {/* Video Details */}
            <div className="ml-4 flex flex-col justify-between">
              <h3 className="text-sm font-medium text-white">{item.titre}</h3>

              {/* Video Stats */}
              <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{item.duree}</span>
                </div>

                <button
                  onClick={(e) => handleOpenComments(item, e)}
                  className="flex items-center gap-1 text-[#6B5ECD] hover:text-purple-300"
                >
                  <MessageCircle size={14} />
                  <span>{item.commentaires.length}</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Show More Button (Appears if more than 2 videos) */}
      {selectedData.videos.length > 2 && !showAll && (
        <button
          onClick={() => setShowAll(true)}
          className="mt-4 w-full bg-[#6B5ECD] text-white py-3  text-sm font-medium transition hover:bg-[#5C558D]"
        >
          Show More
        </button>
      )}
    </motion.section>
  );
}

export default VideoList;
