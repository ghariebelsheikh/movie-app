import { TypeList, useMoviesContext } from "../../contexts/MoviesContext";
import styles from "./Select.module.scss";

const options = [
  { value: "top_rated", label: "Top Rated Movies" },
  { value: "upcoming", label: "Upcoming Movies" },
  { value: "now_playing", label: "Now Playing Movies" },
];
const Select = () => {
  const { typeList, updateTypeList } = useMoviesContext();
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateTypeList(event.target.value as TypeList);
  };
  return (
    <select
      className={styles.select}
      onChange={(event) => handleChange(event)}
      value={typeList}
    >
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
