import { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ( movies ) => {
  const localUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(localUser ? localUser : null);  
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const favMovies = movies.filter((movie) => {
    return localUser.FavoriteMovies.includes(movie.id);
  });

  const [username, setUsername] = useState(localUser.Username || "");
  const [password, setPassword] = useState(localUser.Password || "");
  const [email, setEmail] = useState(localUser.Email || "");
  const [birthday, setBirthday] = useState(localUser.Birthday || "01/01/0001");

  useEffect(() => {
    if (!user) {
      fetch("https://my-movies-db-cafa6b5db6b8.herokuapp.com/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUser(data); // Set user state with fetched data
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user, token, localUser.Username]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch("https://my-movies-db-cafa6b5db6b8.herokuapp.com/users", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
      }).then((response) => response.json())
        .then((updatedUser) => {
          setUser(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));
          alert("User update successful");
          window.location.reload();
        })
      .catch((error) => {
        console.error("Error updating user information:", error);
      });
  };

  const handleDeleteUser = (event) => {
    event.preventDefault();

    fetch("https://my-movies-db-cafa6b5db6b8.herokuapp.com/users", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,        
      },
    }).then((response) => {
      if (response.ok) {
        alert("User account deleted successfully");
        localStorage.clear();
        window.location.reload();
      } else {
        throw new Error("Failed to delete user account");
      }
    })
    .catch((error) => {
      console.error("Error deleting user account:", error);
    });
  }

  console.log(favMovies);

  return (
    <Container>
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

        <Button variant="dark" type="submit">
          Update User Information
        </Button>

      </Form>

      <Button 
        variant="dark"
        style={{ cursor: "pointer" }}
        onClick={handleDeleteUser}
      >
        Delete Account
      </Button>

      <div>
        <p style={{ fontWeight: 'bold' }}>
          <br />My Favorite Movies:
        </p>
      </div>
      {
        localUser && favMovies.map((movie) => {
          return (<MovieCard 
            movie={movie}
          />)
        })
      }
    </Container>
  )
}