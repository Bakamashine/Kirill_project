import { Editor } from "@monaco-editor/react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { Container, Row, Col, Form } from "react-bootstrap";
import { recordStore } from "../stores/recordStore";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

const Edit = observer(() => {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const save = async () => {
    if (id) {
      await recordStore.updateRecord(parseInt(id), title, markdown);
      navigate("/")
    }
  };

  const get = async () => {
    if (id) {
      const result = await window.electronAPI.getRecordById(parseInt(id));
      setTitle(result.title);
      setMarkdown(result.markdown);
    }
  };

  useEffect(() => {
    get();
  }, [id]);
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
});

export default Edit;
