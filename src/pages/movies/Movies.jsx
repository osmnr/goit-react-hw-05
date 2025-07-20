import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { fetchMovies } from "../../movie_api";
import css from "./Movies.module.css";

function Movies() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const [query, setQuery] = useState(queryParam);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim() === "") return;
    setSearchParams({ query });
    try {
      const data = await fetchMovies(
        `/search/movie?query=${query}&language=en-US`
      );
      setSearchResults(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (queryParam) {
      handleSearch();
    }
  }, [queryParam]);

  return (
    <>
      <div className={css.searchForm}>
        <input
          type="text"
          name="searchInput"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch} className={css.searchBtn}>
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location, query, searchResults }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Movies;
