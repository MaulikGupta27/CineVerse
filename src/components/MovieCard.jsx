import { motion } from "framer-motion";
import { BookOpen, Heart, Star } from "lucide-react";
import { getImageUrl } from "../utils/tmdb";

const MovieCard = ({ movie, onClick }) => {
  const releaseDate = movie.release_date;
  const [year, month, day] = releaseDate.split("-");
  const ordered_releaseDate = `${day}-${month}-${year}`;

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden cursor-pointer group"
      layout
    >
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt="moviePoster"
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="flex space-x-2"
          >
            <>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white text-gray-700 shadow-lg"
              >
                <Heart className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                //   onClick={handleAddToCollection}
                className="p-2 rounded-full bg-white text-gray-700 shadow-lg"
              >
                <BookOpen className="h-5 w-5" />
              </motion.button>
            </>
          </motion.div>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {movie.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {movie.vote_average?.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {ordered_releaseDate}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
          {movie.overview}
        </p>
      </div>
    </motion.div>
  );
};

export default MovieCard;
