import React, { useEffect } from "react";
import genreids from "../Utility/genre";
function WatchList({ watchlist, setWatchlist, handleRemoveFromWatchList }) {
  const [search, setSearch] = React.useState("");
  const [genreList, setGenreList] = React.useState(["All Genres"]);
  const [currGenre, setCurrGenre] = React.useState("All Genres");

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleFilter = (genre) => {
    setCurrGenre(genre);
  };

  let sortIncreasing = () => {
    let sorted = watchlist.sort((a, b) => {
      return a.vote_average - b.vote_average;
    });
    setWatchlist([...sorted]);
  };

  let sortDecreasing = () => {
    let sorted = watchlist.sort((a, b) => {
      return b.vote_average - a.vote_average;
    });
    setWatchlist([...sorted]);
  };

  useEffect(() => {
    let temp = watchlist.map((movie) => {
      return genreids[movie.genre_ids[0]];
    });
    temp = new Set(temp);
    setGenreList(["All Genres", ...temp]);
    console.log(temp);
  }, [watchlist]);

  return (
    <>
      <div className="flex justify-center flex-wrap m-4">
        {genreList.map((genre) => {
          return (
            <div
              onClick={() => handleFilter(genre)}
              className={
                currGenre == genre
                  ? "flex justify-center items-center h-[3rem] w-[9rem] bg-blue-400 rounded-xl text-white font-bold hover:scale-110 duration-300 hover:cursor-pointer mx-2 my-2"
                  : "flex justify-center items-center h-[3rem] w-[9rem] bg-gray-400/50 rounded-xl text-white font-bold hover:scale-110 duration-300 hover:cursor-pointer mx-2 my-2"
              }
            >
              {genre}
            </div>
          );
        })}
      </div>
      <div className="flex justify-center my-4">
        <input
          onChange={handleSearch}
          value={search}
          placeholder="Search Movies"
          type="text"
          className="h-[3rem] w-[18rem] bg-gray-200 outline-none px-4"
        />
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 m-8">
        <table className="w-full text-gray-500 text-center">
          <thead className="border-b-2">
            <tr>
              <th>Movie</th>
              <th className="flex justify-center">
                <div
                  onClick={sortIncreasing}
                  className="p-2 hover:scale-110 duration-300 hover:cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-up"></i>
                </div>
                <div className="p-2">Rating</div>
                <div
                  onClick={sortDecreasing}
                  className="p-2 hover:scale-110 duration-300 hover:cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-down"></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>

          <tbody>
            {watchlist
              .filter((movie) => {
                if (currGenre == "All Genres") {
                  return true;
                } else {
                  return genreids[movie.genre_ids[0]] == currGenre;
                }
              })
              .filter((movie) => {
                return movie.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movie) => (
                <tr className="border-b-2">
                  <td className="flex items-center px-6  py-4">
                    <img
                      className="h-[6rem] w-[10rem]"
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    />
                    <div className="mx-10">{movie.title}</div>
                  </td>

                  <td>{movie.vote_average}</td>
                  <td>{movie.popularity}</td>
                  <td>{genreids[movie.genre_ids[0]]}</td>
                  <td
                    onClick={() => handleRemoveFromWatchList(movie)}
                    className="hover:scale-110 duration-300 hover:cursor-pointer text-red-800"
                  >
                    Delete
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default WatchList;
