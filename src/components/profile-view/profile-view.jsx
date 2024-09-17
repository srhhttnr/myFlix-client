import { useState, useEffect } from "react";
import { Button, Form, Container, Row } from "react-bootstrap";
import { FavoriteMovies } from "./favorite-movies";

export const ProfileView = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(currentUser ? currentUser : null);  
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [username, setUsername] = useState(currentUser.Username || "");
  const [password, setPassword] = useState(currentUser.Password || "");
  const [email, setEmail] = useState(currentUser.Email || "");
  const [birthday, setBirthday] = useState(currentUser.Birthday || "01/01/0001");

  useEffect(() => {
    if (!user) {
      fetch("https://my-movies-db-cafa6b5db6b8.herokuapp.com/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => response.json())
        .then((data) => {
          setUser(data);
          setToken(token);
        })
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [user, token, currentUser.Username]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch(`https://my-movies-db-cafa6b5db6b8.herokuapp.com/users/${user.Username}`, {
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

    fetch(`https://my-movies-db-cafa6b5db6b8.herokuapp.com/users/${user.Username}`, {
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

  return (
    <Container>
      <Row>
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

          <Button variant="dark" type="submit" style={{ cursor: "pointer" }}>
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
      </Row>

      <Row>
        <FavoriteMovies/>
      </Row>
    </Container>
  )
}