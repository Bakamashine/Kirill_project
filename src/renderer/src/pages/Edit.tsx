import { useEffect, useState } from "react";
import Markdown, { defaultUrlTransform } from "react-markdown";
import { Container, Row, Col } from "react-bootstrap";
import { recordStore } from "../stores/recordStore";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import RecordForm from "../components/RecordForm";

const urlTransform = (url: string) => {
  if (url.startsWith("media://")) return url;
  return defaultUrlTransform(url);
};

const Edit = observer(() => {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const get = async () => {
    if (id) {
      const result = await window.electronAPI.getRecordById(parseInt(id));
      setTitle(result.title);
      setMarkdown(result.markdown);
    }
  };

  const save = async (t: string, m: string) => {
    if (id) {
      await recordStore.updateRecord(parseInt(id), t, m);
      navigate("/");
    }
  };

  useEffect(() => {
    get();
  }, [id]);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <RecordForm
            title={title}
            markdown={markdown}
            onTitleChange={setTitle}
            onMarkdownChange={setMarkdown}
            onSave={save}
          />
        </Col>

        <Col md={6}>
          <h5>Ваш вывод:</h5>
          <div className="markdown-border">
            <Markdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} urlTransform={urlTransform}>{markdown}</Markdown>
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default Edit;
