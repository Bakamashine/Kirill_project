import { Container, Row, Col, Card } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3">О программе</h1>
          <p className="lead text-secondary">
            Первая помощь — это то, что должен знать каждый. Наше приложение
            помогает создавать, хранить и просматривать инструкции по оказанию
            первой помощи в любых условиях.
          </p>
        </Col>
      </Row>

      <Row xs={1} md={2} className="g-4 mb-4">
        <Col>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Для чего это нужно</Card.Title>
              <Card.Text>
                Программа предназначена для создания и ведения записей об
                оказании первой помощи. Вы можете составлять пошаговые
                инструкции, добавлять изображения и описания — всё это
                доступно в любое время без подключения к интернету.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Работает оффлайн</Card.Title>
              <Card.Text>
                Все данные хранятся локально на вашем устройстве. Никаких
                облачных сервисов, никакой отправки данных — только вы и ваша
                информация. Это особенно важно в ситуациях, когда доступ к сети
                отсутствует или ограничен.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row xs={1} md={2} className="g-4">
        <Col>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Консольная версия</Card.Title>
              <Card.Text>
                Для тех, кто предпочитает работать в терминале, существует
                консольная версия программы. Она обладает тем же функционалом
                для создания и управления записями, но без графического
                интерфейса.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Кроссплатформенность</Card.Title>
              <Card.Text>
                Приложение работает на Windows, macOS и Linux. Благодаря
                использованию современных технологий, интерфейс выглядит
                одинаково хорошо на любой платформе.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
