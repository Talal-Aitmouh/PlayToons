import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#1E1E1E]">
      <div className="flex items-center gap-8">
        <Link to={"/"}> 
        <img src="/logo.png" alt="Logo" className="w-full h-16" />
        </Link>
      </div>
      
      <div className="flex gap-16 text-gray-300 text-lg   ">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
        <Link to="/series" className="hover:text-white transition-colors">Series</Link>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-80 px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
        <span className="text-gray-300">Talal</span>
      </div>
    </nav>
  );
}

export default Navigation;
