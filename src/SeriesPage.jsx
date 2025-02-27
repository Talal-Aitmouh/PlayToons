import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setselectedPlaylist } from "./redux/actions";
import { motion } from "framer-motion";

function SeriesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.data) || [];

  // Filter playlists with genre "serie"
  const seriesData = data.filter((playlist) => playlist.genre === "serie");

  const handlePlaylistSelect = (playlistId) => {
    dispatch(setselectedPlaylist(playlistId));
    navigate(`/play/${playlistId}`);  // Navigate to Player with playlistId
  };

  return (
    <div className="min-h-screen text-white px-4 py-8">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {seriesData.map((playlist) => (
          <motion.div
          initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
            key={playlist.idPlaylist}
            className="cursor-pointer rounded-lg overflow-hidden hover:bg-gray-700 transition p-3"
            onClick={() => handlePlaylistSelect(playlist.idPlaylist)}
          >
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={playlist.miniature.startsWith("http") ? playlist.miniature : `/img/${playlist.miniature}`}
                alt={playlist.titre}
              />
            </div>
            <h3 className="text-sm font-medium text-white mt-3">{playlist.titre}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default SeriesPage;
