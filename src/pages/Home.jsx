import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../utils/tmdb";
import MovieCarousel from "../components/MovieCarousel";
import MovieModal from "../components/MovieModal";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    const trendingData = await getTrendingMovies();
    const topRatedData = await getTopRatedMovies();
    const upcomingData = await getUpcomingMovies();

    setTrending(trendingData);
    setTopRated(topRatedData);
    setUpcoming(upcomingData);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <MovieCarousel
        title="Trending Now"
        movies={trending}
        onMovieClick={handleMovieClick}
      />
      <MovieCarousel
        title="Top Rated"
        movies={topRated}
        onMovieClick={handleMovieClick}
      />
      <MovieCarousel
        title="Coming Soon"
        movies={upcoming}
        onMovieClick={handleMovieClick}
      />

      <MovieModal
        movie={selectedMovie}
        isOpen={!!selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </motion.div>
  );
};

export default Home;
