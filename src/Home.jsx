import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon, Play } from "lucide-react";
import { setselectedPlaylist } from "./redux/actions";
import { motion, AnimatePresence } from "framer-motion";


function HomePage() {
  const data = useSelector((state) => state.data) || [];
  const [featured, setFeatured] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data.length) {
      const randomFeatured = data.sort(() => 0.5 - Math.random()).slice(0, 5);
      setFeatured(randomFeatured);
    }
  }, [data]);

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
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: <CustomPrevArrow />, // Use custom left arrow
    nextArrow: <CustomNextArrow />, // Use custom right arrow
  };

  const handeleplay = (playlistId) => {
    dispatch(setselectedPlaylist(playlistId));
    navigate(`/play/${playlistId}`);  // Navigate to Player with playlistId
  };


  return (
    <div className="min-h-screen text-white px-4 md:px-8" >
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
                  <p className="text-sm md:text-base opacity-80">
                    {item.genre === "serie"
                      ? `${item.videos.length} Episodes`
                      : item.duree}
                  </p>
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

      {/* Movies Carousel */}
      <section>
        <h2 className="text-xl font-semibold my-4 ">Movies Toons</h2>
        <Slider {...carouselSettings}>
          {movies.map((movie) => (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                exit={{ opacity: 0, y: -20 }} key={movie.idPlaylist} to={`/playlist/${movie.idPlaylist}`} className="p-2 mx-auto" onClick={() => handeleplay(movie.idPlaylist)}>
              <img src={movie.miniature} alt={movie.titre} className="md:w-72 md:h-36 w-full h-36 object-cover rounded cursor-pointer" />
              <p className="text-center mt-2 cursor-pointer">{movie.titre}</p>
            </motion.div>
          ))}
        </Slider>
      </section>

      {/* Series Carousel */}
      <section>
        <h2 className="text-xl font-semibold my-4">Series Toons</h2>
        <Slider {...carouselSettings}>
          {series.map((serie) => (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                exit={{ opacity: 0, y: -20 }} key={serie.idPlaylist} to={`/playlist/${serie.idPlaylist}`} className="p-2" onClick={() => handeleplay(serie.idPlaylist)}>
              <img src={serie.miniature} alt={serie.titre} className="md:w-48 md:h-64 w-full h-36 object-cover rounded cursor-pointer" />
              <p className="text-center mt-2 cursor-pointer">{serie.titre}</p>
            </motion.div>
          ))}
        </Slider>
      </section>

      {/* Last Added List */}
      <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      exit={{ opacity: 0, y: -20 }}>
        <h2 className="text-xl font-semibold my-4">Last Added</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {latest.map((item) => (
            <div key={item.idPlaylist} to={`/playlist/${item.idPlaylist}`} className="p-2">
              <img src={item.miniature} alt={item.titre} className="w-full h-48 object-cover rounded" />
              <p className="text-center mt-2">{item.titre}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}



const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10"
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
