import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  Heart,
  BookOpen,
  ExternalLink,
  Calendar,
  Clock,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getMovieDetails, getImageUrl, getBackdropUrl } from "../utils/tmdb";

const MovieModal = ({ movie, isOpen, onClose }) => {
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    if (isOpen && movie) {
      fetchMovieDetails();
    }
  }, [isOpen, movie]);

  const fetchMovieDetails = async () => {
    const details = await getMovieDetails(movie.id);
    setMovieDetails(details);
  };

  if (!isOpen || !movie) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative">
            <img
              src={getBackdropUrl(movieDetails?.backdrop_path)}
              alt={movieDetails?.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 rounded-full text-white hover:bg-opacity-70 transition-all"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="absolute bottom-4 left-4 text-white">
              <h1 className="text-3xl font-bold mb-2">{movieDetails?.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span>{movieDetails?.vote_average?.toFixed(1)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-5 w-5" />
                  <span>
                    {movieDetails?.release_date}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-5 w-5" />
                  <span>{movieDetails?.runtime} min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <img
                src={getImageUrl(movieDetails?.poster_path)}
                alt={movieDetails?.title}
                className="w-48 h-72 object-cover rounded-lg mx-auto md:mx-0"
              />

              {/* Details */}
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-4">
                  {movieDetails?.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm text-gray-700 dark:text-gray-300"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {movieDetails?.overview}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // onClick={handleLike}
                    className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Like</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // onClick={handleAddToCollection}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <BookOpen className="h-5 w-5" />
                    <span>Add to Collection</span>
                  </motion.button>
                  {/* View Details Button */}
                  <Link
                    to={`/movie/${movieDetails?.id}`}
                    onClick={onClose}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>View Details</span>
                  </Link>
                </div>

                {/* Cast */}
                {movieDetails?.credits?.cast && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Cast
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {movieDetails.credits.cast.slice(0, 6).map((actor) => (
                        <div
                          key={actor.id}
                          className="flex items-center space-x-2"
                        >
                          <img
                            src={getImageUrl(actor.profile_path)}
                            alt={actor.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {actor.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {actor.character}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieModal;
