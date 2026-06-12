import { useState } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import { Container, Row, Col } from "react-bootstrap";
import rehypeRaw from "rehype-raw";
import RecordForm from "../components/RecordForm";

const urlTransform = (url: string) => {
  if (url.startsWith("media://")) return url;
  return defaultUrlTransform(url);
};

export default function Create() {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <RecordForm
            title={title}
            markdown={markdown}
            onTitleChange={setTitle}
            onMarkdownChange={setMarkdown}
          />
        </Col>

        <Col md={6}>
          <h5>Ваш вывод:</h5>
          <div className="markdown-border">
            <Markdown rehypePlugins={[rehypeRaw]} urlTransform={urlTransform}>{markdown}</Markdown>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
