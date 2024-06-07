import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div className="movie-card">
      <div className="movie-card__item"
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    description: PropTypes.string.isReequired,
    genre: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    featured: PropTypes.bool
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};