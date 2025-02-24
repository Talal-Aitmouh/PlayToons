import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import SeriesPage from "./SeriesPage";
import Player from "./Player";
import HomePage from "./Home";
import MoviesPage from "./MoviesPage";

function App() {
  return (
    <Router>
      <div style={{ background: 'linear-gradient(to bottom, #1E1E1E, #3D3B49)' }}>
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
