import { useEffect, useRef, useState } from "react";
import { useMovies } from "./useMovies.js";
import { useLocalStorageState } from "./useLocalStorageState.js";
import "./index.css";
import StarRating from "./StarRating.js";
import { useKey } from "./useKey.js";

const KEY = "12a4c454";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [isSelected, setIsSelected] = useState(null);
  const [rating, setRating] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");
  function onSelectMovie(movieId) {
    setIsSelected((selectedId) => (movieId === selectedId ? null : movieId));
    setRating(null);
  }

  function onCloseMovie() {
    setIsSelected(null);
  }

  function addWatchedMovie(movie) {
    if (!rating) return;
    const newMovie = {
      ...movie,
      rating,
    };
    setWatched((watched) => [...watched, newMovie]);
    setIsSelected(null);
  }

  function removeWatchedMovie(movie) {
    setWatched((watched) =>
      watched.filter((watchedMovie) => watchedMovie.imdbID !== movie.imdbID)
    );
  }

  return (
    <>
      <NavBar>
        <Logo />
        <SearchBar query={query} setQuery={setQuery} />
        <ResultsFound movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              isSelected={isSelected}
              onSelect={onSelectMovie}
            />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {isSelected ? (
            <MovieDetails
              isSelected={isSelected}
              onCloseMovie={onCloseMovie}
              onMovieAdd={addWatchedMovie}
              watched={watched}
              onSetRating={setRating}
              rating={rating}
            />
          ) : (
            <>
              <WatchedMoviesSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDelete={removeWatchedMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function NavBar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function SearchBar({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(function () {
    inputEl.current.focus();
  }, []);

  useKey("Enter", function () {
    if (document.activeElement !== inputEl.current) {
      setQuery("");
      inputEl.current.focus();
    }
  });

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function ResultsFound({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MoviesList({ movies, isSelected, onSelect }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          isSelected={isSelected}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelect }) {
  return (
    <li onClick={() => onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function Loader() {
  return <p className="loader">LOADING...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>{message}</span>
    </p>
  );
}

function MovieDetails({
  isSelected,
  onCloseMovie,
  onMovieAdd,
  watched,
  onSetRating,
  rating,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const isOnWatchedList = watched.some((movie) => movie.imdbID === isSelected);

  const clicksBeforeRating = useRef(0);

  /// Displaying info in the page porpuses
  const {
    Title: title,
    Released: released,
    Runtime: runtime,
    Poster: poster,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movie;

  useEffect(
    function () {
      if (!rating) {
        clicksBeforeRating.current = 0;
        return;
      }
      clicksBeforeRating.current++;
      console.log(clicksBeforeRating);
    },
    [rating]
  );

  useKey("escape", onCloseMovie);

  useEffect(
    function () {
      async function getMovieDetails() {
        onSetRating(null);
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${isSelected}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [isSelected, onSetRating]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `MOVIE | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return isLoading ? (
    <Loader />
  ) : (
    <div className="details">
      <header>
        <button className="btn-back" onClick={onCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${title} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐ {imdbRating} IMDb rating</span>
          </p>
        </div>
      </header>

      <section>
        <div className="rating">
          {isOnWatchedList ? (
            <span>
              You rated this movie{" "}
              {watched.find((movie) => movie.imdbID === isSelected).rating} ⭐
            </span>
          ) : (
            <>
              <StarRating maxRating={10} size={24} onSetRating={onSetRating} />
              {rating ? (
                <button
                  className="btn-add"
                  onClick={() => onMovieAdd({ ...movie, clicksBeforeRating })}
                >
                  + Add to list
                </button>
              ) : (
                ""
              )}
            </>
          )}
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
}

function WatchedMoviesSummary({ watched }) {
  const avgImdbRating = average(
    watched.map((movie) => movie.imdbRating)
  ).toFixed(2);
  const avgUserRating = average(watched.map((movie) => movie.rating)).toFixed(
    2
  );
  const avgRuntime = average(
    watched.map((movie) => +movie.Runtime.slice(0, 3))
  ).toFixed(2);

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched, onDelete }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <li key={movie.imdbID}>
          <img src={movie.Poster} alt={`${movie.Title} poster`} />
          <h3>{movie.Title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.rating.toFixed(1)}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{+movie.Runtime.slice(0, 3)} min</span>
            </p>
          </div>
          <button className="btn-delete" onClick={() => onDelete(movie)}>
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
