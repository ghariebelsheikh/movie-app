import MovieCard from "../../components/MovieCard/MovieCard";
import { useMoviesContext } from "../../contexts/MoviesContext";
import { Movie } from "../../models/Movie";
import styles from "./MovieList.module.scss";

const MovieList = () => {
  const { movies } = useMoviesContext();
  return (
    <div className={styles.container}>
      {movies.map((movie: Movie) => (
        <MovieCard movie={movie} key={movie.id}></MovieCard>
      ))}
    </div>
  );
};

export default MovieList;
