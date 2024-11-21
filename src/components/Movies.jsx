import React from "react";
import MovieCard from "./MovieCard";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
function Movies({
  handleAddtoWatchList,
  handleRemoveFromWatchList,
  watchlist,
}) {
  const [movies, setMovies] = React.useState([]);
  const [pageNo, setPageNo] = React.useState(1);

  const handlePrev = () => {
    if (pageNo === 1) return;
    setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=73f10498b54ea78ab4f343b90b8c237f&language=en-US&page=${pageNo}`
      ) //it is a get request to the api to get the popular movies from the api and the page number is passed as a parameter to get the movies of that page number from the api and it returns a promise which is resolved by the then method and the data is stored in the res variable and the setMovies method is used to set the movies state with the data from the api
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNo]);
  return (
    <div className="p-5">
      <div className="text-2xl m-5 font-bold text-center">Trending Movies</div>

      <div className="flex flex-row flex-wrap justify-around gap-1">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            poster_path={movie.poster_path}
            name={movie.original_title}
            handleAddtoWatchList={handleAddtoWatchList}
            movie={movie}
            handleRemoveFromWatchList={handleRemoveFromWatchList}
            watchlist={watchlist}
          />
        ))}
      </div>
      <Pagination
        pageNo={pageNo}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </div>
  );
}

export default Movies;

// https://api.themoviedb.org/3/movie/popular?api_key=73f10498b54ea78ab4f343b90b8c237f&language=en-US&page=1
