"use client"

import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateSearchQuery, setselectedPlaylist } from "../redux/actions"
import { Link, useNavigate } from "react-router-dom"
import { Menu, X, Search, Film, Tv, Home, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

function Navigation() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchQuery = useSelector((state) => state.searchQuery)
  const data = useSelector((state) => state.data)
  const [isOpen, setIsOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const searchRef = useRef(null)

  // Handle search input change
  const handleSearchChange = (e) => {
    dispatch(updateSearchQuery(e.target.value))
  }

  // Handle suggestion click (navigate & update Redux state)
  const handleSuggestionClick = (suggestion) => {
    dispatch(setselectedPlaylist(suggestion.id)) // Update Redux
    navigate(`/play/${suggestion.id}`) // Navigate to Playlist Player
    dispatch(updateSearchQuery("")) // Clear search after selection
  }

  // Close search suggestions when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [searchRef])

  // Filter suggestions based on Redux search query & remove duplicates
  const suggestions = []
  const seenTitles = new Set()

  data.forEach((playlist) => {
    if (playlist.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !seenTitles.has(playlist.titre)) {
      seenTitles.add(playlist.titre)
      suggestions.push({
        type: "playlist",
        id: playlist.idPlaylist,
        title: playlist.titre,
        miniature: playlist.miniature,
      })
    }
  })

  return (
  <nav className="fixed top-0 left-0 w-full z-50 bg-black border-b  shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link
              to="/"
              className="flex items-center text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out"
            >
              <Home className="w-4 h-4 mr-2" />
              <span>Home</span>
            </Link>
            <Link
              to="/movies"
              className="flex items-center text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out"
            >
              <Film className="w-4 h-4 mr-2" />
              <span>Movies</span>
            </Link>
            <Link
              to="/series"
              className="flex items-center text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out"
            >
              <Tv className="w-4 h-4 mr-2" />
              <span>Series</span>
            </Link>
            <Link
              to="#"
              className="flex items-center text-gray-300 hover:text-purple-400 px-3 py-2 text-sm font-medium transition-all duration-200 ease-in-out"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Animes</span>
            </Link>
          </div>

          {/* Search & User Profile */}
          <div className="hidden lg:flex lg:items-center lg:space-x-4">
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setIsSearchFocused(true)}
                  className="w-64 pl-10 pr-4 py-2 bg-gray-800/50 backdrop-blur-sm text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>

              {/* Search Suggestions */}
              <AnimatePresence>
                {isSearchFocused && searchQuery && suggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md rounded-lg shadow-xl overflow-hidden z-50 border border-gray-700"
                  >
                    <ul className="max-h-60 overflow-auto py-1">
                      {suggestions.map((suggestion, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="px-3 py-2 hover:bg-gray-700/50 cursor-pointer"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          <div className="flex items-center space-x-3">
                            <img
                              src={suggestion.miniature || "/placeholder.svg"}
                              alt={suggestion.title}
                              className="w-10 h-10 object-cover rounded-md"
                            />
                            <span className="text-sm text-white font-medium truncate">{suggestion.title}</span>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile */}
            <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
              <div className="relative">
                <img
                  src="/avatar.png"
                  alt="Avatar"
                  className="w-9 h-9 rounded-full border-2 border-purple-500 object-cover"
                />
              </div>
              <span className="text-gray-200 font-medium">Talal</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-gray-900/95 backdrop-blur-md border-b border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Home</span>
              </Link>
              <Link
                to="/movies"
                className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <Film className="w-5 h-5 mr-3" />
                <span>Movies</span>
              </Link>
              <Link
                to="/series"
                className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <Tv className="w-5 h-5 mr-3" />
                <span>Series</span>
              </Link>
              <Link
                to="#"
                className="flex items-center text-gray-300 hover:bg-gray-800 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                <Sparkles className="w-5 h-5 mr-3" />
                <span>Animes</span>
              </Link>
            </div>

            {/* Mobile search */}
            <div className="px-4 py-3 border-t border-gray-700">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              {/* Mobile search results */}
              {searchQuery && suggestions.length > 0 && (
                <div className="mt-2 bg-gray-800 rounded-md shadow-lg overflow-hidden border border-gray-700">
                  <ul className="max-h-60 overflow-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-3 py-2 hover:bg-gray-700 cursor-pointer border-b border-gray-700 last:border-b-0"
                        onClick={() => {
                          handleSuggestionClick(suggestion)
                          setIsOpen(false)
                        }}
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={suggestion.miniature || "/placeholder.svg"}
                            alt={suggestion.title}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Mobile user profile */}
            <div className="px-5 py-4 border-t border-gray-700 flex items-center">
              <img src="/avatar.png" alt="Avatar" className="w-10 h-10 rounded-full border-2 border-purple-500" />
              <span className="ml-3 text-gray-200 font-medium">Talal</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navigation
