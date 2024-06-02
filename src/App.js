import { useEffect, useState } from "react";
import { useMovies } from "./hook/useMovies";
import { Header, SearchInput, NumResult } from "./component/Header";
import { Main, Box } from "./component/Main";
import { MovieList } from "./component/MovieList";
import { WatchedSummary, WatchedList } from "./component/WatchedSummary";
import { MovieDetails } from "./component/MovieDetails";
import useLoaclStroge from "./hook/useLocalStorge";
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const key = "6753acb5";
export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLoaclStroge([],"watched");
  const { movies, isLoading, error } = useMovies(query, handleCloseMovie);
  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }
  function handleDeleteMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );
  return (
    <>
      <Header>
        <SearchInput query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Header>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteMovie={handleDeleteMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

export function Loader() {
  return (
    <div className="center">
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

function ErrorMessage({ error }) {
  return <p className="error"> {error}</p>;
}
