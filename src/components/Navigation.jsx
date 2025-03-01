import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSearchQuery, setselectedPlaylist } from "../redux/actions";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchQuery = useSelector((state) => state.searchQuery);
  const data = useSelector((state) => state.data);
  const [isOpen, setIsOpen] = useState(false);

  // Handle search input change
  const handleSearchChange = (e) => {
    dispatch(updateSearchQuery(e.target.value));
  };

  // Handle suggestion click (navigate & update Redux state)
  const handleSuggestionClick = (suggestion) => {
    dispatch(setselectedPlaylist(suggestion.id)); // Update Redux
    navigate(`/play/${suggestion.id}`); // Navigate to Playlist Player
    dispatch(updateSearchQuery("")); // Clear search after selection
  };

  // Filter suggestions based on Redux search query & remove duplicates
  const suggestions = [];
  const seenTitles = new Set();

  data.forEach((playlist) => {
    if (playlist.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !seenTitles.has(playlist.titre)) {
      seenTitles.add(playlist.titre);
      suggestions.push({
        type: "playlist",
        id: playlist.idPlaylist,
        title: playlist.titre,
        miniature: playlist.miniature,
      });
    }
  });

  return (
    <nav className="flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-auto h-20" />
        </Link>
      </div>

      {/* Menu button (Mobile) */}
      <button
        className="lg:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Navbar Links */}
      <div
        className={`lg:flex gap-10 z-10 text-gray-300 text-lg ${isOpen ? "flex flex-col absolute top-16 left-0 w-full bg-black p-4" : "hidden"}`}
      >
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
        <Link to="/series" className="hover:text-white transition-colors">Series</Link>
        <Link to="/animes" className="hover:text-white transition-colors">Animes</Link>
      </div>

      {/* Search & Avatar */}
      <div className="lg:flex items-center gap-3 hidden relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-80 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {/* Suggestions Dropdown */}
          {searchQuery && suggestions.length > 0 && (
            <ul className="absolute left-0 w-full bg-gray-900 text-white rounded-lg shadow-lg mt-1 max-h-40 overflow-auto z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="flex items-center p-2 hover:bg-gray-700 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <img src={suggestion.miniature} alt={suggestion.title} className="w-10 h-10 object-cover rounded mr-2" />
                  <span>{suggestion.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
        <span className="text-gray-300">Talal</span>
      </div>
    </nav>
  );
}

export default Navigation;
