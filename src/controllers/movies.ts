import { Movie } from "../models/Movie";

const movieApiBaseUrl = "https://api.themoviedb.org/3";
const posterBaseUrl = "https://image.tmdb.org/t/p/w300";

export function getMovieswithTypeList(typeList: string): Promise<Movie[]> {
  return fetch(
    `${movieApiBaseUrl}/movie/${typeList}?api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => res.json())
    .then((response) => mapResult(response.results))
    .catch((_) => {
      return [];
    });
}

export function searchMovies(search: string): Promise<Movie[]> {
  return fetch(
    `${movieApiBaseUrl}/search/movie?query=${search}&api_key=${process.env.REACT_APP_API_KEY}`
  )
    .then((res) => res.json())
    .then((response) => mapResult(response.results))
    .catch((_) => {
      return [];
    });
}

function mapResult(res: any[]): Movie[] {
  return res.map((movie) => {
    const { id, title, vote_average, overview, poster_path, release_date } =
      movie;

    return {
      id,
      title,
      date: release_date,
      rating: vote_average,
      resume: overview,
      picture: poster_path ? `${posterBaseUrl}${poster_path}` : undefined,
    };
  });
}
