import { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoriteMovies = () => {
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    fetch("https://my-movies-db-cafa6b5db6b8.herokuapp.com/movies", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.json())
        .then((movies) => {
          setMovies(movies);
          setFavMovies(
            movies.filter((movie) => {
              return currentUser.FavoriteMovies.includes(movie.id);
            })
          );
        })
        .catch((error) => console.error("Error fetching movies", error));
  }, []);

  console.log(favMovies);
  console.log(movies);

  return (
    <Container>
      <Row>
        <Col style={{ fontWeight: 'bold' }}>
          <h3>My Favorite Movies:</h3>
        </Col>
      </Row>
      <Row>
        {favMovies.length === 0 ? (
          <div>No favorite movies</div>
        ) : (
          currentUser && favMovies.map((movie) => {
          return (<MovieCard 
            movie={movie}
          />)
          })
        )
        }
      </Row>
    </Container>
  )
}