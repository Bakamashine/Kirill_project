import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Home() {
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1>Welcome</h1>
          <p className="lead">React + Electron starter pack.</p>
        </Col>
      </Row>
      <Row>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>Electron</Card.Title>
              <Card.Text>
                Cross-platform desktop apps with JavaScript, HTML, and CSS.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} className="mb-3">
          <Card>
            <Card.Body>
              <Card.Title>React</Card.Title>
              <Card.Text>
                Component-based UI library for building interactive interfaces.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
