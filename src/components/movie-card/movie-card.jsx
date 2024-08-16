import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const addFavMovie = () => {
    fetch(`https://my-movies-db-cafa6b5db6b8.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      "method": "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then(movies => {
        alert("Movie added");
        const currentUser = JSON.parse(localStorage.getItem("user"));
        currentUser.FavoriteMovies.push(movie.id);
        localStorage.setItem("user", JSON.stringify(currentUser));
      })
      .catch(e => console.log(e));
  }

  const removeFavMovie = () => {
    fetch(`https://my-movies-db-cafa6b5db6b8.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      "method": "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then(movies => {
        alert("Movie deleted");
        const currentUser = JSON.parse(localStorage.getItem("user"));
        currentUser.FavoriteMovies.pull(movie.id);
        localStorage.removeItem("user", JSON.stringify(currentUser));
      })
      .catch(e => console.log(e));
  }

  return (
    <Card className="h-100">
      <Card.Img variant="top" src={movie.imagePath} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`} >
          <Button variant="primary">
            Open
          </Button>
        </Link>
        <Button onClick={addFavMovie}>
          Add to Favorites
        </Button>
        <Button onClick={removeFavMovie}>
          Remove from Favorites
        </Button>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imagePath: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    genre: PropTypes.object.isRequired,
    director: PropTypes.object.isRequired,
    featured: PropTypes.bool
  }).isRequired,
};