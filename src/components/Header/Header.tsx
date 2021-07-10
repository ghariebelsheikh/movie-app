import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Select from "../Select/Select";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.header__title}>
        <Link to="/movies">Movie App</Link>
      </h1>
      <div className={styles.header__navitem}>
        <Link to="/favorites">Favorites</Link>
      </div>
      <div className={styles.header__select}>
        <Select></Select>
      </div>

      <div className={styles.header__search}>
        <SearchBar></SearchBar>
      </div>
    </div>
  );
};

export default Header;
