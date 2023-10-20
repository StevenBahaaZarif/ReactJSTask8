import React,{ useEffect, useState } from "react";
import axiosInstance from "../axiosConfg/instance";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Movies() {
    const imagePath = "https://image.tmdb.org/t/p/w500";
  const [allMovies, setAllMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const lang = useSelector((state) => state.language);
  const loader = useSelector((state) => state.loader);
  useEffect(() => {
    axiosInstance
      .get(`/movie/now_playing`, {
        params: {
          page: pageNumber,
          language: lang,
        },
      })
      .then((response) => {
        setAllMovies(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pageNumber, lang]);

  const prevPage = () => {
    let currentPage = pageNumber;
    if (!currentPage <= 1) {
      currentPage--;
      setPageNumber(currentPage);
    }
  };
  const NextPage = () => {
    let currentPage = pageNumber;
    currentPage++;
    setPageNumber(currentPage);
  };
  return (
    <>
    
      {loader && (
        <div className="row justify-content-center">
          <div>
            <div
              className="spinner-border m-5"
              style={{ width: "4rem", height: "4rem" }}
            ></div>
          </div>
        </div>
      )}

      <div className="w-25 float-end mt-2">
        <button
          className="btn btn-warning"
          onClick={prevPage}
          disabled={pageNumber <= 1 ? true : false}
        >
          Prev
        </button>
        <button className="btn btn-warning" onClick={NextPage}>
          Next
        </button>
      </div>

      <div className="container mt-5">
        <div className="row">
          {allMovies.map((movie) => (
            <Card style={{ width: "20rem", margin: "2px" }} className="Card">
              <Card.Img
                variant="top"
                src={`${imagePath}${movie.poster_path}`}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.overview}</Card.Text>
                <Link
                  className="btn btn-success"
                  to={`/movieDetails/${movie.id}`}
                >
                  See Details
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Movies;