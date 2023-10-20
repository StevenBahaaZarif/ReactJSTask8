import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import axiosInstance from "../axiosConfg/instance";
function MovieDetails() {
  const { id } = useParams();
  const imagePath = "https://image.tmdb.org/t/p/w500";
  const [movie, setMovie] = useState({});
  const lang = useSelector((state) => state.language);
  const loader = useSelector((state) => state.loader);

  useEffect(() => {
    axiosInstance
      .get(`/movie/${id}`, {
        params: {
          language: lang,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lang]);
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
      <Card style={{ width: "20rem", margin: "2px" }} className="Card">
        <Card.Img variant="top" src={`${imagePath}${movie.poster_path}`} />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.overview}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}

export default MovieDetails;