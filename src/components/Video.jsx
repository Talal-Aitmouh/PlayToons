import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { toggleCommentsModal } from "../redux/actions";
import Comments from "./Comments"; // Import Comments component

function VideoPlayer() {
  const dispatch = useDispatch();
  const selectedVideo = useSelector((state) => state.selectedVideo);
  const selectedPlaylistId = useSelector((state) => state.selectedPlaylist);
  const playlists = useSelector((state) => state.data);
  const commentsModalOpen = useSelector((state) => state.commentsModalOpen);

  const selectedPlaylist = playlists.find(
    (playlist) => playlist.idPlaylist === selectedPlaylistId
  );

  const videoToShow =
    selectedVideo || (selectedPlaylist?.videos.length ? selectedPlaylist.videos[0] : null);

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likes, setLikes] = useState(videoToShow?.likes || 0);
  const [dislikes, setDislikes] = useState(videoToShow?.dislikes || 0);

  useEffect(() => {
    if (videoToShow) {
      setLikes(videoToShow.likes);
      setDislikes(videoToShow.dislikes);
      setLiked(false);
      setDisliked(false);
    }
  }, [videoToShow]);

  const handleOpenComments = () => {
    dispatch(toggleCommentsModal(true));
  };

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      setLiked(true);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setDisliked(true);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
  };

  console.log(videoToShow);

  if (!videoToShow) {
    return (
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center rounded-lg">
        <Play size={64} className="text-gray-400" />
      </div>
    );
  }

  return (
    <>
      {/* Video Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full"
      >
        <div className="bg-black rounded-lg overflow-hidden relative pb-[56.25%]">
          <iframe
            src={`${videoToShow.lien.replace("watch?v=", "embed/").split("&")[0]}?`}
            allow="accelerometer; autoplay=1;rel=0; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
            key={videoToShow.lien}
          />

        </div>
      </motion.section>
      <section>
        <div className="mt-6 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start justify-between">
            {/* Title & Description */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">
                {selectedPlaylist.titre} -- {videoToShow.titre}
              </h2>
              <p className="text-gray-400 mt-2">{videoToShow.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <button
                onClick={handleOpenComments}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                <MessageCircle size={20} />
                <span>{videoToShow.commentaires.length}</span>
              </button>
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer ${liked ? "bg-[#6B5ECD]/50" : "bg-gray-800 hover:bg-gray-700"
                  }`}
              >
                <ThumbsUp size={20} />
                <span>{likes}</span>
              </button>
              <button
                onClick={handleDislike}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition cursor-pointer ${disliked ? "bg-[#6B5ECD]/50" : "bg-gray-800 hover:bg-gray-700"
                  }`}
              >
                <ThumbsDown size={20} />
                <span>{dislikes}</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-400">
            <img
              src={videoToShow.auteur.photo}
              alt={videoToShow.auteur.nom}
              className="w-10 h-10 rounded-full border border-gray-600"
            />
            <span>
              {videoToShow.auteur.prenom} {videoToShow.auteur.nom}
            </span>
            <span>•</span>
          </div>
        </div>
      </section>

      {/* Comments Modal */}
      {commentsModalOpen && <Comments comments={videoToShow.commentaires} videoId={videoToShow.id} />}
    </>
  );
}

export default VideoPlayer;
