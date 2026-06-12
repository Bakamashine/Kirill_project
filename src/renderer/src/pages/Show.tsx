import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Button, Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { recordStore, IRecord } from "../stores/recordStore";
import rehypeRaw from "rehype-raw";

const Show = observer(() => {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<IRecord | null>(null);
  const navigate = useNavigate();

  const get = async () => {
    if (id) setRecord(await window.electronAPI.getRecordById(parseInt(id)));
  };

  const remove = async (id: number) => {
    // await window.electronAPI.deleteRecord(id);
    await recordStore.deleteRecord(id);
    navigate("/");
  };

  useEffect(() => {
    get();
  }, [id]);

  if (!record) {
    return <Container className="mt-4">Загрузка...</Container>;
  }

  return (
    <Container className="mt-4">
      <h1>{record.title}</h1>
      <Markdown rehypePlugins={[rehypeRaw]}>{record.markdown}</Markdown>
      <div className="d-flex p-2">
        <Link className="m-2 btn btn-info" to={`/record/${id}/edit`}>
          Редактировать
        </Link>
        <Button
          className="m-2"
          variant="danger"
          onClick={async () => remove(parseInt(id!))}
        >
          Удалить
        </Button>
      </div>
    </Container>
  );
});

export default Show;
