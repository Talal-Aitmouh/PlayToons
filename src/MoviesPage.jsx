import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setselectedPlaylist } from "./redux/actions";
import { motion } from "framer-motion";

function MoviesPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.data) || [];
  
    // Filter playlists with genre "movie"
    const moviesData = data.filter((playlist) => playlist.genre === "movie");
  
    const handlePlaylistSelect = (playlistId) => {
      dispatch(setselectedPlaylist(playlistId));
      navigate(`/play/${playlistId}`);  
    };
    
    return (
        <div className="min-h-screen text-white px-4 py-8">
    
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesData.map((playlist) => (
              <motion.div
                key={playlist.idPlaylist}
                className="cursor-pointer rounded-lg overflow-hidden hover:bg-gray-700 transition p-3"
                onClick={() => handlePlaylistSelect(playlist.idPlaylist)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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

export default MoviesPage;
