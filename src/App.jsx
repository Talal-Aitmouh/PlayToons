import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SeriesPage from "./pages/SeriesPage";
import Player from "./pages/Player";
import HomePage from "./pages/Home";
import MoviesPage from "./pages/MoviesPage";

function App() {
  return (
    <Router>
      <div className="background scrollbar-hidden">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/play/:playlistId" element={<Player />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/movies" element={<MoviesPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
