import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setselectedPlaylist } from "./redux/actions";

function MoviesPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const data = useSelector((state) => state.data) || [];
  
    // Filter playlists with genre "serie"
    const moviesData = data.filter((playlist) => playlist.genre === "movie");
  
    
    return (
        <div className="min-h-screen text-white px-4 py-8" >
          <h1 className="text-2xl font-bold mb-6">All MOvies</h1>
    
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesData.map((playlist) => (
              <div
                key={playlist.idPlaylist}
                className="cursor-pointer rounded-lg overflow-hidden hover:bg-gray-700 transition p-3"
                onClick={() => handlePlaylistSelect(playlist.idPlaylist)}
              >
                <div className="w-full h-36 rounded-lg overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={playlist.miniature.startsWith("http") ? playlist.miniature : `/img/${playlist.miniature}`}
                    alt={playlist.titre}
                  />
                </div>
                <h3 className="text-sm font-medium text-white mt-3">{playlist.titre}</h3>
              </div>
            ))}
          </div>
        </div>
      );
}

export default MoviesPage
