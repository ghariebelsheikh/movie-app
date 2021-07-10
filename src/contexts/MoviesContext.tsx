import React, { FC, useContext, useEffect, useState } from "react";
import { getMovieswithTypeList, searchMovies } from "../controllers/movies";
import useDebouncedValue from "../hooks/useDebouncedValue";
import { Movie } from "../models/Movie";

export type TypeList = "top_rated" | "upcoming" | "now_playing";

export const MoviesContext = React.createContext<{
  movies: Movie[];
  typeList: string;
  query: string;
  updateTypeList: (typeList: TypeList) => void;
  updateQuery: (query: string) => void;
} | null>(null);

export const MoviesContextProvider: FC = (props) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [typeList, setTypeList] = useState<TypeList>("now_playing");
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    (debouncedQuery
      ? searchMovies(debouncedQuery)
      : getMovieswithTypeList(typeList)
    ).then((movies) => {
      setMovies(movies);
    });
  }, [debouncedQuery, typeList]);

  return (
    <MoviesContext.Provider
      value={{
        query,
        movies,
        typeList,
        updateTypeList: setTypeList,
        updateQuery: setQuery,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export const useMoviesContext = () => {
  const value = useContext(MoviesContext);

  if (!value) throw new Error("MoviesContext used without being provided");

  return value;
};
