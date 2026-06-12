import { recordStore } from "@/stores/recordStore";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    recordStore.fetchRecords();
  }, []);
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>
            Просмотр инструкций для оказаний первой помощи (без интернета)
          </h1>
          <p className="lead">Кроссплатформенность - сила</p>
        </Col>
      </Row>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {recordStore.records.map((item) => (
          <Col key={item.id}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {item.markdown.slice(0, 10).concat("...")}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link
                  className="btn btn-info m-2"
                  to={`/record/${item.id}/edit`}
                >
                  Редактировать
                </Link>
                <Link className="btn btn-info m-2" to={`/record/${item.id}`}>
                  Подробнее
                </Link>
                <Button
                  variant="danger"
                  className="m-2"
                  onClick={async () => {

                    await recordStore.deleteRecord(item.id)
                    await recordStore.fetchRecords()
                  }
                  }
                >
                  Удалить
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
