import { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const favMovies = movies.filter((movie) => {
    return localUser.FavoriteMovies.includes(movie.id);
  });

  const [username, setUsername] = useState(localUser.Username);
  const [password, setPassword] = useState(localUser.Password);
  const [email, setEmail] = useState(localUser.Email);
  const [birthday, setBirthday] = useState(localUser.Birthday);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://my-movies-db-cafa6b5db6b8.herokuapp.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
      }).then((response) => {
        if (response.ok) {
          alert("User update successful");
          window.location.reload();
        } else {
          alert("User update failed");
        }
    });
  };

  console.log(favMovies);

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength="3"
        />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Update User Information
      </Button>
      <div>
        <p>My Favorite Movies:</p>
      </div>
      {
        favMovies.map((movie) => {
          <Card className="h-100">
            <Card.Img variant="top" src={movie.imagePath} />
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.director.Name}</Card.Text>
              <Link to={`/movies/${encodeURIComponent(movie.id)}`} >
                <Button variant="link">Open</Button>
              </Link>
            </Card.Body>
          </Card>
        })
      }
    </Form>
  )
}