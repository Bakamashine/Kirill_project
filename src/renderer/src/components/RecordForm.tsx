import { Editor } from "@monaco-editor/react";
import { Button, Form } from "react-bootstrap";
import { recordStore } from "../stores/recordStore";

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
    const fileName = await window.electronAPI.Editor.addImage();
    if (fileName) {
      onMarkdownChange(
        markdown + `\n<img src='${fileName}' style='width:20%;display:block' />\n`,
      );
    }
  };

  return (
    <>
      <h5>Форма:</h5>
      <div className="d-flex">
        <Button variant="info" onClick={addImage}>
          Добавить картинку
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
