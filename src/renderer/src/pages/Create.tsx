import { Editor } from "@monaco-editor/react";
import { useState } from "react";
import Markdown from "react-markdown";
import { Container, Row, Col, Form } from "react-bootstrap";
import { recordStore } from "../stores/recordStore";

export default function Create() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  const save = async () => {
    await window.electronAPI.saveRecord(title, markdown);
    setTitle("");
    setMarkdown("");
    await recordStore.fetchRecords();
  };
  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <h5>Форма:</h5>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ваш заголовок</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ваша разметка (Markdown)</Form.Label>
              <Editor
                defaultLanguage="markdown"
                onChange={(e) => setMarkdown(String(e))}
                value={markdown}
                height={400}
              />
            </Form.Group>

            <button type="button" className="btn btn-primary" onClick={save}>
              Сохранить
            </button>
          </Form>
        </Col>

        <Col md={6}>
          <h5>Ваш вывод:</h5>
          <div className="markdown-border">
            <Markdown>{markdown}</Markdown>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
