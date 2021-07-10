import MovieCard from "../../components/MovieCard/MovieCard";
import useLocalStorageState from "../../hooks/useLocalStorageEvent";
import { Movie } from "../../models/Movie";
import styles from "./FavoriteList.module.scss";

const FavoriteList = () => {
  const [movies] = useLocalStorageState<Movie[]>("favorite-movies");

  return (
    <div className={styles.container}>
      {(movies ?? []).map((movie: Movie) => (
        <MovieCard movie={movie} key={movie.id}></MovieCard>
      ))}
    </div>
  );
};

export default FavoriteList;
