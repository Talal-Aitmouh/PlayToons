"use client"

import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setselectedPlaylist } from "../redux/actions"
import { motion } from "framer-motion"
import { Play, Clock, Star, Filter, ChevronDown } from "lucide-react"
import { useState } from "react"

function MoviesPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state) => state.data) || []
  const [isHovering, setIsHovering] = useState(null)
  const [sortBy, setSortBy] = useState("newest")
  const [showFilters, setShowFilters] = useState(false)

  // Filter playlists with genre "movie"
  let moviesData = data.filter((playlist) => playlist.genre === "movie")

  // Sort the movies based on the selected option
  if (sortBy === "newest") {
    moviesData = [...moviesData].sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
  } else if (sortBy === "oldest") {
    moviesData = [...moviesData].sort((a, b) => new Date(a.date || 0) - new Date(b.date || 0))
  } else if (sortBy === "alphabetical") {
    moviesData = [...moviesData].sort((a, b) => a.titre.localeCompare(b.titre))
  }

  const handlePlaylistSelect = (playlistId) => {
    dispatch(setselectedPlaylist(playlistId))
    navigate(`/play/${playlistId}`)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen text-white =ck px-4 md:px-8 py-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div className="mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-violet-600 bg-clip-text text-transparent">
              Cartoon Movies
            </h1>
            <p className="text-gray-400 mt-2">Discover our collection of {moviesData.length} animated movies</p>
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition-colors"
            >
              <Filter size={18} />
              <span>Sort By</span>
              <ChevronDown size={18} className={`transform transition-transform ${showFilters ? "rotate-180" : ""}`} />
            </motion.button>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg shadow-black/30 overflow-hidden z-10"
              >
                <div className="py-1">
                  <button
                    onClick={() => {
                      setSortBy("newest")
                      setShowFilters(false)
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                      sortBy === "newest" ? "bg-purple-600/30 text-purple-300" : ""
                    }`}
                  >
                    Newest First
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("oldest")
                      setShowFilters(false)
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                      sortBy === "oldest" ? "bg-purple-600/30 text-purple-300" : ""
                    }`}
                  >
                    Oldest First
                  </button>
                  <button
                    onClick={() => {
                      setSortBy("alphabetical")
                      setShowFilters(false)
                    }}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-700 transition-colors ${
                      sortBy === "alphabetical" ? "bg-purple-600/30 text-purple-300" : ""
                    }`}
                  >
                    Alphabetical
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Movies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {moviesData.map((movie) => (
            <motion.div
              key={movie.idPlaylist}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg shadow-black/30 cursor-pointer group"
              onClick={() => handlePlaylistSelect(movie.idPlaylist)}
              onMouseEnter={() => setIsHovering(movie.idPlaylist)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className="relative overflow-hidden aspect-[2/3]">
                <img
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  src={movie.miniature.startsWith("http") ? movie.miniature : `/img/${movie.miniature}`}
                  alt={movie.titre}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isHovering === movie.idPlaylist ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-600/80 backdrop-blur-sm mb-3 shadow-lg shadow-purple-700/30"
                    >
                      <Play className="h-7 w-7 text-white" fill="white" />
                    </motion.button>
                    <p className="text-sm text-gray-300 text-center">Watch Now</p>
                  </motion.div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-lg line-clamp-1">{movie.titre}</h3>
                  <div className="flex items-center bg-purple-600/20 px-2 py-0.5 rounded text-purple-300 text-xs">
                    <Star size={12} className="mr-1 text-yellow-400" fill="currentColor" />
                    {(Math.random() * 2 + 3).toFixed(1)}
                  </div>
                </div>

                <div className="flex items-center justify-between text-gray-400 text-sm">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{movie.duree || "1h 30m"}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {movie.date ? new Date(movie.date).getFullYear() : "2023"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {moviesData.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-20 h-20 mb-6 rounded-full bg-gray-800 flex items-center justify-center">
              <Play className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium text-gray-300 mb-2">No Movies Found</h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find any cartoon movies in our collection. Please check back later.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default MoviesPage
