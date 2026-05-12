import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import type { Article } from "./MainSection";
import Spinner from "react-bootstrap/Spinner";

const URL: string = "https://api.spaceflightnewsapi.net/v4/articles/";

const DetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const getData = (URL: string, id?: string) => {
    fetch(URL + id?.toString())
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response.status);
        }
      })
      .then((data) => {
        setSelectedArticle(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(URL, params.id);
  }, []);

  if (!selectedArticle) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner animation="border" variant="light" />
      </Container>
    );
  }

  return (
    <Container className="main-container">
      <Row className="d-flex align-items-center justify-content-center">
        <Col xs={10}>
          <Card className="glass">
            <Card.Img
              variant="top"
              src={selectedArticle.image_url}
              style={{ maxHeight: "300px", objectFit: "cover" }}
            />
            <Card.Body>
              <Badge bg="secondary" className="mb-2">
                {selectedArticle.news_site}
              </Badge>
              <Card.Title className="fw-bold fs-4">
                {selectedArticle.title}
              </Card.Title>

              {selectedArticle.authors?.length > 0 && (
                <p className="text-muted">
                  By {selectedArticle.authors.map((a) => a.name).join(", ")}
                </p>
              )}

              <p className="text-muted" style={{ fontSize: "0.85rem" }}>
                Published:{" "}
                {new Date(selectedArticle.published_at).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </p>

              <Card.Text style={{ lineHeight: "1.8" }}>
                {selectedArticle.summary}
              </Card.Text>

              <Button className="my-button mb-4" onClick={() => navigate("/")}>
                ← Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DetailPage;
