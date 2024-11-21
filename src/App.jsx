import "./App.css";
import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import Banner from "./components/Banner";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  let [watchlist, setWatchlist] = React.useState([]);

  let handleAddtoWatchList = (movie) => {
    let newWatchlist = [...watchlist, movie];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  let handleRemoveFromWatchList = (movie) => {
    let newWatchlist = watchlist.filter((item) => item.id !== movie.id);
    localStorage.setItem("moviesApp", JSON.stringify(newWatchlist));
    setWatchlist(newWatchlist);
  };

  useEffect(() => {
    let movies = JSON.parse(localStorage.getItem("moviesApp"));
    if (movies) {
      setWatchlist(movies);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Banner />
              <Movies
                handleAddtoWatchList={handleAddtoWatchList}
                handleRemoveFromWatchList={handleRemoveFromWatchList}
                watchlist={watchlist}
              />
            </>
          }
        />
        <Route
          path="/watchlist"
          element={
            <WatchList
              watchlist={watchlist}
              setWatchlist={setWatchlist}
              handleRemoveFromWatchList={handleRemoveFromWatchList}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
