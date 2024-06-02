import { useEffect, useRef } from "react";

export function Header({ children }) {
  return (
    <header>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </header>
  );
}
function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
export function SearchInput({ query, setQuery }) {
  const input = useRef(null);
  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === input.current) return;
        if (e.code === "Enter") {
          input.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={input}
    />
  );
}
export function NumResult({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
