import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { Play, ThumbsUp, ThumbsDown, MessageCircle } from "lucide-react";
import { toggleCommentsModal } from "../redux/actions";
import Comments from "./Comments"; // Make sure to import it

function VideoPlayer() {
  const dispatch = useDispatch();
  const selectedVideo = useSelector((state) => state.selectedVideo);
  const selectedPlaylistId = useSelector((state) => state.selectedPlaylist);
  const playlists = useSelector((state) => state.data);
  const commentsModalOpen = useSelector((state) => state.commentsModalOpen); // Get modal state

  const selectedPlaylist = playlists.find(
    (playlist) => playlist.idPlaylist === selectedPlaylistId
  );

  const videoToShow =
    selectedVideo || (selectedPlaylist?.videos.length ? selectedPlaylist.videos[0] : null);

  const handleOpenComments = () => {
    dispatch(toggleCommentsModal(true));
  };

  if (!videoToShow) {
    return (
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center rounded-lg">
        <Play size={64} className="text-gray-400" />
      </div>
    );
  }

  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full"
      >
        <div className="bg-black rounded-lg overflow-hidden relative pb-[56.25%]">
          <iframe
            src={videoToShow.lien.replace("watch?v=", "embed/")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
      </motion.section>

      <section>
        <div className="mt-6 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">{videoToShow.titre}</h2>
              <p className="text-gray-400 mt-2">{videoToShow.description}</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleOpenComments}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
              >
                <MessageCircle size={20} />
                <span>{videoToShow.commentaires.length}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <ThumbsUp size={20} />
                <span>{videoToShow.likes}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                <ThumbsDown size={20} />
                <span>{videoToShow.dislikes}</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>{videoToShow.duree}</span>
            <span>•</span>
            <span>
              {videoToShow.auteur.prenom} {videoToShow.auteur.nom}
            </span>
          </div>
        </div>
      </section>

      {/* Render Comments Modal if Open */}
      {commentsModalOpen && (
        <Comments comments={videoToShow.commentaires} videoId={videoToShow.id} />
      )}
    </>
  );
}

export default VideoPlayer;
