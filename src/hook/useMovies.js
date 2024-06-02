import { useEffect, useState } from "react";
const key = "6753acb5";
export function useMovies(query, callback) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    useEffect(
        function () {
            const controller = new AbortController();
            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(
                        `https://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`,
                        { signal: controller.signal }
                    );
                    if (!res.ok)
                        throw new Error("Some thing with wrong with fetch movie");
                    const data = await res.json();
                    if (data.Response === "False") throw new Error("Movie Not Found");
                    setMovies(data.Search);
                    setError("");
                } catch (err) {
                    if (err.name !== "AbortError") {
                        console.log(err.message);
                        setError(err.message);
                    }
                } finally {
                    setIsLoading(false);
                }
            }
            if (query.length < 2) {
                setMovies([]);
                setError("");
                return;
            }
            callback?.();
            fetchMovies();
            return function () {
                controller.abort();
            };
        },
        [query]
    );
    return { movies, isLoading, error };
}
