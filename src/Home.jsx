import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Play } from "lucide-react";

function HomePage() {
  const data = useSelector((state) => state.data) || [];
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    if (data.length) {
      const randomIndex = Math.floor(Math.random() * data.length);
      setFeatured(data[randomIndex]);
    }
  }, [data]);

  const movies = data.filter((item) => item.genre === "movie");
  const series = data.filter((item) => item.genre === "serie");
  const latest = [...data].reverse().slice(0, 6);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen text-white px-4" style={{ background: 'linear-gradient(to bottom, #1E1E1E, #3D3B49)' }}>
      {/* Hero Section */}
      {featured && (
        <div className="relative w-full h-60 md:h-80 lg:h-96 rounded-2xl overflow-hidden mt-6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${featured.miniature})` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          <div className="absolute bottom-5 left-6 text-white">
            <h1 className="text-2xl md:text-3xl font-bold">{featured.titre}</h1>
            <p className="text-sm md:text-base opacity-80">
              {featured.genre === "serie"
                ? `${featured.videos.length} Episodes`
                : featured.duree}
            </p>
          </div>
          <Link
            to={`/playlist/${featured.idPlaylist}`}
            className="absolute bottom-5 right-6 flex items-center bg-white/20 hover:bg-white/30 transition px-4 py-2 rounded-full text-white"
          >
            PLAY NOW <Play className="ml-2" />
          </Link>
        </div>
      )}

      {/* Movies Carousel */}
      <section>
        <h2 className="text-xl font-semibold my-4">Movies Toons</h2>
        <Slider {...settings}>
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
        <Slider {...settings}>
          {series.map((serie) => (
            <Link key={serie.idPlaylist} to={`/playlist/${serie.idPlaylist}`} className="p-2">
              <img src={serie.miniature} alt={serie.titre} className="w-full h-48 object-cover rounded" />
              <p className="text-center mt-2">{serie.titre}</p>
            </Link>
          ))}
        </Slider>
      </section>

      {/* Last Added Carousel */}
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

export default HomePage;
