import { useCallback, useMemo } from "react";
import useLocalStorageState from "../../hooks/useLocalStorageEvent";
import { Movie } from "../../models/Movie";
import styles from "./MovieCard.module.scss";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const [favoriteMovies, setFavoriteMovies] =
    useLocalStorageState<Movie[]>("favorite-movies");

  const isFavorite = useMemo(
    () => (favoriteMovies?.findIndex(({ id }) => id === movie.id) ?? -1) > -1,
    [favoriteMovies, movie.id]
  );

  const addToFavorites = useCallback(() => {
    setFavoriteMovies([movie, ...(favoriteMovies ?? [])]);
  }, [favoriteMovies, movie, setFavoriteMovies]);

  const removeFromFavorites = useCallback(() => {
    setFavoriteMovies(
      favoriteMovies?.filter(({ id }) => id !== movie.id) ?? []
    );
  }, [favoriteMovies, movie, setFavoriteMovies]);

  return (
    <div className={styles.movie__card}>
      <div className={styles.movie__card__img}>
        <img src={movie.picture} alt={movie.title} />
      </div>
      <div className={styles.movie__card__footer}>
        <div className={styles.movie__card__footer__name}>
          <p>{movie.title}</p>
          <p>{movie.date}</p>
        </div>
        <div className={styles.movie__card__footer__rating}>{movie.rating}</div>
        <input
          className={
            isFavorite
              ? styles.movie__card__footer__favorite
              : styles.movie__card__footer__unfavorite
          }
          type="button"
          value={isFavorite ? "Unfavorite" : "Favorite"}
          onClick={isFavorite ? removeFromFavorites : addToFavorites}
        />
      </div>
    </div>
  );
};

export default MovieCard;
