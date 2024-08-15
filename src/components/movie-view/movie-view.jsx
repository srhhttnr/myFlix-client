import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((m) => m.id === movieId);

  return (
    <Row className="justify-content-md-center">
      <Col md={{ span: 6, offset: 3 }}>
        <img src={movie.imagePath} />
      </Col>
      <Col md={{ span: 6, offset: 3 }}>
        <span>Title: </span>
        <span>{movie.title}</span>
      </Col>
      <Col md={{ span: 6, offset: 3 }}>
        <span>Release Date: </span>
        <span>{movie.releaseDate}</span>
      </Col>
      <Col md={{ span: 6, offset: 3 }}>
        <span>Description: </span>
        <span>{movie.description}</span>
      </Col>
      <Col md={{ span: 6, offset: 3 }}>
        <span>Genre: </span>
        <span>{movie.genre.Name}</span>
      </Col>
      <Col md={{ span: 6, offset: 3 }}>
        <span>Director: </span>
        <span>{movie.director.Name}</span>
      </Col>
      <Col md={{ span: 6, offset: 3 }}>
        <Link to={`/`}>
          <Button className="back-button">Back</Button>
        </Link>
      </Col>
    </Row>
  );
};
