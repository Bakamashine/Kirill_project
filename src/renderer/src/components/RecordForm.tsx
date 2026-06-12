import { Editor } from "@monaco-editor/react";
import { Button, Form, Modal } from "react-bootstrap";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { recordStore } from "../stores/recordStore";
import { useTheme } from "../contexts/ThemeContext";
import { tipMarkdown } from "../pages/Tip";
import React, { useState } from "react";

interface RecordFormProps {
  title: string;
  markdown: string;
  onTitleChange: (value: string) => void;
  onMarkdownChange: (value: string) => void;
  onSave?: (title: string, markdown: string) => Promise<void>;
}

export default function RecordForm({
  title,
  markdown,
  onTitleChange,
  onMarkdownChange,
  onSave,
}: RecordFormProps) {
  const { theme } = useTheme();
  const [show, setShow] = useState(false);

  const save = async () => {
    if (title && markdown) {
      if (onSave) {
        await onSave(title, markdown);
      } else {
        await recordStore.saveRecord(title, markdown);
        onTitleChange("");
        onMarkdownChange("");
      }
    }
  };

  const addImage = async () => {
    const _path = await window.electronAPI.Editor.addImage();
    console.log(_path);
    if (_path) {
      onMarkdownChange(
        markdown + `\n<img src='${_path}' style='width:20%;display:block' />\n`,
      );
    }
  };

  return (
    <>
      <Modal show={show} fullscreen onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Шпаргалка по Markdown</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Markdown
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
            components={{
              a: ({ children }) => <span>{children}</span>,
            }}
          >
            {tipMarkdown}
          </Markdown>
        </Modal.Body>
      </Modal>

      <h5>Форма:</h5>
      <div className="d-flex">
        <Button className="m-2" variant="info" onClick={addImage}>
          Добавить картинку
        </Button>
        <Button variant="info" className="m-2" onClick={() => setShow(true)}>
          Открыть подсказку
        </Button>
      </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Ваш заголовок</Form.Label>
          <Form.Control
            onChange={(e) => onTitleChange(e.target.value)}
            value={title}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Ваша разметка (Markdown)</Form.Label>
          <Editor
            theme={theme === "dark" ? "vs-dark" : "vs"}
            defaultLanguage="markdown"
            onChange={(e) => onMarkdownChange(String(e))}
            value={markdown}
            height={400}
          />
        </Form.Group>

        <button type="button" className="btn btn-primary" onClick={save}>
          Сохранить
        </button>
      </Form>
    </>
  );
}
