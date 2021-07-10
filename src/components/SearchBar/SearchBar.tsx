import { useMoviesContext } from "../../contexts/MoviesContext";
import styles from "./SearchBar.module.scss";

const SearchBar = () => {
  const { query, updateQuery } = useMoviesContext();
  return (
    <div className={styles.search}>
      <input
        type="text"
        name="movie"
        className={styles.search__input}
        placeholder="Search movie ... "
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
