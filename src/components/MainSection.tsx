import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

// API URL
const URL: string = "https://api.spaceflightnewsapi.net/v4/articles";

// INTERFACES

interface Article {
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

interface Author {
  name: string;
}

// ----------------------------------------------------------
// COMPONENT
// ----------------------------------------------------------

const MainSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const navigate = useNavigate();

  // FETCH API
  const getData = () => {
    fetch(URL)
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
    getData();
  }, []);

  // RETURN CONTENT
  return (
    <Container className="main-container">
      <Row>
        {articles.map((article) => {
          return (
            <Col xs={12} key={article.id}>
              <Card className="my-card glass">
                <Card.Img src={article.image_url} />

                <Card.Body>
                  <Card.Title>{article.title}</Card.Title>

                  <Card.Text>{article.summary}</Card.Text>

                  <Button
                    className="my-button"
                    onClick={() => {
                      navigate(`/detail/${article.id}`);
                    }}
                  >
                    Read
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default MainSection;
