import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "react-markdown";
import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { recordStore, IRecord } from "../stores/recordStore";

const Show = observer(() => {
  const { id } = useParams<{ id: string }>();
  const [record, setRecord] = useState<IRecord | null>(null);

  useEffect(() => {
    const found = recordStore.records.find((r) => r.id === Number(id));
    if (found) {
      setRecord(found);
    } else {
      (async () => {
        await recordStore.fetchRecords();
        const r = recordStore.records.find((x) => x.id === Number(id));
        setRecord(r ?? null);
      })();
    }
  }, [id]);

  if (!record) {
    return <Container className="mt-4">Загрузка...</Container>;
  }

  return (
    <Container className="mt-4">
      <h1>{record.title}</h1>
      <Markdown>{record.markdown}</Markdown>
    </Container>
  );
});

export default Show