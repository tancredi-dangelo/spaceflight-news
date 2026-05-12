import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";

// API URL
const URL: string = "https://api.spaceflightnewsapi.net/v4/articles";

// INTERFACES

export interface Article {
  id: number;
  title: string;

  authors: Author[];

  url: string;
  image_url: string;

  news_site: string;

  summary: string;

  published_at: string;
  updated_at: string;
}

export interface Author {
  name: string;
}

// ----------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------

const MainSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  // FETCH API
  const getData = (url: string) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response.status);
        }
      })
      .then((data) => {
        setArticles(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData(URL);
  }, []);

  // RETURN CONTENT
  return (
    <Container className="main-container">
      <Row className="g-3">
        {articles.map((article) => {
          return (
            <Col xs={12} key={article.id}>
              <Card className="my-card glass">
                <Row className="g-0">
                  <Col md={4}>
                    <Card.Img
                      src={article.image_url}
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "0.375rem 0 0 0.375rem",
                      }}
                    />
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Badge bg="secondary" className="mb-1 p-2">
                        {article.news_site}
                      </Badge>
                      <Card.Title>{article.title}</Card.Title>
                      <Card.Text>{article.summary}</Card.Text>
                      <Card.Text className="text-secondary">
                        <small>
                          Published:{" "}
                          {new Date(article.published_at).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </small>
                      </Card.Text>

                      {article.authors?.length > 0 && (
                        <Card.Text className="text-secondary">
                          <small>
                            Authors:{" "}
                            {article.authors.map((a) => a.name).join(", ")}
                          </small>
                        </Card.Text>
                      )}

                      <Button
                        className="my-button"
                        onClick={() => navigate(`/detail/${article.id}`)}
                      >
                        Read More
                      </Button>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MainSection;
