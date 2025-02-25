import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon, Play } from "lucide-react";

function HomePage() {
  const data = useSelector((state) => state.data) || [];
  const [featured, setFeatured] = useState([]);

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
    slidesToShow: 4,
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
  

  return (
    <div className="min-h-screen text-white px-8" style={{ background: 'linear-gradient(to bottom, #1E1E1E, #3D3B49)' }}>
      {/* Hero Section */}
      {featured.length > 0 && (
        <Slider {...heroSettings}>
          {featured.map((item) => (
            <div key={item.idPlaylist} className="relative w-full h-60 md:h-80 lg:h-96 rounded-2xl overflow-hidden mt-6">
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
              <Link
                to={`/playlist/${item.idPlaylist}`}
                className="absolute bottom-5 right-6 flex items-center bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-full text-white"
              >
                PLAY NOW <Play className="ml-2" />
              </Link>
            </div>
          ))}
        </Slider>
      )}

      {/* Movies Carousel */}
      <section>
        <h2 className="text-xl font-semibold my-4 ">Movies Toons</h2>
        <Slider {...carouselSettings}>
          {movies.map((movie) => (
            <Link key={movie.idPlaylist} to={`/playlist/${movie.idPlaylist}`} className="p-2">
              <img src={movie.miniature} alt={movie.titre} className="w-full h-48 object-cover rounded" />
              <p className="text-center mt-2">{movie.titre}</p>
            </Link>
          ))}
        </Slider>
      </section>

      {/* Series Carousel */}
      <section>
        <h2 className="text-xl font-semibold my-4">Series Toons</h2>
        <Slider {...carouselSettings}>
          {series.map((serie) => (
            <Link key={serie.idPlaylist} to={`/playlist/${serie.idPlaylist}`} className="p-2">
              <img src={serie.miniature} alt={serie.titre} className="w-full h-48 object-cover rounded" />
              <p className="text-center mt-2">{serie.titre}</p>
            </Link>
          ))}
        </Slider>
      </section>

      {/* Last Added List */}
      <section>
        <h2 className="text-xl font-semibold my-4">Last Added</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latest.map((item) => (
            <Link key={item.idPlaylist} to={`/playlist/${item.idPlaylist}`} className="p-2">
              <img src={item.miniature} alt={item.titre} className="w-full h-32 object-cover rounded" />
              <p className="text-center mt-2">{item.titre}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

import { ChevronLeft, ChevronRight } from 'lucide-react';

const CustomPrevArrow = ({ onClick }) => (
  <div
    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-xl cursor-pointer z-10"
    onClick={onClick}
  >
    <ChevronLeftIcon />
  </div>
);

const CustomNextArrow = ({ onClick }) => (
  <div
    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-xl cursor-pointer z-10"
    onClick={onClick}
  >
    <ChevronRightIcon />
  </div>
);

export default HomePage;
