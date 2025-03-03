import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon, Clock, Play } from "lucide-react";
import { setselectedPlaylist } from "../redux/actions";
import { motion, AnimatePresence } from "framer-motion";


function HomePage() {
  const data = useSelector((state) => state.data) || [];
  const [featured, setFeatured] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data.length) {
      const randomFeatured = data.sort(() => 0.5 - Math.random()).slice(0, 5);
      setFeatured(randomFeatured);
    }
  }, [data]);

  useEffect(() => {
    if (filter === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter((item) => item.genre === filter));
    }
  }, [filter, data]);

  const movies = data.filter((item) => item.genre === "movie");
  const series = data.filter((item) => item.genre === "serie");
  const latest = [...data].reverse().slice(0, 6);

  const heroSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1, // Show only 1 slide at a time for the Hero section
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />, 
  };


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get current playlists for pagination
  const paginatedPlaylists = [...data].reverse().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handeleplay = (playlistId) => {
    dispatch(setselectedPlaylist(playlistId));
    navigate(`/play/${playlistId}`);  // Navigate to Player with playlistId
  };


  return (
    <div className="min-h-screen text-white px-4 md:px-8 pb-4" >
      {/* Hero Section */}
      {featured.length > 0 && (
        <AnimatePresence initial={true} exitBeforeEnter>
          <Slider {...heroSettings}>
            {featured.map((item) => (
              <motion.div
                key={item.idPlaylist}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative w-full h-60 md:h-80 lg:h-96 rounded-2xl overflow-hidden my-6"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.miniature})` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-5 left-6 text-white">
                  <h1 className="text-2xl md:text-3xl font-bold">{item.titre}</h1>
                  <div className="flex items-center gap-4 mt-2">
                    <Clock />
                    <p className="text-sm md:text-base opacity-80">
                      {item.genre === "serie"
                        ? `${item.videos.length} Episodes`
                        : item.duree}
                    </p>
                  </div>

                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute bottom-5 right-6 flex items-center bg-[#6B5ECD]/80 hover:bg-white/30 transition px-4 py-2 rounded-full text-white cursor-pointer"
                  onClick={() => handeleplay(item.idPlaylist)}
                >
                  PLAY NOW <Play className="ml-2" />
                </motion.button>
              </motion.div>
            ))}
          </Slider>
        </AnimatePresence>
      )}

      <section>
        <div className="flex md:flex-row flex-col justify-start md:justify-between md:items-center my-4 px-12 ">
          <h2 className="text-xl font-semibold flex items-center">
            New At <img src="/logo.png" alt="PlayToons" className="h-12 ml-2" />
          </h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-purple-600 text-white text-start md:px-12 px-4 py-2 rounded-md"
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="serie">Series</option>
          </select>
        </div>
        <div className="relative lg:px-12 px-0">
        <Slider {...carouselSettings}>
          {filteredData.map((item) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              exit={{ opacity: 0, y: -20 }}
              key={item.idPlaylist}
              className="relative p-2 mx-auto cursor-pointer"
              onClick={() => handeleplay(item.idPlaylist)}
            >
              <div className="relative group">
                {/* Genre Ribbon */}
                <span
                  className="absolute bottom-0 left-0 px-3 py-1 text-lg opacity-90 font-bold text-white  z-10"
                  style={{ backgroundColor: item.genre === "movie" ? "#6B5ECD" : "#E50914" }}
                >
                  {item.genre === "movie" ? "Movie" : "Serie"}
                </span>
                <div className="relative">
                  <img
                    src={item.miniature}
                    alt={item.titre}
                    className="md:w-72 md:h-36 w-full h-36 object-cover rounded "
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Play className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center mt-2">{item.titre}</p>
            </motion.div>
          ))}
        </Slider>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        exit={{ opacity: 0, y: -20 }}
      >
        <h2 className="text-xl font-semibold my-4">Last Added</h2>

        {/* Animated Playlist Grid */}
        <AnimatePresence mode="wait">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" >
            {paginatedPlaylists.map((item) => (
              <motion.div
                key={item.idPlaylist}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="p-2 cursor-pointer"
                onClick={() => handeleplay(item.idPlaylist)}
              >
                <img
                  src={item.miniature}
                  alt={item.titre}
                  className="w-full h-48 object-cover rounded"
                />
                <p className="text-center mt-2">{item.titre}</p>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Pagination Controls with Motion */}
        <motion.div
          className="flex justify-center mt-6 space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            className={`px-4 py-2  rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-purple-600 cursor-pointer hover:bg-purple-700"
              }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <motion.span
            key={currentPage} // This triggers re-animation when page changes
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-white px-4 py-2"
          >
            Page {currentPage} of {totalPages}
          </motion.span>

          <button
            className={`px-4 py-2 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-purple-600 cursor-pointer hover:bg-purple-700"
              }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </motion.div>
      </motion.section>


    </div>
  );
}



const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10"
    onClick={onClick}
  >
    <ChevronLeftIcon />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10"
    onClick={onClick}
  >
    <ChevronRightIcon />
  </div>
);

export default HomePage;
