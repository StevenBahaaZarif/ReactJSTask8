import "./App.css";
import MovieDetails from './Components/movieDetails/movieDetails';
import Movies from './Components/Movies/movies';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
    <Route path="/" element={<Movies />} />
    <Route path="/movie" element={<Movies />} />
    <Route path="/movieDetails/:id" element={<MovieDetails />} />
    <Route path="*" element={<Movies />} />
  </Routes>
  );
}

export default App;
