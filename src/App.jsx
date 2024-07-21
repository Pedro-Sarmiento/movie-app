import React, { useState, useEffect, useRef } from 'react';
import styles from "./App.module.css";

export function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); 
  const [selectedMovie, setSelectedMovie] = useState(null); 

  const fetchMovies = (pageNum) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${pageNum}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setMovies(prevMovies => [...prevMovies, ...data.results]); 
        setPage(prevPage => prevPage + 1); 
      })
      .catch(error => console.error("Fetching movies failed:", error));
  };

  useEffect(() => {
    fetchMovies(page); 
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie); 
  };


  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMovies(page);
      }
    }, {
      threshold: 1
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page]);

  return (
    <div>
      <header className={`${selectedMovie ? styles.blurEffect : ''}`}>
        <h1 className={styles.title}>React Engineer - Technical Assignment - Pedro Sarmiento</h1>
      </header>
      <main className={`${styles.movieGrid} ${selectedMovie ? styles.blurEffect : ''}`}>
        {movies.map(movie => (
          <div key={movie.id} className={styles.movieCard} onClick={() => handleMovieClick(movie)}>
            <div className={styles.posterContainer}>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
              <div className={styles.rating}>{`${movie.vote_average.toFixed(1)} ★`}</div>
            </div>
            <h2>{movie.title}</h2>
          </div>
        ))}
        <div ref={loaderRef} className={styles.loader}>Scroll to load more movies.</div>
      </main>
      {selectedMovie && (
        <div className={styles.movieDetails}>
          <div className={styles.movieDetailsContent}>
            <h2 className={styles.movieTitle}>{selectedMovie.title}</h2>
            <p className={styles.movieOverview}>{selectedMovie.overview}</p>
            <p className={styles.movieOverview}><strong>Release Date:</strong> {selectedMovie.release_date}</p>
            <p className={styles.movieOverview}><strong>Rating: </strong>{selectedMovie.vote_average.toFixed(1)} ★</p>
          </div>
          <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`} alt={selectedMovie.title} className={styles.moviePoster} />
          <div className={styles.closeButton} onClick={() => setSelectedMovie(null)}>X</div>
        </div>
      )}
    </div>
  );
}
