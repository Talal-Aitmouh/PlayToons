"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { ChevronLeftIcon, ChevronRightIcon, Clock, Play, Film, Tv, TrendingUp, Star } from "lucide-react"
import { setselectedPlaylist } from "../redux/actions"
import { motion } from "framer-motion"

function HomePage() {
  const data = useSelector((state) => state.data) || []
  const [featured, setFeatured] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [filter, setFilter] = useState("all")
  const [filteredData, setFilteredData] = useState([])
  const [isHovering, setIsHovering] = useState(null)

  useEffect(() => {
    if (data.length) {
      const randomFeatured = data.sort(() => 0.5 - Math.random()).slice(0, 5)
      setFeatured(randomFeatured)
    }
  }, [data])

  useEffect(() => {
    if (filter === "all") {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter((item) => item.genre === filter))
    }
  }, [filter, data])

  const movies = data.filter((item) => item.genre === "movie")
  const series = data.filter((item) => item.genre === "serie")
  const latest = [...data].reverse().slice(0, 6)

  const heroSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots) => (
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <ul className="flex space-x-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 bg-white/30 rounded-full hover:bg-white/60 transition-all duration-300" />
    ),
  }

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: false,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  }

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8
  const totalPages = Math.ceil(data.length / itemsPerPage)

  // Get current playlists for pagination
  const paginatedPlaylists = [...data].reverse().slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const handlePlay = (playlistId) => {
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
    <div className="min-h-screen text-white  px-4 md:px-8 pb-12">
      {/* Hero Section */}
      {featured.length > 0 && (
        <div className="pt-6">
          <Slider {...heroSettings} className="hero-slider">
            {featured.map((item) => (
              <div key={item.idPlaylist} className="outline-none">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className="relative w-full h-[70vh] max-h-[600px] rounded-2xl overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-10000"
                    style={{ backgroundImage: `url(${item.miniature})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="absolute bottom-16 left-10 text-white max-w-xl"
                  >
                    <span
                      className={`inline-block px-3 py-1 mb-4 text-sm font-medium rounded-full ${
                        item.genre === "movie" ? "bg-purple-600" : "bg-rose-600"
                      }`}
                    >
                      {item.genre === "movie" ? "Movie" : "Series"}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">{item.titre}</h1>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-1 text-gray-300">
                        <Clock size={16} />
                        <p className="text-sm">
                          {item.genre === "serie" ? `${item.videos.length} Episodes` : item.duree}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-300">
                        <Star size={16} className="text-yellow-400" />
                        <p className="text-sm">4.8</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 px-6 py-3 rounded-full text-white font-medium shadow-lg shadow-purple-700/30 transition-all cursor-pointer"
                      onClick={() => handlePlay(item.idPlaylist)}
                    >
                      <Play className="mr-2" size={20} fill="white" />
                      WATCH NOW
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* New At PlayToons Section */}
      <section className="mt-16 mb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">New At</h2>
            <img src="/logo.png" alt="PlayToons" className="h-10 ml-2" />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === "all"
                  ? "bg-gradient-to-r from-purple-600 to-violet-700 shadow-md shadow-purple-700/20"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("movie")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                filter === "movie"
                  ? "bg-gradient-to-r from-purple-600 to-violet-700 shadow-md shadow-purple-700/20"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Film size={16} className="mr-1" /> Movies
            </button>
            <button
              onClick={() => setFilter("serie")}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center ${
                filter === "serie"
                  ? "bg-gradient-to-r from-purple-600 to-violet-700 shadow-md shadow-purple-700/20"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              <Tv size={16} className="mr-1" /> Series
            </button>
          </div>
        </div>

        <div className="relative px-2 md:px-4">
          <Slider {...carouselSettings}>
            {filteredData.map((item) => (
              <motion.div
                key={item.idPlaylist}
                className="px-2"
                onMouseEnter={() => setIsHovering(item.idPlaylist)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div
                  className="relative overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => handlePlay(item.idPlaylist)}
                >
                  <div className="aspect-video overflow-hidden rounded-lg">
                    <img
                      src={item.miniature || "/placeholder.svg"}
                      alt={item.titre}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isHovering === item.idPlaylist ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span
                        className={`inline-block px-2 py-0.5 mb-2 text-xs font-medium rounded-sm ${
                          item.genre === "movie" ? "bg-purple-600" : "bg-rose-600"
                        }`}
                      >
                        {item.genre === "movie" ? "Movie" : "Series"}
                      </span>
                      <h3 className="text-lg font-medium mb-2">{item.titre}</h3>
                      <button className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors cursor-pointer">
                        <Play className="h-5 w-5 text-white" fill="white" />
                      </button>
                    </motion.div>
                  </div>
                </div>
                <h3 className="mt-3 text-center font-medium truncate">{item.titre}</h3>
              </motion.div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Last Added Section */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center">
            <TrendingUp className="mr-2 text-purple-500" /> Last Added
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {paginatedPlaylists.map((item) => (
            <motion.div
              key={item.idPlaylist}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg shadow-black/30 cursor-pointer group"
              onClick={() => handlePlay(item.idPlaylist)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={item.miniature || "/placeholder.svg"}
                  alt={item.titre}
                  className="w-full aspect-video object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    className="w-14 h-14 rounded-full bg-purple-600/80 backdrop-blur-sm flex items-center justify-center"
                  >
                    <Play className="h-7 w-7 text-white" fill="white" />
                  </motion.div>
                </div>
                <span
                  className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-md ${
                    item.genre === "movie" ? "bg-purple-600" : "bg-rose-600"
                  }`}
                >
                  {item.genre === "movie" ? "Movie" : "Series"}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg truncate">{item.titre}</h3>
                <div className="flex items-center mt-2 text-gray-400 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>
                    {item.genre === "serie" ? `${item.videos?.length || 0} Episodes` : item.duree || "Unknown"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12 space-x-2"
          >
            <button
              className={`px-4 py-2 rounded-lg flex items-center ${
                currentPage === 1
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon size={18} className="mr-1" /> Prev
            </button>

            <div className="flex items-center px-4 py-2 bg-gray-800 rounded-lg">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Logic to show pages around current page
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-md mx-1 ${
                      currentPage === pageNum ? "bg-purple-600 text-white" : "hover:bg-gray-700 text-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              className={`px-4 py-2 rounded-lg flex items-center ${
                currentPage === totalPages
                  ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 hover:bg-gray-700 text-white"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next <ChevronRightIcon size={18} className="ml-1" />
            </button>
          </motion.div>
        )}
      </section>
    </div>
  )
}

const CustomPrevArrow = ({ onClick }) => (
  <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600/70 transition-colors"
    onClick={onClick}
  >
    <ChevronLeftIcon size={24} />
  </motion.div>
)

const CustomNextArrow = ({ onClick }) => (
  <motion.div
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    className=" absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-purple-600/70 transition-colors"
    onClick={onClick}
  >
    <ChevronRightIcon size={24} />
  </motion.div>
)

export default HomePage
