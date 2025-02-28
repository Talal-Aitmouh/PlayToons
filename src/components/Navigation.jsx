import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Icons for menu toggle

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-4 ">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-auto h-20" />
        </Link>
      </div>

      {/* Menu button (Visible on small screens) */}
      <button 
        className="lg:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>

      {/* Navbar Links (Hidden on small screens) */}
      <div className={`lg:flex gap-10 z-10 text-gray-300 text-lg ${isOpen ? "flex flex-col absolute top-16 left-0 w-full bg-black p-4" : "hidden"}`}>
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <Link to="/movies" className="hover:text-white transition-colors">Movies</Link>
        <Link to="/series" className="hover:text-white transition-colors">Series</Link>
        <Link to="" className="hover:text-white transition-colors">Animes</Link>
      </div>

      {/* Search & Avatar (Hidden on small screens) */}
      <div className="lg:flex items-center gap-3 hidden">
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
